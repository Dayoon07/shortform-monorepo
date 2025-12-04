export interface VideoSwipe {
    commentCount: number,
    description: string,
    id: number,
    isFollowing: boolean,
    isLiked: boolean,
    likeCount: number,
    title: string,
    videoLoc: string,
    videoSrc: string,
    videoTag: string,
    views: number,
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