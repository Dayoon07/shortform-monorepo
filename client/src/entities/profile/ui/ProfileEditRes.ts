export interface ProfileEditRes {
    status: string,
    message: string,
    profileImgPath?: string,
    user: {
        id: number,
        username: string,
        mail: string,
        mention: string
    }
}