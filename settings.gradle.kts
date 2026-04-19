rootProject.name = "shortform-monorepo"

pluginManagement {
    plugins {
        kotlin("jvm") version "2.2.0"
    }
}

dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}

include(":server")
include(":client")