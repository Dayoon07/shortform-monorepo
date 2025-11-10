export const API_LIST = {
    USER: {
        ALL: "/api/user/all",
        SIGNUP: "/api/user/signup",
        LOGIN: "/api/user/login",
        LOGOUT: "/api/user/logout",
        CHK_USERNAME: (username) => `/api/user/chk/username?username=${username}`,
        CHK_EMAIL: (email) => `/api/user/chk/mail?mail=${email}`,
        EDIT: "/api/user/update",
        USER_INFO: (mention) => `/api/user/info/${mention}`
    },
    VIDEO: {
        // 페이징된 비디오 목록 (기본)
        ALL: "/api/video/all",
        // 전체 비디오 목록 (레거시)
        ALL_LEGACY: "/api/video/all/legacy",
        USER_VIDEO: (mention) => `/api/user/info/${mention}/video`,
        RANDOM_VIDEO: "/api/videos/random",
        FIRST_SWIPE_VIDEO: (videoLoc, mention) => `/api/video/swipe/find?videoLoc=${videoLoc}&mention=${mention}`,
        UPLOAD_VIDEO: "/api/upload/video",
        SEARCH: (query) => `/api/video/search?q=${query}`
    },
    VIDEO_LIKE: {
        ALL: "/api/video/like/all",
        TOGGLE_VIDEO_LIKE: "/api/video/like",
        MY_LIKE_VIDEOS: (mention) => `/api/like/video?mention=${mention}`
    },
    SEARCH: {
        ALL: "/user/search/all",
        SEARCH: (query, mention) => `/api/search?q=${query}&mention=${mention}`,
        SEARCH_LIST: (id) => `/api/user/search/list?id=${id}`,
        SEARCH_WORD_DELETE: "/api/search/list/delete"
    },
    FOLLOW: {
        ALL: "/api/user/follow/all",
        FOLLOW: "/api/follow",
        TOGGLE_FOLLOW: "/api/follow/toggle",
        FOLLOW_STATUS: (mention) => `/api/follow/status?mention=${mention}`,
        USER_FOLLOWER_LIST: (id) => `/api/follow/user/follower/list?id=${id}`,
        USER_FOLLOWING_LIST: (id) => `/api/follow/user/following/list?id=${id}`,
    },
    POST: {
        ALL: "/api/community/all",
        USER_POST: (mention) => `/api/user/post/info?mention=${mention}`
    }
};