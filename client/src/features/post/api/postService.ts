import { API_LIST, REST_API_SERVER } from "../../../shared/constants/ApiCollectionList";
import { Post } from "../../../entities/post/ui/Post";
import { apiClient } from "../../../shared/utils/ApiClient";

export async function getUserPosts(mention: string): Promise<Post[]> {
    const res = await apiClient.get<Post[]>(API_LIST.POST.USER_POST(mention), false);
    if (!res.ok || res.data === undefined) throw new Error("해당 게시글을 찾을 수 없습니다: " + res);
    return res.data;
}

export async function createPost(formData: FormData) {
    try {
        const response = await fetch(`${REST_API_SERVER}${API_LIST.POST.WRITE}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('게시글 작성 오류:', error);
        throw error;
    }
}

export async function togglePostLike(communityUuid: string) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.POST.TOGGLE_LIKE(communityUuid)}`,{
            method: "POST"
        });

        if (!res.ok) throw new Error('좋아요 처리 실패');
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('좋아요 처리 오류:', error);
        throw error;
    }
}






