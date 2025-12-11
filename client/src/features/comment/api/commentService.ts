import { Comment } from "../../../entities/comment/ui/Comment";
import { API_LIST, REST_API_SERVER } from "../../../shared/constants/ApiCollectionList";

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

export async function popularCommentList(videoId: number): Promise<Comment[]> {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.COMMENT.POPULAR_LIST(videoId)}`);
        if (!res.ok) throw new Error("에러남!!!");
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function recentCommentList(videoId: number): Promise<Comment[]> {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.COMMENT.RECENT_LIST(videoId)}`);
        if (!res.ok) throw new Error("에러남!!!");
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}