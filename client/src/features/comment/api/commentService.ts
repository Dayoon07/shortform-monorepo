import { Comment } from "../../../entities/comment/ui/Comment";
import { CommentCreateRes } from "../../../entities/comment/ui/CommentCreateRes";
import { CommentLikeToggleRes } from "../../../entities/comment/ui/CommentLikeToggleRes";
import { CommentReplyCreateReq } from "../../../entities/comment/ui/CommentReplyCreateReq";
import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";

export async function insertComment(id: number, comment: string
): Promise<ApiResponse<CommentCreateRes>> {
    const res = await apiClient.post<CommentCreateRes>(
        API_LIST.COMMENT.INSERT, true, {
            commentVideoId: id,
            commentText: comment
        });
    
    if (!res.ok || res.data === undefined) {
        console.log(res);
        throw new Error("뭐가 에러인지는 모르겠지만 에러: " + res);
    }

    return res;
}

export const popularCommentList = async (videoId: number): Promise<ApiResponse<Comment[]>> => 
    await apiClient.get<Comment[]>(API_LIST.COMMENT.POPULAR_LIST(videoId), false);

export const recentCommentList = async (videoId: number): Promise<ApiResponse<Comment[]>> => 
    await apiClient.get<Comment[]>(API_LIST.COMMENT.RECENT_LIST(videoId), false);

export const commentLikeToggle = async (commentId: number): Promise<ApiResponse<CommentLikeToggleRes>> => 
    await apiClient.post<CommentLikeToggleRes>(API_LIST.COMMENT.LIKE.TOGGLE(commentId), true);

export const insertCommentReply = async (req: CommentReplyCreateReq): Promise<ApiResponse<any>> => 
    await apiClient.post<any>(API_LIST.COMMENT.REPLY.INSERT, true, req);

export const replyCommentReq = async (commentId: number): Promise<ApiResponse<Comment[]>> => 
    await apiClient.get<Comment[]>(API_LIST.COMMENT.REPLY.LIST(commentId), false);

