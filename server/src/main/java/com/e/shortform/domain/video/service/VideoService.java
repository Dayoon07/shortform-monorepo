package com.e.shortform.domain.video.service;

import com.e.shortform.common.exception.ApiException;
import com.e.shortform.common.exception.ExceptionCode;
import com.e.shortform.domain.user.entity.UserEntity;
import com.e.shortform.domain.user.repository.UserRepo;
import com.e.shortform.domain.video.entity.VideoEntity;
import com.e.shortform.domain.video.mapper.VideoMapper;
import com.e.shortform.domain.video.repository.VideoRepo;
import com.e.shortform.domain.video.res.IndexPageAllVideosDto;
import com.e.shortform.domain.video.res.VideoWithUserDto;
import com.e.shortform.domain.video.vo.VideoVo;
import com.e.shortform.domain.viewstory.entity.ViewStoryEntity;
import com.e.shortform.domain.viewstory.repository.ViewStoryRepo;
import com.e.shortform.common.messaging.ViewEvent;
import com.e.shortform.common.messaging.ViewEventPublisher;
import com.e.shortform.util.storage.FileStorageService;
import com.e.shortform.util.storage.StoredFile;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.ObjectProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class VideoService {

    private final UserRepo userRepo;
    private final VideoRepo videoRepo;
    private final VideoMapper videoMapper;
    private final ViewStoryRepo viewStoryRepo;
    private final FileStorageService fileStorageService;
    // RabbitMQ 비활성 시 빈이 없으므로 ObjectProvider로 옵셔널 주입
    private final ObjectProvider<ViewEventPublisher> viewEventPublisher;

    public Map<String, Object> uploadVideo(
            MultipartFile file,
            String title,
            String description,
            String hashtags,
            String visibility,
            String commentsAllowed,
            MultipartFile thumbnail,
            UserEntity user) {
        Map<String, Object> response = new HashMap<>();

        try {
            // 1. 비디오 저장 (스토리지 추상화 - 로컬/S3)
            StoredFile storedVideo = fileStorageService.store(file, "shortform-user-video");
            String savedVideoName = storedVideo.fileName();
            String savedVideoSrc = storedVideo.url();
            log.info("비디오 저장 완료: {}", savedVideoSrc);

            // 2. 썸네일 저장
            String thumbnailSavedName = null;
            String thumbnailSrc = null;
            if (thumbnail != null && !thumbnail.isEmpty()) {
                StoredFile storedThumb = fileStorageService.store(thumbnail, "shortform-user-video-preview-img");
                thumbnailSavedName = storedThumb.fileName();
                thumbnailSrc = storedThumb.url();
            } else {
                log.warn("썸네일 파일이 비어있습니다.");
            }

            // 4. 사용자 확인
            UserEntity uploader = userRepo.findById(user.getId())
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            // 5. 비디오 엔티티 생성 및 저장
            VideoEntity videoEntity = VideoEntity.builder()
                    .videoTitle(title)
                    .videoDescription(description)
                    .videoName(savedVideoName)
                    .videoSrc(savedVideoSrc)
                    .videoTag(hashtags)
                    .videoViews(0L)
                    .videoLoc(UUID.randomUUID().toString())
                    .uploader(uploader)
                    .videoWatchAvailability(visibility)
                    .commentAvailability(commentsAllowed)
                    .previewImg(thumbnailSrc)
                    .deleteStatus(false)
                    .build();

            VideoEntity savedVideo = videoRepo.save(videoEntity);

            log.info("비디오 + 썸네일 DB 저장 완료: videoID={}", savedVideo.getId());

            // 6. 응답 구성
            response.put("success", true);
            response.put("message", "비디오 업로드가 완료되었습니다.");
            response.put("videoId", savedVideo.getId());
            response.put("fileName", savedVideoName);
            response.put("thumbnail", thumbnailSavedName);

        } catch (IOException e) {
            log.error("파일 저장 중 오류 발생", e);
            response.put("success", false);
            response.put("message", "파일 저장 중 오류가 발생했습니다.");
        } catch (Exception e) {
            log.error("비디오 업로드 중 오류 발생", e);
            response.put("success", false);
            response.put("message", "업로드 중 오류가 발생했습니다: " + e.getMessage());
        }

        return response;
    }

    public List<VideoEntity> findAllOrderByCreateAtDesc() {
        return videoRepo.findAll(Sort.by(Sort.Direction.DESC, "uploadAt"));
    }

    public VideoWithUserDto selectByVideo(String mention) {
        return videoMapper.selectByVideo(mention);
    }

    public VideoEntity findByVideoLoc(String videoLoc, HttpSession session) {
        VideoEntity video = videoRepo.findByVideoLoc(videoLoc);

        if (session.getAttribute("user") != null) {
            String key = "viewed_" + videoLoc;

            if (session.getAttribute(key) == null) {
                video.setVideoViews(video.getVideoViews() + 1);
                videoRepo.save(video);
                session.setAttribute(key, true); // 중복 조회 방지 설정
            }
        }

        return video;
    }

    public VideoEntity findByVideoLoc(String videoLoc, String currentUserMention) {
        UserEntity user = userRepo.findByMention(currentUserMention);
        VideoEntity video = videoRepo.findByVideoLoc(videoLoc);

        if (user != null) {
            // 이 비디오를 본 적이 있는지 확인
            boolean alreadyViewed = viewStoryRepo
                    .existsByUserAndVideo(user, video);

            if (!alreadyViewed) {
                // 조회수 증가
                video.setVideoViews(video.getVideoViews() + 1);
                videoRepo.save(video);

                // 시청 기록 저장
                ViewStoryEntity viewStory = new ViewStoryEntity();
                viewStory.setUser(user);
                viewStory.setVideo(video);
                viewStoryRepo.save(viewStory);
            }
        }

        return video;
    }

    /**
     * 조회 발생 시 호출. RabbitMQ가 켜져 있으면 비동기로 발행(핫패스에서 DB 쓰기 제거),
     * 브로커가 없거나 발행 실패 시 동기로 폴백한다.
     */
    public void incrementVideoViews(String videoLoc, String currentUserMention) {
        ViewEventPublisher publisher = viewEventPublisher.getIfAvailable();
        if (publisher != null) {
            try {
                publisher.publish(new ViewEvent(videoLoc, currentUserMention));
                return;
            } catch (Exception e) {
                log.warn("조회 이벤트 발행 실패, 동기 처리로 폴백: {}", e.getMessage());
            }
        }
        processView(videoLoc, currentUserMention);
    }

    /** 조회 처리 핵심 로직(동기). RabbitMQ 소비자 또는 폴백 경로에서 호출된다. */
    @Transactional
    public void processView(String videoLoc, String currentUserMention) {
        UserEntity user = userRepo.findByMention(currentUserMention);
        VideoEntity video = videoRepo.findByVideoLoc(videoLoc);
        if (user == null || video == null) return;

        // 처음 보는 영상일 때만 조회수 +1 및 시청기록 저장
        if (!viewStoryRepo.existsByUserAndVideo(user, video)) {
            video.setVideoViews(video.getVideoViews() + 1);
            videoRepo.save(video);

            ViewStoryEntity viewStory = new ViewStoryEntity();
            viewStory.setUser(user);
            viewStory.setVideo(video);
            viewStoryRepo.save(viewStory);
        }
    }

    /** 기존 메서드 (하휘 호환성 유지) */
    public List<IndexPageAllVideosDto> selectIndexPageAllVideos() {
        return videoMapper.selectIndexPageAllVideos();
    }

    public List<IndexPageAllVideosDto> selectUserProfilePageAllVideos(String mention) {
        return videoMapper.selectUserProfilePageAllVideos(mention);
    }

    public List<IndexPageAllVideosDto> searchLogic(String searchWordParam) {
        return videoMapper.searchLogic(searchWordParam);
    }

    public VideoEntity selectRandomVideo(List<Long> excludeIds) {
        VideoVo vo = videoMapper.selectRandomVideo(excludeIds);
        if (vo == null) {
            return null;
        }

        // VideoVo의 ID를 사용해서 VideoEntity를 조회
        // 업로더(LAZY)까지 함께 로딩 — 직렬화 시 LazyInitializationException 방지
        Optional<VideoEntity> entity = videoRepo.findByIdWithUploader(vo.getId());

        return entity.orElse(null);
    }

    public VideoEntity getSwipeVideo(String videoLoc) {
        VideoVo vo = videoMapper.getSwipeVideo(videoLoc);
        if (vo == null) {
            return null;
        }
        // 업로더(LAZY)까지 함께 로딩 — 직렬화 시 LazyInitializationException 방지
        Optional<VideoEntity> entity = videoRepo.findByIdWithUploader(vo.getId());

        return entity.orElse(null);
    }

    public List<VideoEntity> explorePageVideo() {
        return videoRepo.findAll(Sort.by(Sort.Direction.DESC, "uploadAt"));
    }

    public List<IndexPageAllVideosDto> myLikeVideos(Long id) {
        return videoMapper.myLikeVideos(id);
    }

    /** 추천(explore) 피드 - 인기+최신 점수순 */
    public List<IndexPageAllVideosDto> exploreFeed() {
        return videoMapper.selectExploreFeed();
    }

    /** 영상 수정 화면용 현재 정보 (LAZY uploader 직렬화 회피 위해 스칼라만) */
    public Map<String, Object> getEditInfo(String videoLoc) {
        VideoEntity v = videoRepo.findByVideoLoc(videoLoc);
        if (v == null) throw new ApiException(ExceptionCode.VIDEO_NOT_FOUND, HttpStatus.NOT_FOUND);
        Map<String, Object> m = new HashMap<>();
        m.put("videoLoc", v.getVideoLoc());
        m.put("videoSrc", v.getVideoSrc());
        m.put("previewImg", v.getPreviewImg());
        m.put("videoTitle", v.getVideoTitle());
        m.put("videoDescription", v.getVideoDescription());
        m.put("videoTag", v.getVideoTag());
        m.put("videoWatchAvailability", v.getVideoWatchAvailability());
        m.put("commentAvailability", v.getCommentAvailability());
        return m;
    }

    /**
     * 영상 수정 (작성자 본인만). 메타데이터를 갱신하고, 새 영상/썸네일이 오면 파일도 교체한다.
     * 파일 교체 시 기존 파일은 best-effort로 삭제한다.
     */
    @Transactional
    public void editVideo(String videoLoc, String title, String description, String tag,
                          String watchAvailability, String commentAvailability,
                          MultipartFile newVideo, MultipartFile newThumbnail, UserEntity requester) throws IOException {
        VideoEntity video = videoRepo.findByVideoLoc(videoLoc);
        if (video == null) throw new ApiException(ExceptionCode.VIDEO_NOT_FOUND, HttpStatus.NOT_FOUND);
        if (requester == null || !video.getUploader().getId().equals(requester.getId())) {
            throw new ApiException(ExceptionCode.FORBIDDEN, HttpStatus.FORBIDDEN);
        }

        video.setVideoTitle(title);
        video.setVideoDescription(description);
        video.setVideoTag(tag);
        video.setVideoWatchAvailability(watchAvailability);
        video.setCommentAvailability(commentAvailability);

        // 영상 파일 교체 (선택)
        if (newVideo != null && !newVideo.isEmpty()) {
            String oldName = video.getVideoName();
            StoredFile stored = fileStorageService.store(newVideo, "shortform-user-video");
            video.setVideoName(stored.fileName());
            video.setVideoSrc(stored.url());
            fileStorageService.deleteQuietly("shortform-user-video", oldName);
        }

        // 썸네일 교체 (선택)
        if (newThumbnail != null && !newThumbnail.isEmpty()) {
            StoredFile stored = fileStorageService.store(newThumbnail, "shortform-user-video-preview-img");
            video.setPreviewImg(stored.url());
        }

        videoRepo.save(video);
    }

    public List<IndexPageAllVideosDto> selectExploreVideoListButTag(String hashtag) {
        if (hashtag.equals("popular")) {
            return videoMapper.selectExploreVideoListByTagsButVideoViewsDescFuck(hashtag);
        } else {
            return videoMapper.selectExploreVideoListByTags(hashtag);
        }
    }

    public List<VideoEntity> selectAllVideos() {
        return videoRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public List<IndexPageAllVideosDto> selectExploreVideoListByTagsButVideoViewsDescFuck(String hashtag) {
        return videoMapper.selectExploreVideoListByTagsButVideoViewsDescFuck(hashtag);
    }

    public List<VideoEntity> findAll() {
        return videoRepo.findAll();
    }

    /**
     * 페이징된 비디오 목록 조회 (신규)
     */
    public Map<String, Object> selectIndexPageAllVideosPaginated(PageRequest pageRequest) {
        int page = pageRequest.getPageNumber();
        int size = pageRequest.getPageSize();
        int offset = page * size;

        // 전체 개수 조회
        int totalElements = videoMapper.countPublicVideos();

        // 페이징된 데이터 조회
        List<IndexPageAllVideosDto> content = videoMapper.selectIndexPageAllVideosPaginated(offset, size);

        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        // 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("content", content);
        response.put("totalElements", totalElements);
        response.put("totalPages", totalPages);
        response.put("number", page);
        response.put("size", size);
        response.put("numberOfElements", content.size());
        response.put("first", page == 0);
        response.put("last", page >= totalPages - 1);
        response.put("empty", content.isEmpty());

        return response;
    }

    public boolean changeDeleteStatus(Long id, UserEntity requester) {
        VideoEntity video = videoRepo.findById(id).orElseThrow(
                () -> new RuntimeException("영상을 찾을 수 없거나 존재하지 않습니다"));
        // 작성자(업로더) 본인만 삭제 가능
        if (requester == null || !video.getUploader().getId().equals(requester.getId())) {
            throw new ApiException(ExceptionCode.FORBIDDEN, HttpStatus.FORBIDDEN);
        }
        return videoMapper.changeDeleteStatus(id);
    }

    public void videoViewsRandomUpdate() {
        videoMapper.videoViewsRandomUpdate();
    }
























}
