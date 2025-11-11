import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { API_LIST } from "../../../shared/constants/ApiList";

export async function getUserPosts(mention) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.POST.USER_POST(mention)}`);
        if (!res.ok) throw new Error('해당 게시물을 찾을 수 없습니다.');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('게시물 수신 실패:', error);
        return [];
    }
}

export async function createPost(formData) {
    try {
        const response = await fetch(`${REST_API_SERVER}${API_LIST.POST.CREATE_POST}`, {
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

export async function togglePostLike(communityUuid) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.POST.TOGGLE_POST_LIKE(communityUuid)}`,{
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
















