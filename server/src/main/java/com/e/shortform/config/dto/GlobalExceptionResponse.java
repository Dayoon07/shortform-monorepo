package com.e.shortform.config.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GlobalExceptionResponse {
    private final boolean success = false;
    private final String message;
    private final int status;
}
