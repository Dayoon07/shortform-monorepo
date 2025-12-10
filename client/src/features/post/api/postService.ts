import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { API_LIST } from "../../../shared/constants/ApiList";
import { Post } from "../../../entities/post/ui/Post";

export async function getUserPosts(mention: string): Promise<Post[]> {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.POST.USER_POST(mention)}`);
        if (!res.ok) throw new Error('해당 게시물을 찾을 수 없습니다.');
        const data: Post[] = await res.json();
        return data;
    } catch (error) {
        console.error('게시물 수신 실패:', error);
        throw error;
    }
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






