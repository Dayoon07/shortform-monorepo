package com.e.shortform.util.aws;

public class AwsAccessInformation {
    public static final String AWS_ACCESS_KEY = System.getenv("spring.cloud.aws.s3.accessKey");
    public static final String AWS_SECRET_KEY = System.getenv("spring.cloud.aws.s3.secretKey");
    public static final String AWS_BUCKET = System.getenv("spring.cloud.aws.s3.bucket");

    // 인스턴스화를 방지하기 위한 private 생성자
    private AwsAccessInformation() {}
}