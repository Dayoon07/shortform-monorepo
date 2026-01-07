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

export const getPostDetailComments = async (p1: any): Promise<ApiResponse<any[]>> => 
    await apiClient.get<any>(API_LIST.POST.COMMENT.GET(p1), false);

export const createPost = async (formData: FormData): Promise<ApiResponse<WritePostRes>> => 
    await apiClient.post<WritePostRes>(API_LIST.POST.WRITE, true, formData);

export const togglePostLike = async (communityUuid: string) => 
    await apiClient.post<any>(API_LIST.POST.LIKE.TOGGLE(communityUuid), true);

export const deletePost = async (commentUuid: string): Promise<ApiResponse<any>> => 
    await apiClient.post<any>(API_LIST.POST.DELETE(commentUuid), true);

export const insertPostComment = async (communityUuid: string | undefined): Promise<ApiResponse<any>> => 
    await apiClient.post<any>(API_LIST.POST.COMMENT.INSERT, false, {
        "communityUuid": communityUuid});

export const insertPostCommentReply = async (commentId: number): Promise<ApiResponse<any>> => 
    await apiClient.post<any>(API_LIST.POST.COMMENT.REPLY.INSERT, false, {
        "commentId": commentId});

export const togglePostCommentLike = async (postCommentId: number): Promise<ApiResponse<any>> => 
    await apiClient.post<any>(API_LIST.POST.COMMENT.LIKE.TOGGLE, false, {
        "postCommentId": postCommentId});









