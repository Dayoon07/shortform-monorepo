import { REST_API_SERVER } from "../constants/ApiCollectionList";

/**
 * 저장된 media 경로를 실제 표시용 URL로 변환한다.
 * - 절대 URL(http/https: S3·CloudFront·소셜 프로필 등)은 그대로 사용
 * - 상대경로(/resources/...: 로컬 디스크 서빙)는 서버 주소를 앞에 붙인다
 * 스토리지를 로컬↔S3로 바꿔도 프론트 변경 없이 동작하도록 한다.
 */
export const mediaUrl = (path?: string | null): string => {
    if (!path) return "";
    return /^https?:\/\//i.test(path) ? path : `${REST_API_SERVER}${path}`;
};
