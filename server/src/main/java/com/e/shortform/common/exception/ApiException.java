package com.e.shortform.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {

    private final ExceptionCode exceptionCode;
    private final HttpStatus status;

    public ApiException(ExceptionCode exceptionCode) {
        this(exceptionCode, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ApiException(ExceptionCode exceptionCode, HttpStatus status) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
        this.status = status;
    }

    public ApiException(String errorMessage) {
        super(errorMessage);
        this.exceptionCode = ExceptionCode.UNKNOWN_EXCEPTION;
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

}
