/** 신고 접수 상태 */
export enum ReportStatusType {

    PENDING     = "PENDING",    // 대기 중
    REVIEWING   = "REVIEWING",  // 확인 중
    REJECTED    = "REJECTED",   // 신고 거부됨
    RESOLVED    = "RESOLVED"    // 신고 조치됨

}
