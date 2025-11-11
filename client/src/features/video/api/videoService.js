// src/features/video/api/videoService.js
import { API_LIST } from "../../../shared/constants/ApiList";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";

/**
 * 페이징된 비디오 목록을 가져옵니다
 * @param {number} page - 페이지 번호 (0부터 시작)
 * @param {number} size - 페이지당 아이템 수
 * @returns {Promise<{content: Array, totalPages: number, totalElements: number, last: boolean}>}
 */
export async function getVideoPaginated(page = 0, size = 20) {
    try {
        const res = await fetch(
            `${REST_API_SERVER}${API_LIST.VIDEO.ALL}?page=${page}&size=${size}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        // 백엔드가 페이징 정보를 포함하지 않는 경우를 대비한 처리
        if (Array.isArray(data)) {
            return {
                content: data,
                totalPages: 1,
                totalElements: data.length,
                last: true,
                number: page
            };
        }

        return data;
    } catch (error) {
        console.error('Failed to fetch videos:', error);
        throw error;
    }
}

/**
 * 모든 비디오를 가져옵니다 (기존 호환성 유지)
 * @returns {Promise<Array>} 비디오 배열
 */
export async function getVideoAll() {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO.ALL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        if (!Array.isArray(data)) {
            console.warn('Expected array but got:', typeof data);
            return [];
        }

        return data;
    } catch (error) {
        console.error('Failed to fetch videos:', error);
        throw error;
    }
}

/**
 * 특정 비디오의 상세 정보를 가져옵니다
 */
export async function getVideoById(videoLoc) {
    try {
        const res = await fetch(`${REST_API_SERVER}/api/video/${videoLoc}`);
        
        if (!res.ok) {
            throw new Error(`Video not found: ${videoLoc}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Failed to fetch video:', error);
        throw error;
    }
}

export async function getTagVideoList(tag) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO.TAG(tag)}`);
        if (!res.ok) throw new Error("에러남!!!");
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

























