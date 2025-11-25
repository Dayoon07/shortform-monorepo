import { API_LIST } from "../../../shared/constants/ApiList";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";

export async function getRandomVideo(mention: string, excludeIds: number[] = []) {
    try {
        const response = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO.RANDOM_VIDEO(excludeIds, mention)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) throw new Error('영상을 불러올 수 없습니다.');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Random video fetch error:', error);
        throw error;
    }
}

export async function getFirstSwipeVideo(videoLoc: string, mention: string) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO.FIRST_SWIPE_VIDEO(videoLoc, mention)}`, {
            method: "POST",
        });
        if (!res.ok) throw new Error("에러남!!!");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function toggleVideoLike(videoId: number) {
    try {
        const response = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO_LIKE.TOGGLE_VIDEO_LIKE}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                videoId: videoId
            })
        });
        
        if (!response.ok) throw new Error('좋아요 처리 실패');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Like toggle error:', error);
        throw error;
    }
}