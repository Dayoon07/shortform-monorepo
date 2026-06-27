package com.e.shortform.domain.comment.service;

import com.e.shortform.common.exception.ApiException;
import com.e.shortform.common.exception.ExceptionCode;
import com.e.shortform.domain.comment.entity.CommentEntity;
import com.e.shortform.domain.comment.mapper.CommentMapper;
import com.e.shortform.domain.comment.repository.CommentRepo;
import com.e.shortform.domain.comment.res.CommentButVideoRes;
import com.e.shortform.domain.notification.service.NotificationService;
import com.e.shortform.domain.user.entity.UserEntity;
import com.e.shortform.domain.user.repository.UserRepo;
import com.e.shortform.domain.video.entity.VideoEntity;
import com.e.shortform.domain.video.repository.VideoRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepo commentRepo;
    private final UserRepo userRepo;
    private final VideoRepo videoRepo;

    private final CommentMapper commentMapper;
    private final NotificationService notificationService;

    public Map<String, Object> videoInsertComment(String commentText, Long commentUserId, Long commentVideoId) {
        UserEntity user = userRepo.findById(commentUserId).orElse(null);
        VideoEntity video = videoRepo.findByIdWithUploader(commentVideoId).orElse(null);
        Map<String, Object> map = new HashMap<>();

        try {
            CommentEntity commentEntity = CommentEntity.builder()
                    .commentText(commentText)
                    .user(user)
                    .video(video)
                    .deleteStatus(false)
                    .build();

            commentRepo.save(commentEntity);

            // 영상 업로더에게 댓글 알림
            if (video != null && video.getUploader() != null) {
                notificationService.notify(
                        video.getUploader().getId(), user,
                        "VIDEO_COMMENT", "VIDEO", video.getVideoLoc(),
                        (user != null ? user.getUsername() : "누군가") + "님이 회원님의 영상에 댓글을 남겼습니다");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }

        map.put("commentText", commentText);
        map.put("userObj", user);
        return map;
    }

    public List<CommentButVideoRes> selectByCommentId(Long id) {
        return commentMapper.selectByCommentId(id);
    }

    public List<CommentButVideoRes> selectByCommentButOrderByIsDesc(Long id) {
        return commentMapper.selectByCommentButOrderByIsDesc(id);
    }

    public List<CommentEntity> selectAllComments() {
        return commentRepo.findAll();
    }

    public long countByVideo(VideoEntity video) {
        return commentRepo.countByVideo(video);
    }

    /** 댓글 수정 (작성자 본인만) */
    @Transactional
    public void updateComment(Long commentId, String text, UserEntity requester) {
        CommentEntity comment = commentRepo.findById(commentId)
                .orElseThrow(() -> new ApiException(ExceptionCode.COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND));
        checkOwner(comment, requester);
        comment.setCommentText(text);
        commentRepo.save(comment);
    }

    /** 댓글 소프트 삭제 (작성자 본인만) */
    @Transactional
    public void deleteComment(Long commentId, UserEntity requester) {
        CommentEntity comment = commentRepo.findById(commentId)
                .orElseThrow(() -> new ApiException(ExceptionCode.COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND));
        checkOwner(comment, requester);
        comment.setDeleteStatus(true);
        commentRepo.save(comment);
    }

    private void checkOwner(CommentEntity comment, UserEntity requester) {
        if (requester == null || comment.getUser() == null
                || !comment.getUser().getId().equals(requester.getId())) {
            throw new ApiException(ExceptionCode.FORBIDDEN, HttpStatus.FORBIDDEN);
        }
    }

}
