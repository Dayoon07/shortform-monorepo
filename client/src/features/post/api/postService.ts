import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { PostWithProfile } from "../../../entities/post/ui/PostWithProfile";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";
import { WritePostRes } from "../../../entities/post/ui/WritePostRes";
import { DetailPostWithProfile } from "../../../entities/post/ui/DetailPostWithProfile";

export async function getUserPosts(mention: string): Promise<PostWithProfile[]> {
    const res = await apiClient.get<PostWithProfile[]>(API_LIST.POST.USER_POST(mention), false);
    if (!res.ok || res.data === undefined) throw new Error("해당 게시글을 찾을 수 없습니다: " + res);
    return res.data;
}

export const getPostDetail = async (communityUuid: string): Promise<ApiResponse<DetailPostWithProfile>> => 
    await apiClient.get<DetailPostWithProfile>(API_LIST.POST.GET_DETAIL(communityUuid), false);

export const createPost = async (formData: FormData): Promise<ApiResponse<WritePostRes>> => 
    await apiClient.post<WritePostRes>(API_LIST.POST.WRITE, true, formData);

export async function togglePostLike(communityUuid: string) {
    const res = await apiClient.post<any>(API_LIST.POST.LIKE.TOGGLE(communityUuid), true);
    if (!res.ok || res.data === undefined) throw new Error("에러 남: " + res);
    return res.data;
}

export const deletePost = async (commentUuid: string): Promise<ApiResponse<any>> => 
    await apiClient.post<any>(API_LIST.POST.DELETE(commentUuid), true);

export const insertPostComment = async (communityUuid: string): Promise<ApiResponse<any>> => 
    await apiClient.post<any>(API_LIST.POST.COMMENT.INSERT, false, {
        "communityUuid": communityUuid});

export const insertPostCommentReply = async (communityUuid: string): Promise<ApiResponse<any>> => 
    await apiClient.post<any>(API_LIST.POST.COMMENT.REPLY.INSERT, false, {
        "communityUuid": communityUuid});

export const togglePostCommentLike = async (postCommentId: number): Promise<ApiResponse<any>> => 
    await apiClient.post<any>(API_LIST.POST.COMMENT.LIKE.TOGGLE, false, {
        "postCommentId": postCommentId});









