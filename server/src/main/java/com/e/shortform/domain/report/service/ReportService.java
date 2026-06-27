package com.e.shortform.domain.report.service;

import com.e.shortform.common.exception.ApiException;
import com.e.shortform.common.exception.ExceptionCode;
import com.e.shortform.domain.report.entity.ReportEntity;
import com.e.shortform.domain.report.enums.ActionTakenType;
import com.e.shortform.domain.report.enums.StatusType;
import com.e.shortform.domain.report.mapper.ReportMapper;
import com.e.shortform.domain.report.repository.ReportRepo;
import com.e.shortform.domain.report.req.ReportReqDto;
import com.e.shortform.domain.report.res.ReportAdminDto;
import com.e.shortform.domain.report.vo.ReportVo;
import com.e.shortform.domain.user.entity.UserEntity;
import com.e.shortform.domain.user.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReportService {

    private final UserRepo userRepo;

    private final ReportRepo reportRepo;
    private final ReportMapper reportMapper;

    public List<ReportVo> getReportAll() {
        return reportMapper.getReportAll();
    }

    public List<ReportEntity> getReportAllJpaVer() {
        return reportRepo.findAll();
    }

    public void saveReport(ReportReqDto reqDto, UserEntity user) {
        if (user == null) {
            throw new ApiException(ExceptionCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        UserEntity reporterUser = userRepo.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다"));
        UserEntity reportedUser = userRepo.findById(reqDto.getReportedUser())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다"));

        ReportEntity a = ReportEntity.builder()
                .targetType(reqDto.getTargetType())
                .targetId(reqDto.getTargetId())
                .reporterUser(reporterUser)
                .reportedUser(reportedUser)
                .reportType(reqDto.getReportType())
                .reportReason(reqDto.getReportReason())
                .status(StatusType.PENDING.getValue())     // 접수 시 기본 상태
                .actionTaken(ActionTakenType.NONE.getValue())
                .build();
        reportRepo.save(a);
    }

    /** 관리자: 신고 목록 (status 필터 선택) */
    public List<ReportAdminDto> getReportsForAdmin(String status) {
        return reportMapper.selectReportsForAdmin(status);
    }

    /** 관리자: 신고 처리 (상태/조치/검토의견 갱신) */
    @Transactional
    public void processReport(Long reportId, String status, String actionTaken, String reviewComment) {
        ReportEntity report = reportRepo.findById(reportId)
                .orElseThrow(() -> new ApiException(ExceptionCode.INVALID_INPUT, HttpStatus.NOT_FOUND));
        report.setStatus(status);
        report.setActionTaken(actionTaken);
        report.setReviewComment(reviewComment);
        report.setReviewedAt(LocalDateTime.now());
        report.setUpdatedAt(LocalDateTime.now());
        reportRepo.save(report);
    }















}
