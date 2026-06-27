package com.e.shortform.util.storage;

import com.e.shortform.util.LocalFileStorageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 로컬 디스크 저장 구현 (기본값). app.storage.type 미설정 또는 'local'일 때 활성화.
 * URL은 WebConfig의 /resources/** 리소스 핸들러가 서빙하는 상대경로다.
 */
@Service
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.storage.type", havingValue = "local", matchIfMissing = true)
public class LocalFileStorageService implements FileStorageService {

    private final LocalFileStorageUtil util;

    @Override
    public StoredFile store(MultipartFile file, String subDir) throws IOException {
        String fileName = util.store(file, subDir);
        return new StoredFile(fileName, "/resources/" + subDir + "/" + fileName);
    }

    @Override
    public void deleteQuietly(String subDir, String fileName) {
        util.deleteQuietly(subDir, fileName);
    }
}
