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

export async function editUserProfile(username, mail, mention, bio, profileImg, currentProfileImgSrc, id) {
    try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("mail", mail);
        formData.append("mention", mention);
        formData.append("bio", bio);
        formData.append("id", id);
        if (profileImg) formData.append("profileImg", profileImg);
        if (currentProfileImgSrc) formData.append("currentProfileImgSrc", currentProfileImgSrc);

        const res = await fetch(`${REST_API_SERVER}${API_LIST.USER.EDIT}`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(`서버 응답 오류: ${err}`);
        }

        const data = await res.json();
        console.log("프로필 수정 성공:", data);
        return data;
    } catch (error) {
        console.error("프로필 수정 실패:", error);
        throw error;
    }
}
