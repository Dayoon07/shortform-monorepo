package com.e.shortform.util.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 파일 저장 추상화. 구현체(로컬 디스크 / S3)는 app.storage.type 설정으로 선택된다.
 * 업로드/수정/회원가입 등에서 이 인터페이스만 의존하면 저장 위치를 코드 변경 없이 바꿀 수 있다.
 */
public interface FileStorageService {

    /** subDir 아래에 파일을 저장하고 (파일명, 접근 URL)을 반환한다. */
    StoredFile store(MultipartFile file, String subDir) throws IOException;

    /** subDir 아래의 파일을 best-effort로 삭제한다(파일 교체 시 옛 파일 정리). */
    void deleteQuietly(String subDir, String fileName);
}
