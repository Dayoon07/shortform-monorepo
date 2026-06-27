import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { PostWithProfile } from "../../../entities/post/ui/PostWithProfile";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";
import { WritePostRes } from "../../../entities/post/ui/WritePostRes";
import { DetailPostWithProfile } from "../../../entities/post/ui/DetailPostWithProfile";
import { PostLikeReq } from "@/entities/post/ui/PostLikeReq";
import { PostComment } from "@/entities/post/ui/PostComment";

export async function getUserPosts(mention: string): Promise<PostWithProfile[]> {
    const res = await apiClient.get<PostWithProfile[]>(API_LIST.POST.USER_POST(mention), false);
    if (!res.ok || res.data === undefined) throw new Error("해당 게시글을 찾을 수 없습니다: " + res);
    return res.data;
}

export const getPostDetail = async (communityUuid: string): Promise<ApiResponse<DetailPostWithProfile>> => 
    await apiClient.get<DetailPostWithProfile>(API_LIST.POST.GET_DETAIL(communityUuid), false);

export const getPostDetailComments = async (communityUuid: string): Promise<ApiResponse<PostComment[]>> => 
    await apiClient.get<PostComment[]>(API_LIST.POST.COMMENT.GET(communityUuid), false);

export const createPost = async (formData: FormData): Promise<ApiResponse<WritePostRes>> => 
    await apiClient.post<WritePostRes>(API_LIST.POST.WRITE, true, formData);

export const togglePostLike = async (communityUuid: string): Promise<ApiResponse<PostLikeReq>> => 
    await apiClient.post<PostLikeReq>(API_LIST.POST.LIKE.TOGGLE(communityUuid), true);

export const deletePost = async (id: number): Promise<ApiResponse<any>> =>
    await apiClient.post<any>(API_LIST.POST.DELETE(id), true);

export const insertPostComment = async (communityId: number, comment: string): Promise<ApiResponse<any>> =>
    await apiClient.post<any>(API_LIST.POST.COMMENT.INSERT(communityId, comment), true);

export const updatePostComment = async (commentId: number, comment: string): Promise<ApiResponse<any>> =>
    await apiClient.post<any>(API_LIST.POST.COMMENT.UPDATE(commentId, encodeURIComponent(comment)), true);

export const deletePostComment = async (commentId: number): Promise<ApiResponse<any>> =>
    await apiClient.post<any>(API_LIST.POST.COMMENT.DELETE(commentId), true);

export const insertPostCommentReply = async (commentId: number): Promise<ApiResponse<any>> =>
    await apiClient.post<any>(API_LIST.POST.COMMENT.REPLY.INSERT, true, {
        "commentId": commentId});

// 답글 작성 (텍스트 포함, 백엔드 @RequestParam 형식에 맞춤)
export const submitPostCommentReply = async (commentId: number, replyText: string): Promise<ApiResponse<any>> =>
    await apiClient.post<any>(API_LIST.POST.COMMENT.REPLY.SUBMIT(commentId, encodeURIComponent(replyText)), true);

// 특정 댓글의 답글 목록
export const getPostCommentReplies = async (commentId: number): Promise<ApiResponse<PostComment[]>> =>
    await apiClient.get<PostComment[]>(API_LIST.POST.COMMENT.REPLY.LIST(commentId), false);

// 답글 수정 (작성자 본인)
export const updatePostCommentReply = async (replyId: number, replyText: string): Promise<ApiResponse<any>> =>
    await apiClient.post<any>(API_LIST.POST.COMMENT.REPLY.UPDATE(replyId, encodeURIComponent(replyText)), true);

// 답글 소프트 삭제 (작성자 본인)
export const deletePostCommentReply = async (replyId: number): Promise<ApiResponse<any>> =>
    await apiClient.post<any>(API_LIST.POST.COMMENT.REPLY.DELETE(replyId), true);

export const togglePostCommentLike = async (postCommentId: number): Promise<ApiResponse<any>> => 
    await apiClient.post<any>(API_LIST.POST.COMMENT.LIKE.TOGGLE, true, {
        "postCommentId": postCommentId});
