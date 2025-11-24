export interface LoginResponse {
    success: boolean,
    message: string,
    user: {
        id: number,
        username: string,
        mail: string,
        profileImgSrc: string,
        mention: string,
        createAt: string
    }
}