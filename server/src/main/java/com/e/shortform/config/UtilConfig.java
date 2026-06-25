package com.e.shortform.config;

import com.e.shortform.common.LongTypeNumberFormat;
import com.e.shortform.common.TimestampDateFormat;
import com.e.shortform.util.AES256Util;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.UnsupportedEncodingException;

@Configuration
public class UtilConfig {

    @Bean
    public LongTypeNumberFormat longTypeNumberFormat() {
        return new LongTypeNumberFormat();
    }

    @Bean
    public TimestampDateFormat timestampDateFormat() {
        return new TimestampDateFormat();
    }

    /**
     * AES-256 키는 반드시 32바이트(UTF-8 기준 32자)여야 한다.
     * 운영에서는 AES_SECRET_KEY 환경변수로 주입하고, 기본값은 로컬 테스트용이다.
     */
    @Bean
    public AES256Util aes256Util(@Value("${aes.secret-key}") String key) throws UnsupportedEncodingException {
        return new AES256Util(key);
    }

}
