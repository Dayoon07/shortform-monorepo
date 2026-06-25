package com.e.shortform.domain.comment.service;

import com.e.shortform.common.exception.ApiException;
import com.e.shortform.common.exception.ExceptionCode;
import com.e.shortform.domain.comment.entity.CommentEntity;
import com.e.shortform.domain.comment.entity.CommentReplyEntity;
import com.e.shortform.domain.comment.mapper.CommentReplyMapper;
import com.e.shortform.domain.comment.repository.CommentReplyRepo;
import com.e.shortform.domain.comment.repository.CommentRepo;
import com.e.shortform.domain.comment.req.CommentReplyReqDto;
import com.e.shortform.domain.comment.res.CommentReply;
import com.e.shortform.domain.user.entity.UserEntity;
import com.e.shortform.domain.user.repository.UserRepo;
import com.e.shortform.domain.user.req.AuthUserReqDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentReplyService {

    private final CommentReplyRepo commentReplyRepo;
    private final CommentRepo commentRepo;
    private final UserRepo userRepo;
    private final CommentReplyMapper commentReplyMapper;

    public void commentReplyInsert(CommentReplyReqDto dto, UserEntity u) throws Exception {
        CommentEntity parentComment = commentRepo.findById(dto.getCommentReplyId())
                .orElseThrow(() -> new Exception("댓글을 찾을 수 없습니다"));

        CommentReplyEntity entity = CommentReplyEntity.builder()
                .commentReplyText(dto.getCommentReplyText())
                .user(u)
                .parentComment(parentComment)
                .deleteStatus(false)
                .build();

        commentReplyRepo.save(entity);
        log.info("댓글 저장 완료: {}", dto);
    }

    public List<CommentReplyEntity> selectAllCommentReply() {
        return commentReplyRepo.findAll();
    }

    public List<CommentReplyEntity> findByParentComment(Long commentId) {
        CommentEntity parentComment = commentRepo.findById(commentId).orElseThrow();
        return commentReplyRepo.findByParentComment(parentComment);
    }

    public List<CommentReply> selectCommentReply(Long id) {
        return commentReplyMapper.selectCommentReply(id);
    }

    /** 답글 수정 (작성자 본인만) */
    @Transactional
    public void updateReply(Long replyId, String text, UserEntity requester) {
        CommentReplyEntity reply = commentReplyRepo.findById(replyId)
                .orElseThrow(() -> new ApiException(ExceptionCode.COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND));
        checkOwner(reply, requester);
        reply.setCommentReplyText(text);
        commentReplyRepo.save(reply);
    }

    /** 답글 소프트 삭제 (작성자 본인만) */
    @Transactional
    public void deleteReply(Long replyId, UserEntity requester) {
        CommentReplyEntity reply = commentReplyRepo.findById(replyId)
                .orElseThrow(() -> new ApiException(ExceptionCode.COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND));
        checkOwner(reply, requester);
        reply.setDeleteStatus(true);
        commentReplyRepo.save(reply);
    }

    private void checkOwner(CommentReplyEntity reply, UserEntity requester) {
        if (requester == null || reply.getUser() == null
                || !reply.getUser().getId().equals(requester.getId())) {
            throw new ApiException(ExceptionCode.FORBIDDEN, HttpStatus.FORBIDDEN);
        }
    }

}
