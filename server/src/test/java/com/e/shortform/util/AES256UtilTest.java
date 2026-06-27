package com.e.shortform.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/** AES-256 암복호화 라운드트립 단위 테스트 (외부 의존성 없음). */
class AES256UtilTest {

    private static final String KEY = "0123456789abcdef0123456789abcdef"; // 32바이트 = AES-256

    @Test
    void encrypt_then_decrypt_returnsOriginal() throws Exception {
        AES256Util aes = new AES256Util(KEY);
        String plain = "hello 안녕하세요 123 !@#";

        String encrypted = aes.aesEncode(plain);
        assertNotNull(encrypted);
        assertNotEquals(plain, encrypted);          // 실제로 암호화됨
        assertEquals(plain, aes.aesDecode(encrypted)); // 복호화하면 원문
    }

    @Test
    void emptyString_roundTrips() throws Exception {
        AES256Util aes = new AES256Util(KEY);
        assertEquals("", aes.aesDecode(aes.aesEncode("")));
    }
}
