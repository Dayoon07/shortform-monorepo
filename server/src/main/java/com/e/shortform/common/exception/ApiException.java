package com.e.shortform.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException {

    private final ExceptionCode exceptionCode;
    private final HttpStatus status;
    private final String message;

    public ApiException(ExceptionCode exceptionCode) {
        super();
        this.exceptionCode = exceptionCode;
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public ApiException(ExceptionCode exceptionCode, HttpStatus status) {
        super();
        this.exceptionCode = exceptionCode;
        this.status = status;
    }

    public ApiException(String errorMessage) {
        super();
        this.message = errorMessage;
    }

}
