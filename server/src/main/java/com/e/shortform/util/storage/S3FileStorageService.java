package com.e.shortform.util.storage;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.e.shortform.util.LocalFileStorageUtil;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * S3 저장 구현. app.storage.type=s3 일 때 활성화.
 * 영상/이미지를 S3에 올리고 공개 URL(또는 CloudFront/커스텀 도메인)을 반환한다.
 * 버킷은 정적 콘텐츠 공개 읽기가 가능하도록(버킷 정책 또는 CloudFront) 구성되어 있어야 한다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.storage.type", havingValue = "s3")
public class S3FileStorageService implements FileStorageService {

    private final LocalFileStorageUtil naming; // 고유 파일명 생성 로직 재사용

    @Value("${app.storage.s3.bucket}")
    private String bucket;
    @Value("${app.storage.s3.region}")
    private String region;
    @Value("${app.storage.s3.access-key}")
    private String accessKey;
    @Value("${app.storage.s3.secret-key}")
    private String secretKey;
    /** CloudFront/커스텀 도메인이 있으면 그걸로 URL을 만든다. 없으면 S3 기본 도메인 사용. */
    @Value("${app.storage.s3.public-base-url:}")
    private String publicBaseUrl;
    /** 버킷 내 최상위 폴더(prefix). 프로파일별로 local/production 등으로 분리. 비우면 prefix 없음. */
    @Value("${app.storage.s3.base-prefix:}")
    private String basePrefix;

    private AmazonS3 s3;

    /** prefix/subDir/fileName 형태의 오브젝트 키를 만든다. */
    private String objectKey(String subDir, String fileName) {
        String prefix = (basePrefix == null || basePrefix.isBlank())
                ? "" : basePrefix.replaceAll("/+$", "") + "/";
        return prefix + subDir + "/" + fileName;
    }

    @PostConstruct
    void init() {
        AmazonS3ClientBuilder builder = AmazonS3ClientBuilder.standard().withRegion(region);

        boolean hasStaticKeys = accessKey != null && !accessKey.isBlank()
                && secretKey != null && !secretKey.isBlank();
        if (hasStaticKeys) {
            // env로 주입된 정적 키 사용 (키는 절대 코드/설정파일에 하드코딩하지 말 것)
            builder.withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)));
            log.info("S3 스토리지 활성화: bucket={}, region={}, 자격증명=정적키(env)", bucket, region);
        } else {
            // 키 미지정 시 기본 자격증명 체인(IAM 역할/인스턴스 프로파일/~/.aws/환경변수)
            // → EC2/ECS에서는 IAM 역할만 붙이면 키 없이 동작 (가장 안전)
            builder.withCredentials(new DefaultAWSCredentialsProviderChain());
            log.info("S3 스토리지 활성화: bucket={}, region={}, 자격증명=기본체인(IAM 역할 등)", bucket, region);
        }
        this.s3 = builder.build();
    }

    @Override
    public StoredFile store(MultipartFile file, String subDir) throws IOException {
        String fileName = naming.generateUniqueFileName(file.getOriginalFilename());
        String key = objectKey(subDir, fileName);

        ObjectMetadata meta = new ObjectMetadata();
        if (file.getContentType() != null) meta.setContentType(file.getContentType());
        meta.setContentLength(file.getSize());

        s3.putObject(new PutObjectRequest(bucket, key, file.getInputStream(), meta));

        String base = (publicBaseUrl != null && !publicBaseUrl.isBlank())
                ? publicBaseUrl.replaceAll("/+$", "")
                : "https://" + bucket + ".s3." + region + ".amazonaws.com";
        return new StoredFile(fileName, base + "/" + key);
    }

    @Override
    public void deleteQuietly(String subDir, String fileName) {
        if (fileName == null || fileName.isBlank()) return;
        try {
            s3.deleteObject(bucket, objectKey(subDir, fileName));
        } catch (Exception ignored) {
        }
    }
}
