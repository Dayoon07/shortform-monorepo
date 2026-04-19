package com.e.shortform.common.exception;

import org.springframework.http.HttpStatus;

public class BadRequestException extends ApiException {
    public BadRequestException(ExceptionCode exceptionCode) {
        super(exceptionCode, HttpStatus.BAD_REQUEST);
    }
}