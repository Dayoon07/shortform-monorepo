export const ROUTE = {
    /** 
     * 홈페이지 루트 경로
     * @example "/"
     */
    HOMEPAGE: "/",

    /** 
     * 검색 페이지 경로
     */
    SEARCH: "/search",

    DYNAMIC_SEARCH_ROUTE: (word) => `/search?q=${word}`,

    /** 
     * 로그아웃 요청 경로
     * @example "/logout"
     */
    LOGOUT: "/logout",

    /** 
     * 사용자 프로필 페이지 경로
     * @param {string} mention - 사용자 아이디 (예: "yoon")
     * @example ROUTE.PROFILE("yoon") => "/@yoon"
     */
    PROFILE: (mention) => `/@${mention}`,

    /** 
     * 특정 사용자의 개별 비디오 상세 페이지 경로
     * @param {string} mention - 사용자 아이디
     * @param {string} videoLoc - 비디오 식별자 (URL 또는 파일명 등)
     * @example ROUTE.PROFILE_VIDEO("yoon", "abc123") => "/@yoon/video/abc123"
     */
    PROFILE_VIDEO: (mention, videoLoc) => `/@${mention}/video/${videoLoc}`,

    /** 
     * 특정 사용자의 게시물 목록 페이지 경로
     * @param {string} mention - 사용자 아이디
     * @example ROUTE.PROFILE_POST("yoon") => "/@yoon/post"
     */
    PROFILE_POST: (mention) => `/@${mention}/post`,

    /** 
     * 특정 사용자의 게시물 상세 페이지 경로
     * @param {string} mention - 사용자 아이디
     * @param {string} communityUuid - 커뮤니티 게시물의 고유 식별자(UUID)
     * @example ROUTE.PROFILE_POST_DETAIL("yoon", "abcd-efgh") => "/@yoon/post/abcd-efgh"
     */
    PROFILE_POST_DETAIL: (mention, communityUuid) => `/@${mention}/post/${communityUuid}`,

    /** 
     * 프로필 내 스와이프 비디오 상세 페이지 경로
     * @param {string} mention - 사용자 아이디
     * @param {string} videoLoc - 비디오 식별자
     * @example ROUTE.PROFILE_SWIPE_VIDEO("yoon", "abc123") => "/@yoon/swipe/video/abc123"
     */
    PROFILE_SWIPE_VIDEO: (mention, videoLoc) => `/@${mention}/swipe/video/${videoLoc}`,

    /** 
     * 스튜디오 업로드 페이지 경로 (영상 업로드)
     * @example "/studio/upload"
     */
    STUDIO_UPLOAD: "/studio/upload",

    /** 
     * 스튜디오 게시글 작성 페이지 경로
     * @example "/studio/post/write"
     */
    STUDIO_POST_WRITE: "/studio/post/write",

    /** 
     * 팔로잉 피드 페이지 경로 (팔로우한 사용자들의 게시물)
     * @example "/following"
     */
    FOLLOWING: "/following",

    /** 
     * 탐색 페이지 경로 (추천, 트렌드 콘텐츠)
     * @example "/explore"
     */
    EXPLORE: "/explore",

    /** 
     * 좋아요한 콘텐츠 목록 페이지 경로
     * @example "/likes"
     */
    LIKES: "/likes",

    /** 
     * 로그인 필요 페이지 (로그인 유도용)
     * @example "/loginplz"
     */
    LOGINPLZ: "/loginplz",

    /** 
     * 해시태그 페이지 경로
     * @param {string} videoTag - 해시태그 문자열 (예: "funny")
     * @example ROUTE.HASHTAG("funny") => "/hashtag/funny"
     */
    HASHTAG: (videoTag) => `/hashtag/${videoTag}`,
};

export const PATTERN_ROUTE = {
    /** 
     * 프로필 페이지 경로 패턴  
     * - 특정 사용자의 프로필 페이지 매칭용
     * @param {string} mention - 사용자 아이디 (예: "@yoon")
     * @example "/:mention" => "/@yoon"
     */
    PROFILE: "/:mention",

    /** 
     * 특정 사용자의 비디오 상세 페이지 경로 패턴  
     * - 사용자 프로필 내 개별 비디오 상세 페이지 매칭용
     * @param {string} mention - 사용자 아이디
     * @param {string} videoLoc - 비디오 식별자
     * @example "/:mention/video/:videoLoc" => "/@yoon/video/abc123"
     */
    PROFILE_VIDEO: "/:mention/video/:videoLoc",

    /** 
     * 특정 사용자의 게시물 목록 페이지 경로 패턴  
     * - 프로필 내 게시물 탭 (post 목록) 매칭용
     * @param {string} mention - 사용자 아이디
     * @example "/:mention/post" => "/@yoon/post"
     */
    PROFILE_POST: "/:mention/post",

    /** 
     * 특정 사용자의 게시물 상세 페이지 경로 패턴  
     * - 개별 커뮤니티 게시물 상세 페이지 매칭용
     * @param {string} mention - 사용자 아이디
     * @param {string} communityUuid - 게시물 고유 식별자(UUID)
     * @example "/:mention/post/:communityUuid" => "/@yoon/post/abcd-efgh"
     */
    PROFILE_POST_DETAIL: "/:mention/post/:communityUuid",

    /** 
     * 프로필 내 스와이프 비디오 상세 페이지 경로 패턴  
     * - 스와이프 UI 기반의 비디오 상세 보기 매칭용
     * @param {string} mention - 사용자 아이디
     * @param {string} videoLoc - 비디오 식별자
     * @example "/:mention/swipe/video/:videoLoc" => "/@yoon/swipe/video/abc123"
     */
    PROFILE_SWIPE_VIDEO: "/:mention/swipe/video/:videoLoc",

    /** 
     * 해시태그 페이지 경로 패턴  
     * - 특정 해시태그를 기반으로 한 콘텐츠 목록 페이지 매칭용
     * @param {string} videoTag - 해시태그 문자열 (예: "funny")
     * @example "/hashtag/:videoTag" => "/hashtag/funny"
     */
    HASHTAG: "/hashtag/:videoTag",
};
