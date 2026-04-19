package com.e.shortform.common.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends ApiException {
    public UnauthorizedException(ExceptionCode exceptionCode) {
        super(exceptionCode, HttpStatus.UNAUTHORIZED);
    }
}