package com.e.shortform.common.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends ApiException {
    public NotFoundException(ExceptionCode exceptionCode) {
        super(exceptionCode, HttpStatus.NOT_FOUND);
    }
}