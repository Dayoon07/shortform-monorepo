// 웬만하면 RequestParam으로 요청하는 거는 함수처럼 만듬
export const API_LIST = {
    USER: {
        GOOGLE_LOGIN: "/oauth2/authorization/google",
        ME: "/api/user/me",
        ALL: "/api/user/all",
        SIGNUP: "/api/user/signup",
        LOGIN: "/api/user/login",
        LOGOUT: "/api/user/logout",
        CHK_USERNAME: (n: string) => `/api/user/chk/username?username=${n}`,
        CHK_EMAIL: (e: string) => `/api/user/chk/mail?mail=${e}`,
        EDIT: "/api/user/update",
        USER_INFO: (m: string) => `/api/user/profile/info?mention=${m}`
    },
    VIDEO: {
        ALL: "/api/video/all",                  // 페이징된 비디오 목록 (기본)
        ALL_LEGACY: "/api/video/all/legacy",    // 전체 비디오 목록 (레거시)
        USER_VIDEO: (m: string) => `/api/user/info/${m}/video`,
        RANDOM_VIDEO: (excludeIds: number[], mention: string) => `/api/videos/v2/random?excludeIds=${excludeIds}&mention=${mention}`,
        FIRST_SWIPE_VIDEO: (videoLoc: string, mention: string) => `/api/video/swipe/find?videoLoc=${videoLoc}&mention=${mention}`,
        UPLOAD_VIDEO: "/api/upload/video",
        SEARCH: (q: string) => `/api/video/search?q=${q}`,
        TAG: (t: string) => `/api/hashtag?videoTag=${t}`
    },
    VIDEO_LIKE: {
        ALL: "/api/video/like/all",
        TOGGLE_VIDEO_LIKE: "/api/video/like/by/mention",
        MY_LIKE_VIDEOS: (m: string) => `/api/like/video?mention=${m}`
    },
    COMMENT: {
        INSERT_COMMENT: `/api/video/insert/comment/by/mention`,
        POPULAR_COMMENT_LIST: (i: number) => `/api/video/find/comment/popular?id=${i}`,
        RECENT_COMMENT_LIST: (i: number) => `/api/video/find/comment/recent?id=${i}`
    },
    SEARCH: {
        ALL: "/api/user/search/all",
        SEARCH: (q: string, m: string | null) => `/api/search?q=${q}&mention=${m}`,
        SEARCH_LIST: (i: number) => `/api/user/search/list?id=${i}`,
        SEARCH_WORD_DELETE: "/api/search/list/delete"
    },
    FOLLOW: {
        ALL: "/api/user/follow/all",
        FOLLOW: "/api/follow",
        TOGGLE_FOLLOW: "/api/follow/toggle",
        FOLLOW_STATUS: (requm: string, resum: string) => `/api/follow/status/upgrade?reqMention=${requm}&resMention=${resum}`,
        USER_FOLLOWER_LIST: (i: number) => `/api/follow/user/follower/list?id=${i}`,
        USER_FOLLOWING_LIST: (i: number) => `/api/follow/user/following/list?id=${i}`,
        UPGRADE_TOGGLE_FOLLOW: (requm: string, resum: string) => `/api/follow/toggle/upgrade?reqMention=${requm}&resMention=${resum}`
    },
    POST: {
        ALL: "/api/community/all",
        USER_POST: (m: string) => `/api/user/post/info?mention=${m}`,
        CREATE_POST: "/api/post/write",
        TOGGLE_POST_LIKE: (i: string) => `/api/post/like?communityUuid=${i}`
    }
};