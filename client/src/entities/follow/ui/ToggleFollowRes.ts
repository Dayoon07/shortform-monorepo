export interface ToggleFollowRes {
    isFollowing: boolean,
    success: boolean,
    message: string,
    followerCount?: number,
    followingCount?: number
}