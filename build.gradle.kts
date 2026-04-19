// 루트 build.gradle.kts
plugins {
    kotlin("jvm") version "2.0.0" apply false
    id("io.ktor.plugin") version "3.1.2" apply false
}

// 프론트 빌드 → 백엔드 static에 복사하는 태스크
tasks.register<Exec>("buildFrontend") {
    workingDir("frontend")
    commandLine("npm", "run", "build")
}

tasks.register<Copy>("copyFrontendBuild") {
    dependsOn("buildFrontend")
    from("frontend/dist")
    into("backend/src/main/resources/static")
}

tasks.register("buildAll") {
    group = "build"
    description = "Frontend 빌드 후 Backend 빌드"
    dependsOn("copyFrontendBuild", ":backend:buildFatJar")
}