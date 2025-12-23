/** 신고 조치 타입 */
export enum ReportActionTakenType {

    NONE            =   "NONE",             // 조치 없음
    WARNING         =   "WARNING",          // 경고 조치
    CONTENT_HIDDEN  =   "CONTENT_HIDDEN",   // 콘텐츠 숨김 조치
    CONTENT_DELETED =   "CONTENT_DELETED",  // 콘텐츠 삭제 조치
    USER_SUSPENDED  =   "USER_SUSPENDED",   // 계정 정지 (일시적 조치)
    USER_BANNED     =   "USER_BANNED"       // 계정 삭제 (영구적 조치)

}
