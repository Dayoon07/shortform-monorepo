import { API_LIST } from "../../../shared/constants/ApiList";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";

/**
 * 모든 비디오를 가져옵니다
 * @returns {Promise<Array>} 비디오 배열
 * @throws {Error} API 요청 실패시
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
        
        // 데이터 유효성 검사
        if (!Array.isArray(data)) {
            console.warn('Expected array but got:', typeof data);
            return [];
        }

        return data;
    } catch (error) {
        console.error('Failed to fetch videos:', error);
        throw error; // 에러를 상위로 전파하여 UI에서 처리하도록
    }
}

/**
 * 특정 비디오의 상세 정보를 가져옵니다
 * @param {string} videoLoc - 비디오 위치/ID
 * @returns {Promise<Object>} 비디오 상세 정보
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
