export interface LoginRes {
    success: boolean,
    message: string,
    token: string,
    tokenType: string,
    user: {
        id: number,
        username: string,
        mail: string,
        profileImgSrc: string,
        mention: string,
        createAt: string,
        social: boolean,
        provider: string
    }
}