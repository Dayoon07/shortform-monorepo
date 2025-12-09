// 웬만하면 RequestParam으로 요청하는 거는 함수처럼 만듬
export const API_LIST = {
    USER: {
        GOOGLE_LOGIN: "/oauth2/authorization/google",
        SIGNUP: "/api/user/signup",
        LOGIN: "/api/user/login",
        LOGOUT: "/api/user/logout",
        ME: "/api/user/me",
        EDIT: "/api/user/update",
        INFO: (m: string) => `/api/user/profile/info?mention=${m}`,
        CHECK_USERNAME: (n: string) => `/api/user/chk/username?username=${n}`,
        CHECK_EMAIL: (e: string) => `/api/user/chk/mail?mail=${e}`,
    },
    VIDEO: {
        ALL: "/api/video/all",                  // 페이징된 비디오 목록 (기본)
        ALL_LEGACY: "/api/video/all/legacy",    // 전체 비디오 목록 (레거시)
        UPLOAD: "/api/upload/video",
        RANDOM: (excludeIds: number[], mention: string) => `/api/videos/v2/random?excludeIds=${excludeIds}&mention=${mention}`,
        SEARCH: (q: string) => `/api/video/search?q=${q}`,
        HASHTAG: (t: string) => `/api/hashtag?videoTag=${t}`,
        USER_VIDEO: (m: string) => `/api/user/info/${m}/video`,
        FIRST_SWIPE_VIDEO: (loc: string, m: string) => `/api/video/swipe/find?videoLoc=${loc}&mention=${m}`,
    },
    VIDEO_LIKE: {
        TOGGLE: "/api/video/like/by/mention",
        MY_LIKE_INFO: (m: string) => `/api/like/video?mention=${m}`
    },
    COMMENT: {
        INSERT: `/api/video/insert/comment/by/mention`,
        POPULAR_LIST: (i: number) => `/api/video/find/comment/popular?id=${i}`,
        RECENT_LIST: (i: number) => `/api/video/find/comment/recent?id=${i}`
    },
    SEARCH: {
        SEARCH: "/api/search",
        WORD_DELETE: "/api/search/list/delete",
        MY_LIST: (i: number) => `/api/user/search/list?id=${i}`,
    },
    FOLLOW: {
        FOLLOW: "/api/follow",
        TOGGLE: "/api/follow/toggle",
        STATUS: (requm: string, resum: string) => `/api/follow/status/upgrade?reqMention=${requm}&resMention=${resum}`,
        USER_FOLLOWER_LIST: (i: number) => `/api/follow/user/follower/list?id=${i}`,
        USER_FOLLOWING_LIST: (i: number) => `/api/follow/user/following/list?id=${i}`,
        UPGRADE_TOGGLE_FOLLOW: (requm: string, resum: string) => `/api/follow/toggle/upgrade?reqMention=${requm}&resMention=${resum}`
    },
    POST: {
        USER_POST: (m: string) => `/api/user/post/info?mention=${m}`,
        WRITE: "/api/post/write",
        TOGGLE_LIKE: (i: string) => `/api/post/like?communityUuid=${i}`
    }
};