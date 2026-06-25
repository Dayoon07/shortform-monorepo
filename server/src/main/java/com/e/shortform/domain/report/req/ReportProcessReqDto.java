package com.e.shortform.domain.report.req;

import lombok.Data;

/** 관리자 신고 처리 요청 */
@Data
public class ReportProcessReqDto {

    private Long reportId;
    private String status;        // PENDING / REVIEWING / REJECTED / RESOLVED
    private String actionTaken;   // NONE / WARNING / CONTENT_HIDDEN / ...
    private String reviewComment;

}
