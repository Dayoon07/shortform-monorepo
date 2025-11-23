export interface Comment {
    id: number,
    username: string,
    mention: string,
    profileImgSrc: string,
    commentText: string,
    commentUserId: number,
    commentVideoId: number,
    likeCount: number,
    createAt: string
}