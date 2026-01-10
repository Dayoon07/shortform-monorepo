export interface PostComment {
    id: number
    commentText: string;
    commentUserId: number;
    communityId: number;
    createAt: string;
    username: string;
    social: boolean;
    mention: string;
    profileImgSrc: string;
    provider: string;
    replyCount: number;
    likeCount: number;
}