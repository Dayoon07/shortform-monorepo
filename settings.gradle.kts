rootProject.name = "shortform-monorepo"

dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}

include(":server")
include(":client")