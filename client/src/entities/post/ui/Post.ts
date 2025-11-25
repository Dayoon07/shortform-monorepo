export interface Post {
    id: number,
    username: string,
    profileImgSrc: string,
    mention: string,
    communityUuid: string,
    communityWriterId: number,
    communityText: string,
    createAt: string,
    files: string,
    likeCnt: number,
    commentCnt: number
}