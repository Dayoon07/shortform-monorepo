import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { API_LIST } from "../../../shared/constants/ApiList";

export async function getProfileByMention(mention) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.USER.USER_INFO(mention)}`);
        if (!res.ok) throw new Error("멘션에 해당하는 프로필 사용자를 찾지 못했습니다.");
        return await res.json();
    } catch (error) {
        console.error('프로필 수신 실패:', error);
        throw error;
    }
}

export async function getProfileVideos(mention) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO.USER_VIDEO(mention)}`);
        if (!res.ok) throw new Error("영상을 찾지 못했습니다.");
        return await res.json();
    } catch (error) {
        console.error('비디오 수신 실패:', error);
        return [];
    }
}
