package com.e.shortform.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {

    // 공통
    UNKNOWN_EXCEPTION("ERR_000", "서버 오류가 발생했습니다"),
    INVALID_INPUT("ERR_001", "잘못된 입력입니다"),
    UNAUTHORIZED("ERR_002", "인증이 필요합니다"),
    FORBIDDEN("ERR_003", "권한이 없습니다"),

    // 유저
    USER_NOT_FOUND("ERR_U001", "사용자를 찾을 수 없습니다"),
    USERNAME_DUPLICATE("ERR_U002", "이미 사용 중인 아이디입니다"),
    MAIL_DUPLICATE("ERR_U003", "이미 사용 중인 이메일입니다"),
    LOGIN_FAILED("ERR_U004", "아이디 또는 비밀번호가 올바르지 않습니다"),
    INVALID_TOKEN("ERR_U005", "유효하지 않은 토큰입니다"),

    // 비디오
    VIDEO_NOT_FOUND("ERR_V001", "영상을 찾을 수 없습니다"),
    VIDEO_UPLOAD_FAILED("ERR_V002", "영상 업로드에 실패했습니다"),

    // 커뮤니티
    COMMUNITY_NOT_FOUND("ERR_C001", "게시글을 찾을 수 없습니다"),

    // 댓글
    COMMENT_NOT_FOUND("ERR_CM001", "댓글을 찾을 수 없습니다"),

    // 팔로우
    SELF_FOLLOW_NOT_ALLOWED("ERR_F001", "자기 자신을 팔로우할 수 없습니다"),
    ALREADY_FOLLOWING("ERR_F002", "이미 팔로우 중입니다");

    private final String code;
    private final String message;

}
