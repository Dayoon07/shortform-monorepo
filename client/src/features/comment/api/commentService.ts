import { Comment } from "../../../entities/comment/ui/Comment";
import { CommentCreateRes } from "../../../entities/comment/ui/CommentCreateRes";
import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";

export async function insertComment(id: number, comment: string): Promise<ApiResponse<CommentCreateRes>> {
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

export async function popularCommentList(videoId: number): Promise<ApiResponse<Comment[]>> {
    return await apiClient.get<Comment[]>(
        API_LIST.COMMENT.POPULAR_LIST(videoId), false);
}

export async function recentCommentList(videoId: number): Promise<ApiResponse<Comment[]>> {
    return await apiClient.get<any>(
        API_LIST.COMMENT.RECENT_LIST(videoId), false);
}

export async function commentLikeToggle(commentId: number): Promise<ApiResponse<any>> {
    return await apiClient.post<any>(API_LIST.COMMENT.LIKE.TOGGLE(commentId), true);
}