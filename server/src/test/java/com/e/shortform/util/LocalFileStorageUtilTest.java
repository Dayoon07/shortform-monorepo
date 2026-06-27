package com.e.shortform.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/** 업로드 파일명 생성 규칙 단위 테스트. */
class LocalFileStorageUtilTest {

    private final LocalFileStorageUtil util = new LocalFileStorageUtil();

    @Test
    void generateUniqueFileName_keepsExtension_andIsUnique() {
        String a = util.generateUniqueFileName("photo.PNG");
        String b = util.generateUniqueFileName("photo.PNG");

        assertTrue(a.endsWith(".PNG"), "원본 확장자를 유지해야 함");
        assertNotEquals(a, b, "UUID로 매번 고유해야 함");
    }

    @Test
    void generateUniqueFileName_noExtension_isSafe() {
        String name = util.generateUniqueFileName("noextension");
        assertNotNull(name);
        assertFalse(name.contains("/"), "경로 구분자 포함 금지");
    }
}
