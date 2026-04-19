export interface Profile {
    id: number,
    username: string,
    mail: string,
    profileImg: string,
    profileImgSrc: string,
    bio: string,
    mention: string,
    createAt: string,
    social: boolean,
    provider: string,
    followerCount: number,
    followingCount: number,
    totalViews: number,
    totalLikes: number
}