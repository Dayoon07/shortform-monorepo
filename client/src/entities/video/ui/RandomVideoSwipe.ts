export interface RandomVideoSwipe {
    id: number,
    commentCnt: number,
    likeCnt: number,
    isFollowing: boolean,
    isLiked: boolean,
    hasMore: boolean,
    video: {
        id: number,
        videoTitle: string,
        videoDescription: string,
        videoName: string,
        videoSrc: string,
        videoTag: string,
        videoViews: number,
        videoLoc: string,
        uploader: {
            id: number,
            username: string,
            mail: string,
            mention: string,
            profileImgSrc: string,
            createAt: string,
            social: boolean,
            provider: string
        },
        videoWatchAvailability: string,
        commentAvailability: string,
        previewImg: string,
        uploadAt: string
    }
}