plugins {
    java
    id("org.springframework.boot") version "3.4.7"
    id("io.spring.dependency-management") version "1.1.7"
    kotlin("jvm")
}

group = "com.e"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-jdbc")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-websocket")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client")

    implementation("org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.4")
    implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity6")
    implementation(kotlin("stdlib-jdk8"))
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    // JWT 라이브러리 (최신 버전)
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")
    
    compileOnly("org.projectlombok:lombok")
    runtimeOnly("com.oracle.database.jdbc:ojdbc11")
    annotationProcessor("org.projectlombok:lombok")

    // DevTools
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.mybatis.spring.boot:mybatis-spring-boot-starter-test:3.0.4")
    testImplementation("org.springframework.security:spring-security-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    implementation("org.springframework.boot:spring-boot-starter-data-redis")
    implementation("org.apache.commons:commons-pool2")

    // https://mvnrepository.com/artifact/org.springdoc/springdoc-openapi-starter-webmvc-ui
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.13")
    implementation("org.apache.commons:commons-lang3:3.14.0")

    implementation("io.netty:netty-all:4.1.119.Final")

    // AWS SDK v1 (기존 코드 호환용)
    implementation("com.amazonaws:aws-java-sdk-s3:1.12.770") // 최신 v1 버전 권장

    // 유틸리티 (IOUtils 사용을 위해 필요)
    implementation("commons-io:commons-io:2.16.1")
    implementation("commons-codec:commons-codec")

    // 모니터링 (actuator + Prometheus 지표: HikariCP 풀 대기열 등)
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("io.micrometer:micrometer-registry-prometheus")

    // 비동기 메시지 큐 (조회수/시청기록 비동기 처리). 브로커 미설치 시 app.rabbitmq.enabled=false로 비활성.
    implementation("org.springframework.boot:spring-boot-starter-amqp")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.named<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
    archiveFileName.set("shortform.jar")
}
