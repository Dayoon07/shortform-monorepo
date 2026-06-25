package com.e.shortform.util;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.e.shortform.common.exception.ApiException;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;

public class S3Client {
    private static final S3Client INSTANCE = new S3Client();

    public static S3Client getInstance() {
        return INSTANCE;
    }

    private AmazonS3 amazonS3Client;

    private S3Client() {
    }

    /**
     * S3 클라이언트 생성 (Builder 패턴 권장)
     */
    private void createAmazonS3(String clientRegion, String accessKey, String secretKey) {
        if (this.amazonS3Client == null) {
            AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
            this.amazonS3Client = AmazonS3ClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(credentials))
                    .withRegion(clientRegion)
                    .build();
        }
    }

    public boolean copyObject(String clientRegion, String copyBucket, String accessKey, String secretKey, String oldName, String newName) {
        createAmazonS3(clientRegion, accessKey, secretKey);

        if (amazonS3Client.doesObjectExist(copyBucket, oldName)) {
            CopyObjectRequest req = new CopyObjectRequest(copyBucket, oldName, copyBucket, newName);
            amazonS3Client.copyObject(req);

            ObjectMetadata oldMetadata = amazonS3Client.getObjectMetadata(copyBucket, oldName);
            ObjectMetadata newMetadata = amazonS3Client.getObjectMetadata(copyBucket, newName);

            return oldMetadata.getETag().equals(newMetadata.getETag());
        }
        return false;
    }

    public PutObjectResult upload(String clientRegion, String bucket, String accessKey, String secretKey, File imageFile) {
        return uploadWithFileName(clientRegion, bucket, accessKey, secretKey, imageFile, imageFile.getName());
    }

    public PutObjectResult uploadWithFileName(String clientRegion, String bucket, String accessKey, String secretKey, File imageFile, String fileName) {
        createAmazonS3(clientRegion, accessKey, secretKey);

        if (amazonS3Client == null) {
            throw new ApiException("S3 인증 실패");
        }

        PutObjectRequest objectRequest = new PutObjectRequest(bucket, fileName, imageFile);
        // PublicRead 설정이 필요할 경우 유지
        objectRequest.setCannedAcl(CannedAccessControlList.PublicRead);

        return amazonS3Client.putObject(objectRequest);
    }

    public byte[] download(String imageUrl) {
        try (InputStream in = new URI(imageUrl).toURL().openStream()) {
            return IOUtils.toByteArray(in);
        } catch (URISyntaxException | IOException e) {
            throw new ApiException("파일 다운로드 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    public void delete(String clientRegion, String bucket, String accessKey, String secretKey, String key) {
        createAmazonS3(clientRegion, accessKey, secretKey);
        if (amazonS3Client.doesObjectExist(bucket, key)) {
            amazonS3Client.deleteObject(bucket, key);
        }
    }
}