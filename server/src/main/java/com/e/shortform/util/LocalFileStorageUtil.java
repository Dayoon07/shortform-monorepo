package com.e.shortform.util;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * 로컬 디스크 파일 저장 공통 유틸. 여러 서비스(회원/영상/커뮤니티)에 흩어져 있던
 * "고유 파일명 생성 → 디렉터리 보장 → transferTo" 중복 로직을 한곳으로 모은다.
 * 파일명 스킴(타임스탬프 + UUID + 확장자)과 기준 경로는 기존 동작을 그대로 유지한다.
 */
@Component
public class LocalFileStorageUtil {

    /** 모든 업로드의 기준 디렉터리 (예: ~/Desktop/shortform-server) */
    public static final String BASE_DIR =
            System.getProperty("user.home").replace("\\", "/") + "/Desktop/shortform-server";

    private static final DateTimeFormatter TS = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss");

    /** 타임스탬프 + UUID(영숫자) + 원본 확장자 형태의 고유 파일명을 만든다. */
    public String generateUniqueFileName(String originalFilename) {
        String ext = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            ext = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        return LocalDateTime.now().format(TS)
                + UUID.randomUUID().toString().replaceAll("[^a-zA-Z0-9]", "")
                + ext;
    }

    /**
     * BASE_DIR/subDir 아래에 파일을 저장하고 저장된 파일명을 반환한다.
     * @param subDir 하위 디렉터리명 (예: "shortform-user-profile-img")
     */
    public String store(MultipartFile file, String subDir) throws IOException {
        String fileName = generateUniqueFileName(file.getOriginalFilename());
        File dir = new File(BASE_DIR + "/" + subDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        file.transferTo(new File(dir, fileName));
        return fileName;
    }
}
