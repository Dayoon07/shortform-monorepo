export interface VideoSwipe {
    id: number,
    title: string,
    videoSrc: string,
    videoLoc: string,
    videoTag: string,
    description: string,
    views: number,
    commentCount: number,
    isFollowing: boolean,
    isLiked: boolean,
    likeCount: number,
    commentAvailability: string,
    videoWatchAvailability: string,
    uploadAt: string,
    uploader: {
        id: number,
        username: string,
        mention: string,
        social: boolean,
        provider: string,
        profileImgSrc: string,
    }
}