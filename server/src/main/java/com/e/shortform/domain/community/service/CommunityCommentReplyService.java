package com.e.shortform.domain.community.service;

import com.e.shortform.common.exception.ApiException;
import com.e.shortform.common.exception.ExceptionCode;
import com.e.shortform.domain.community.entity.CommunityCommentEntity;
import com.e.shortform.domain.community.entity.CommunityCommentReplyEntity;
import com.e.shortform.domain.community.mapper.CommunityCommentReplyMapper;
import com.e.shortform.domain.community.repository.CommunityCommentReplyRepo;
import com.e.shortform.domain.community.repository.CommunityCommentRepo;
import com.e.shortform.domain.community.res.CommunityCommentReplyWithUserDto;
import com.e.shortform.domain.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommunityCommentReplyService {

    private final CommunityCommentRepo communityCommentRepo;
    private final CommunityCommentReplyRepo communityCommentReplyRepo;
    private final CommunityCommentReplyMapper communityCommentReplyMapper;

    public void insertCommentReply(Long id, String replyText, UserEntity user) {
        CommunityCommentEntity b = communityCommentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("찾을 수 없거나 존재하지 않는 게시글"));

        CommunityCommentReplyEntity a = CommunityCommentReplyEntity.builder()
                .replyText(replyText)
                .user(user)
                .comment(b)
                .deleteStatus(false)
                .build();
        communityCommentReplyRepo.save(a);
    }

    /** 특정 댓글의 답글 목록 (작성자 정보 포함, 삭제된 것 제외) */
    public List<CommunityCommentReplyWithUserDto> findByCommentId(Long commentId) {
        return communityCommentReplyMapper.selectByCommentId(commentId);
    }

    /** 답글 수정 (작성자 본인만) */
    @Transactional
    public void updateReply(Long replyId, String text, UserEntity requester) {
        CommunityCommentReplyEntity reply = communityCommentReplyRepo.findById(replyId)
                .orElseThrow(() -> new ApiException(ExceptionCode.COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND));
        checkOwner(reply, requester);
        reply.setReplyText(text);
        communityCommentReplyRepo.save(reply);
    }

    /** 답글 소프트 삭제 (작성자 본인만) */
    @Transactional
    public void deleteReply(Long replyId, UserEntity requester) {
        CommunityCommentReplyEntity reply = communityCommentReplyRepo.findById(replyId)
                .orElseThrow(() -> new ApiException(ExceptionCode.COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND));
        checkOwner(reply, requester);
        reply.setDeleteStatus(true);
        communityCommentReplyRepo.save(reply);
    }

    private void checkOwner(CommunityCommentReplyEntity reply, UserEntity requester) {
        if (requester == null || reply.getUser() == null
                || !reply.getUser().getId().equals(requester.getId())) {
            throw new ApiException(ExceptionCode.FORBIDDEN, HttpStatus.FORBIDDEN);
        }
    }






}
