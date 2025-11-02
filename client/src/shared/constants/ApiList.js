export const API_LIST = {
    USER: {
        SIGNUP: "/api/user/signup",
        LOGIN: "/api/user/login",
        CHK_USERNAME: (username) => `/api/user/chk/username?username=${username}`,
        CHK_EMAIL: (email) => `/api/user/chk/mail?mail=${email}`
    },
    VIDEO: {
        ALL: "/api/video/all"
    }
};