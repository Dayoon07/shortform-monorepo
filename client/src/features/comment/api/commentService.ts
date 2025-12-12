import { Comment } from "../../../entities/comment/ui/Comment";
import { API_LIST, REST_API_SERVER } from "../../../shared/constants/ApiCollectionList";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";

export async function insertComment(formData: FormData): Promise<any> {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.COMMENT.INSERT}`, {
            method: "POST",
            body: formData
        });
        if (!res.ok) throw new Error("에러남!!!");
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function popularCommentList(videoId: number): Promise<ApiResponse<Comment[]>> {
    return await apiClient.get<Comment[]>(API_LIST.COMMENT.POPULAR_LIST(videoId), false);
}

export async function recentCommentList(videoId: number): Promise<ApiResponse<Comment[]>> {
    return await apiClient.get(API_LIST.COMMENT.RECENT_LIST(videoId), false);
}