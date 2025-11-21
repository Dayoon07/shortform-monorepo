export const API_LIST = {
    USER: {
        ALL: "/api/user/all",
        SIGNUP: "/api/user/signup",
        LOGIN: "/api/user/login",
        LOGOUT: "/api/user/logout",
        CHK_USERNAME: (username: string) => `/api/user/chk/username?username=${username}`,
        CHK_EMAIL: (email: string) => `/api/user/chk/mail?mail=${email}`,
        EDIT: "/api/user/update",
        USER_INFO: (mention: string) => `/api/user/profile/info?mention=${mention}`
    },
    VIDEO: {
        // 페이징된 비디오 목록 (기본)
        ALL: "/api/video/all",
        // 전체 비디오 목록 (레거시)
        ALL_LEGACY: "/api/video/all/legacy",
        USER_VIDEO: (mention: string) => `/api/user/info/${mention}/video`,
        RANDOM_VIDEO: "/api/videos/random",
        FIRST_SWIPE_VIDEO: (videoLoc: string, mention: string) => `/api/video/swipe/find?videoLoc=${videoLoc}&mention=${mention}`,
        UPLOAD_VIDEO: "/api/upload/video",
        SEARCH: (query: string) => `/api/video/search?q=${query}`,
        TAG: (tag: string) => `/api/hashtag?videoTag=${tag}`
    },
    VIDEO_LIKE: {
        ALL: "/api/video/like/all",
        TOGGLE_VIDEO_LIKE: "/api/video/like",
        MY_LIKE_VIDEOS: (mention: string) => `/api/like/video?mention=${mention}`
    },
    COMMENT: {
        INSERT_COMMENT: `/api/video/insert/comment/by/mention`,
        POPULAR_COMMENT_LIST: (id: number) => `/api/video/find/comment/popular?id=${id}`,
        RECENT_COMMENT_LIST: (id: number) => `/api/video/find/comment/recent?id=${id}`
    },
    SEARCH: {
        ALL: "/api/user/search/all",
        SEARCH: (query: string, mention: string) => `/api/search?q=${query}&mention=${mention}`,
        SEARCH_LIST: (id: number) => `/api/user/search/list?id=${id}`,
        SEARCH_WORD_DELETE: "/api/search/list/delete"
    },
    FOLLOW: {
        ALL: "/api/user/follow/all",
        FOLLOW: "/api/follow",
        TOGGLE_FOLLOW: "/api/follow/toggle",
        FOLLOW_STATUS: (reqUserMention: string, resUserMention: string) => `/api/follow/status/upgrade?reqMention=${reqUserMention}&resMention=${resUserMention}`,
        USER_FOLLOWER_LIST: (id: number) => `/api/follow/user/follower/list?id=${id}`,
        USER_FOLLOWING_LIST: (id: number) => `/api/follow/user/following/list?id=${id}`,
        UPGRADE_TOGGLE_FOLLOW: (reqUserMention: string, resUserMention: string) => `/api/follow/toggle/upgrade?reqMention=${reqUserMention}&resMention=${resUserMention}`
    },
    POST: {
        ALL: "/api/community/all",
        USER_POST: (mention: string) => `/api/user/post/info?mention=${mention}`,
        CREATE_POST: "/api/post/write",
        TOGGLE_POST_LIKE: (communityUuid: string) => `/api/post/like?communityUuid=${communityUuid}`
    }
};