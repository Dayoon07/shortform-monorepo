/** 신고 이유 */
export enum ReportType {

    INAPPROPRIATE   = "INAPPROPRIATE",  // 부적절한 영상
    SEXUAL          = "SEXUAL",         // 선정적
    VIOLENCE        = "VIOLENCE",       // 폭행
    HATE_SPEECH     = "HATE_SPEECH",    // 욕설
    SPAM            = "SPAM",           // 스팸
    COPYRIGHT       = "COPYRIGHT",      // 저작권
    FALSE_INFO      = "FALSE_INFO",     // 가짜 뉴스 or 거짓 정보
    PRIVACY         = "PRIVACY",        // 개인정보 침해
    ILLEGAL         = "ILLEGAL",        // 불법적인
    ETC             = "ETC"             // 기타

}
