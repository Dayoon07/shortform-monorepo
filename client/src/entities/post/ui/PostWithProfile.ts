export interface PostWithProfile {
    id: number;
    username: string;
    profileImgSrc: string;
    mention: string;
    social: boolean;
    provider: string;
    communityUuid: string;
    communityWriterId: number;
    communityText: string;
    createAt: string;
    files: string;
    likeCnt: number;
    commentCnt: number;
}