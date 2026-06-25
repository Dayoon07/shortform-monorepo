package com.e.shortform.domain.report.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/** 관리자 신고 처리 화면용 DTO (신고자/피신고자 이름 포함). */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportAdminDto {

    private Long id;
    private String targetType;
    private Long targetId;
    private Long reporterUserId;
    private String reporterUsername;
    private Long reportedUserId;
    private String reportedUsername;
    private String reportType;
    private String reportReason;
    private String status;
    private String actionTaken;
    private String reviewComment;
    private LocalDateTime reviewedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
