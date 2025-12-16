import { Comment } from "../../../entities/comment/ui/Comment";
import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";

export async function insertComment(formData: FormData): Promise<ApiResponse<any>> {
    return await apiClient.post<any>(
        API_LIST.COMMENT.INSERT, true, { formData });
}

export async function popularCommentList(videoId: number): Promise<ApiResponse<Comment[]>> {
    return await apiClient.get<Comment[]>(
        API_LIST.COMMENT.POPULAR_LIST(videoId), false);
}

export async function recentCommentList(videoId: number): Promise<ApiResponse<Comment[]>> {
    return await apiClient.get<any>(
        API_LIST.COMMENT.RECENT_LIST(videoId), false);
}