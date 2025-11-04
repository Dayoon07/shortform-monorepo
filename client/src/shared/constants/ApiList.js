import { REST_API_SERVER } from "./ApiServer";

export const API_LIST = {
    USER: {
        SIGNUP: "/api/user/signup",
        LOGIN: "/api/user/login",
        LOGOUT: "/api/user/logout",
        CHK_USERNAME: (username) => `/api/user/chk/username?username=${username}`,
        CHK_EMAIL: (email) => `/api/user/chk/mail?mail=${email}`,
        UPDATE: "/api/user/update",
        USER_INFO: (mention) => `/api/user/info/${mention}`
    },
    VIDEO: {
        ALL: "/api/video/all",
        USER_VIDEO: (mention) => `/api/user/info/${mention}/video`
    },
    SEARCH: {
        SEARCH: (query, mention) => `/api/search?q=${query}&mention=${mention}`,
        SEARCH_LIST: (id) => `/api/user/search/list?id=${id}`,
        SEARCH_WORD_DELETE: "/api/search/list/delete"
    },
    FOLLOW: {
        FOLLOW: "/api/follow",
        FOLLOW_TOGGLE: "/api/follow/toggle",
        FOLLOW_STATUS: "/api/follow/status",
        USER_FOLLOW_LIST: (id) => `/api/follow/user/follower/list?id=${id}`,
        USER_FOLLOWING_LIST: (id) => `/api/follow/user/following/list?id=${id}`
    },
    POST: {
        USER_POST: (mention) => `/api/user/info/${mention}/post`
    }
};

export const API_LIST_ALL_SERIES = {
    USER: `${REST_API_SERVER}/api/user/all`,
    FOLLOW: `${REST_API_SERVER}/api/user/follow/all`,
    VIDEO: `${REST_API_SERVER}/api/video/all`,
    VIDEO_LIKE: `${REST_API_SERVER}/api/video/like/all`,
};