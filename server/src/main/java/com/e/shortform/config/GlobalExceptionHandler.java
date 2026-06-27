package com.e.shortform.config;

import com.e.shortform.common.dto.ApiCommonResponse;
import com.e.shortform.common.exception.ApiException;
import com.e.shortform.common.exception.ExceptionCode;
import com.e.shortform.config.dto.GlobalExceptionResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.ClientAbortException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 클라이언트가 연결을 끊었을 때(영상 스트리밍 중 스와이프/seek, 탭 닫기 등) 발생.
     * 이미 끊긴 연결이라 응답 본문을 쓸 수 없으므로 본문 없이 조용히 넘긴다.
     * (이걸 잡지 않으면 video/mp4 응답에 JSON 에러를 쓰려다 2차 예외가 나고 ERROR 로그가 도배됨)
     */
    @ExceptionHandler(ClientAbortException.class)
    public void handleClientAbort(ClientAbortException e) {
        log.debug("클라이언트 연결 중단(정상): {}", e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<GlobalExceptionResponse> handleIllegalArgument(IllegalArgumentException e) {
        log.warn("잘못된 요청: {}", e.getMessage());   // 예상된 클라이언트 오류라 stacktrace 미출력
        return ResponseEntity.badRequest()
                .body(new GlobalExceptionResponse(e.getMessage(), 400));
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<GlobalExceptionResponse> handleSecurity(SecurityException e) {
        log.warn("인증 오류: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new GlobalExceptionResponse(e.getMessage(), 401));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<GlobalExceptionResponse> handleRuntime(RuntimeException e) {
        log.error("[UNHANDLED] {}: {}", e.getClass().getSimpleName(), e.getMessage(), e);
        // 앱이 던진 메시지(예: "영상을 찾을 수 없습니다")를 클라이언트가 볼 수 있게 전달
        String message = (e.getMessage() != null && !e.getMessage().isBlank())
                ? e.getMessage() : "서버 오류가 발생했습니다";
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new GlobalExceptionResponse(message, 500));
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