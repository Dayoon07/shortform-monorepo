package com.e.shortform.config;

import com.e.shortform.domain.user.entity.UserEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

/** JWT 생성/검증/클레임 추출 단위 테스트 (Spring 컨텍스트·DB 불필요). */
class JwtUtilTest {

    // HS512는 키가 64바이트 이상이어야 한다
    private static final String SECRET =
            "0123456789012345678901234567890123456789012345678901234567890123456789";

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secretKey", SECRET);
        ReflectionTestUtils.setField(jwtUtil, "expiration", 86_400_000L);
        jwtUtil.initSigningKey(); // 같은 패키지라 직접 호출 가능
    }

    private UserEntity sampleUser() {
        return UserEntity.builder()
                .id(1L).username("tester").mail("tester@test.com")
                .profileImgSrc("/x.png").mention("user-x").social(false).provider("LOCAL")
                .build();
    }

    @Test
    void generate_then_extractClaims() {
        String token = jwtUtil.generateToken(sampleUser());

        assertEquals("tester", jwtUtil.getUsernameFromToken(token));
        assertEquals("tester@test.com", jwtUtil.getMailFromToken(token));
        assertTrue(jwtUtil.validateToken(token));
    }

    @Test
    void tamperedToken_isInvalid() {
        String token = jwtUtil.generateToken(sampleUser());
        // 서명 부분을 변조하면 검증에 실패해야 한다
        String[] parts = token.split("\\.");
        String tampered = parts[0] + "." + parts[1] + ".invalidSignature";
        assertFalse(jwtUtil.validateToken(tampered));
    }
}
