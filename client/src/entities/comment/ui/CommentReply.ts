export interface CommentReply {
    id: number;
    commentReplyText: string;
    commentReplyUserId: number;
    commentReplyId: number;
    createAt: string;
    username: string;
    mention: string;
    profileImgSrc: string;
    social: boolean;
    provider: string;
    likeCount: number;
}
