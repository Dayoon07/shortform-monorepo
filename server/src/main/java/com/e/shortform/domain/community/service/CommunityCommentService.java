package com.e.shortform.domain.community.service;

import com.e.shortform.common.exception.ApiException;
import com.e.shortform.common.exception.ExceptionCode;
import com.e.shortform.domain.community.entity.CommunityCommentEntity;
import com.e.shortform.domain.community.entity.CommunityEntity;
import com.e.shortform.domain.community.mapper.CommunityCommentMapper;
import com.e.shortform.domain.community.repository.CommunityCommentRepo;
import com.e.shortform.domain.community.repository.CommunityRepo;
import com.e.shortform.domain.community.res.CommunityCommentWithUserDto;
import com.e.shortform.domain.notification.service.NotificationService;
import com.e.shortform.domain.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommunityCommentService {

    private final CommunityRepo communityRepo;
    private final CommunityCommentRepo communityCommentRepo;

    private final CommunityCommentMapper communityCommentMapper;
    private final NotificationService notificationService;

    public List<CommunityCommentEntity> findByCommunity(CommunityEntity community) {
        return communityCommentRepo.findByCommunity(community);
    }

    @Transactional
    public void insertComment(Long id, String comment, UserEntity user) {
        CommunityEntity b = communityRepo.findById(id).orElseThrow();
        CommunityCommentEntity a = CommunityCommentEntity.builder()
                .commentText(comment)
                .user(user)
                .community(b)
                .deleteStatus(false)
                .build();
        communityCommentRepo.save(a);

        // 게시글 작성자에게 댓글 알림 (트랜잭션 내라 lazy 로딩 안전)
        if (b.getUser() != null) {
            notificationService.notify(
                    b.getUser().getId(), user,
                    "COMMUNITY_COMMENT", "COMMUNITY", b.getCommunityUuid(),
                    (user != null ? user.getUsername() : "누군가") + "님이 회원님의 게시글에 댓글을 남겼습니다");
        }
    }

    public List<CommunityCommentWithUserDto> findByCommunityIdWithReplyCounts(Long communityId) {
        return communityCommentMapper.selectByCommunityId(communityId);
    }

    public List<CommunityCommentWithUserDto> findByCommunityIdOrderByDesc(String communityUuid) {
        return communityCommentMapper.selectByCommunityIdOrderByDesc(communityUuid);
    }

    /** 댓글 수정 (작성자 본인만) */
    @Transactional
    public void updateComment(Long commentId, String text, UserEntity requester) {
        CommunityCommentEntity comment = communityCommentRepo.findById(commentId)
                .orElseThrow(() -> new ApiException(ExceptionCode.COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND));
        checkOwner(comment, requester);
        comment.setCommentText(text);
        communityCommentRepo.save(comment);
    }

    /** 댓글 소프트 삭제 (작성자 본인만) — 데이터는 남기고 화면에서만 숨김 */
    @Transactional
    public void deleteComment(Long commentId, UserEntity requester) {
        CommunityCommentEntity comment = communityCommentRepo.findById(commentId)
                .orElseThrow(() -> new ApiException(ExceptionCode.COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND));
        checkOwner(comment, requester);
        comment.setDeleteStatus(true);
        communityCommentRepo.save(comment);
    }

    private void checkOwner(CommunityCommentEntity comment, UserEntity requester) {
        if (requester == null || comment.getUser() == null
                || !comment.getUser().getId().equals(requester.getId())) {
            throw new ApiException(ExceptionCode.FORBIDDEN, HttpStatus.FORBIDDEN);
        }
    }

}
