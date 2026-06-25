package com.e.shortform.domain.community.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 커뮤니티 댓글의 답글 조회용 DTO. 프론트가 PostComment 타입을 재사용할 수 있도록
 * 필드명을 댓글 DTO와 맞춘다 (replyText -> commentText, replyUserId -> commentUserId).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityCommentReplyWithUserDto {

    private Long id;
    private String commentText;   // REPLY_TEXT
    private Long commentUserId;    // REPLY_USER_ID (작성자 판별용)
    private Long commentId;        // 부모 댓글 ID
    private LocalDateTime createAt;
    private String username;
    private String profileImgSrc;
    private String mention;
    private boolean social;
    private String provider;
    private Long likeCount;

}
