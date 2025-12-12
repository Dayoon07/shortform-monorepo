import { Page } from "../../../entities/constants/Page";
import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";
import { API_LIST, REST_API_SERVER } from "../../../shared/constants/ApiCollectionList";

/**
 * 페이징된 비디오 목록을 가져옵니다
 * @param {number} page - 페이지 번호 (0부터 시작)
 * @param {number} size - 페이지당 아이템 수
 */
export async function getVideoPaginated(page: number = 0, size: number = 20): Promise<Page<VideoGridContent>> {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO.ALL}?page=${page}&size=${size}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) 
            throw new Error(`HTTP error! status: ${res.status}`);

        const data: Page<VideoGridContent> = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Failed to fetch videos:', error);
        throw error;
    }
}

export async function getTagVideoList(tag: string): Promise<VideoGridContent[]> {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO.HASHTAG(tag)}`);
        if (!res.ok) throw new Error("에러남!!!");
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function myLikeVideoList(mention: string): Promise<VideoGridContent[]> {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO_LIKE.MY_LIKE_INFO(mention)}`);
        if (!res.ok) throw new Error("에러남!!!");
        const data: VideoGridContent[] = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}