package com.e.shortform.util.storage;

/**
 * 파일 저장 결과.
 * @param fileName 저장된 파일명(확장자 포함, 디렉터리 제외) — 삭제 시 식별용
 * @param url      클라이언트가 접근할 수 있는 경로/URL (로컬: /resources/..., S3: https://...)
 */
public record StoredFile(String fileName, String url) {}
