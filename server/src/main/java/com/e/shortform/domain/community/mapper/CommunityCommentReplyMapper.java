package com.e.shortform.domain.community.mapper;

import com.e.shortform.domain.community.res.CommunityCommentReplyWithUserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityCommentReplyMapper {

    // 특정 댓글의 답글 목록 (작성자 정보 + 좋아요 수, 삭제된 것 제외)
    List<CommunityCommentReplyWithUserDto> selectByCommentId(Long commentId);

}
