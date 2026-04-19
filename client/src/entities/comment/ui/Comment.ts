export interface Comment {
    id: number;
    commentText: string;
    commentUserId: number;
    commentVideoId: number;
    likeCount: number;
    replyCount: number;
    createAt: string;
    username: string;
    mention: string;
    profileImgSrc: string;
    social: boolean;
    provider: string;
}
