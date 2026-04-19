package com.e.shortform.config;

import com.e.shortform.common.dto.ApiCommonResponse;
import com.e.shortform.common.exception.ApiException;
import com.e.shortform.common.exception.ExceptionCode;
import com.e.shortform.config.dto.GlobalExceptionResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<GlobalExceptionResponse> handleIllegalArgument(IllegalArgumentException e) {
        log.warn("잘못된 요청: {}", e.getMessage());
        log.error("[UNHANDLED] {}: {}", e.getClass().getSimpleName(), e.getMessage(), e);
        return ResponseEntity.badRequest()
                .body(new GlobalExceptionResponse(e.getMessage(), 400));
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<GlobalExceptionResponse> handleSecurity(SecurityException e) {
        log.warn("인증 오류: {}", e.getMessage());
        log.error("[UNHANDLED] {}: {}", e.getClass().getSimpleName(), e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new GlobalExceptionResponse(e.getMessage(), 401));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<GlobalExceptionResponse> handleRuntime(RuntimeException e) {
        log.error("서버 오류: {}", e.getMessage(), e);
        log.error("[UNHANDLED] {}: {}", e.getClass().getSimpleName(), e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new GlobalExceptionResponse("서버 오류가 발생했습니다", 500));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiCommonResponse<?>> handleException(Exception e) {
        log.error("[UNHANDLED] {}: {}", e.getClass().getSimpleName(), e.getMessage(), e);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiCommonResponse.error(ExceptionCode.UNKNOWN_EXCEPTION));
    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<GlobalExceptionResponse> handleException(Exception e) {
//        log.error("예상치 못한 오류: {}", e.getMessage(), e);
//        log.error("[UNHANDLED] {}: {}", e.getClass().getSimpleName(), e.getMessage(), e);
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                .body(new GlobalExceptionResponse("서버 오류가 발생했습니다", 500));
//    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiCommonResponse<?>> handleApiException(ApiException e) {
        log.warn("[{}] {} - {}",
                e.getExceptionCode().getCode(),
                e.getClass().getSimpleName(),
                e.getExceptionCode().getMessage());

        return ResponseEntity
                .status(e.getStatus())
                .body(ApiCommonResponse.error(e.getExceptionCode()));
    }

}