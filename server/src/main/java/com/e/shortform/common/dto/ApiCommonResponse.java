package com.e.shortform.common.dto;

import com.e.shortform.common.exception.ExceptionCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ApiCommonResponse<T> {

    private boolean success;
    private String code;
    private String message;
    private T data;

    // 성공 응답
    public static <T> ApiCommonResponse<T> success(T data) {
        ApiCommonResponse<T> res = new ApiCommonResponse<>();
        res.success = true;
        res.code = "success";
        res.message = null;
        res.data = data;
        return res;
    }

    public static <T> ApiCommonResponse<T> success() {
        return success(null);
    }

    // 에러 응답
    public static <T> ApiCommonResponse<T> error(ExceptionCode exceptionCode) {
        ApiCommonResponse<T> res = new ApiCommonResponse<>();
        res.success = false;
        res.code = exceptionCode.getCode();
        res.message = exceptionCode.getMessage();
        res.data = null;
        return res;
    }
}