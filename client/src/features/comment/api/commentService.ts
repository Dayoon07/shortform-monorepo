import { Comment } from "../../../entities/comment/ui/Comment";
import { CommentCreateRes } from "../../../entities/comment/ui/CommentCreateRes";
import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";

export async function insertComment(id: number, comment: string): Promise<ApiResponse<CommentCreateRes>> {
    return await apiClient.post<CommentCreateRes>(
        API_LIST.COMMENT.INSERT, true, {
            commentVideoId: id,
            commentText: comment
        });
}

export async function popularCommentList(videoId: number): Promise<ApiResponse<Comment[]>> {
    return await apiClient.get<Comment[]>(
        API_LIST.COMMENT.POPULAR_LIST(videoId), false);
}

export async function recentCommentList(videoId: number): Promise<ApiResponse<Comment[]>> {
    return await apiClient.get<any>(
        API_LIST.COMMENT.RECENT_LIST(videoId), false);
}