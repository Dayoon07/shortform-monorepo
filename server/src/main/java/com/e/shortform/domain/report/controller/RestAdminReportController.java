package com.e.shortform.domain.report.controller;

import com.e.shortform.common.annotation.RequireAuth;
import com.e.shortform.common.exception.ApiException;
import com.e.shortform.common.exception.ExceptionCode;
import com.e.shortform.domain.report.req.ReportProcessReqDto;
import com.e.shortform.domain.report.service.ReportService;
import com.e.shortform.domain.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

/**
 * 관리자 신고 처리 API. 관리자 여부는 app.admin.emails 화이트리스트로 판별한다
 * (별도 권한 컬럼이 없는 현재 구조에서 스키마 변경 없이 관리자 기능을 제공하기 위함).
 */
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/admin/reports", produces = "application/json;charset=utf-8")
@RestController
public class RestAdminReportController {

    private final ReportService reportService;

    @Value("${app.admin.emails}")
    private String[] adminEmails;

    private boolean isAdmin(UserEntity user) {
        return user != null && user.getMail() != null
                && Arrays.stream(adminEmails).anyMatch(e -> e.trim().equalsIgnoreCase(user.getMail()));
    }

    private void requireAdmin(UserEntity user) {
        if (!isAdmin(user)) {
            throw new ApiException(ExceptionCode.FORBIDDEN, HttpStatus.FORBIDDEN);
        }
    }

    /** 현재 사용자가 관리자인지 (프론트 가드용) */
    @RequireAuth
    @GetMapping("/check")
    public ResponseEntity<?> checkAdmin(@AuthenticationPrincipal UserEntity user) {
        return ResponseEntity.ok(isAdmin(user));
    }

    /** 신고 목록 (status 필터 선택) */
    @RequireAuth
    @GetMapping
    public ResponseEntity<?> list(@RequestParam(required = false) String status,
                                  @AuthenticationPrincipal UserEntity user) {
        requireAdmin(user);
        return ResponseEntity.ok(reportService.getReportsForAdmin(status));
    }

    /** 신고 처리 (상태/조치/검토의견 갱신) */
    @RequireAuth
    @PostMapping("/process")
    public ResponseEntity<?> process(@RequestBody ReportProcessReqDto req,
                                     @AuthenticationPrincipal UserEntity user) {
        requireAdmin(user);
        reportService.processReport(req.getReportId(), req.getStatus(), req.getActionTaken(), req.getReviewComment());
        return ResponseEntity.ok(true);
    }
}
