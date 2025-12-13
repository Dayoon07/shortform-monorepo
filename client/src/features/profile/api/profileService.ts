import { API_LIST, REST_API_SERVER } from "../../../shared/constants/ApiCollectionList";
import { apiClient } from "../../../shared/utils/ApiClient";
import { ProfileEditRes } from "../../../entities/profile/ui/ProfileEditRes";
import { ProfileUserData } from "../../../entities/profile/ui/ProfileUserData";

export async function getProfileByMention(mention: string): Promise<ProfileUserData> {
    const res = await apiClient.get<ProfileUserData>(API_LIST.USER.INFO(mention), false);
    if (!res.ok || res.data === undefined) 
        throw new Error("멘션에 해당하는 프로필 사용자를 찾지 못했습니다: " + res);
    // console.log(res.data);
    return res.data;
}

export async function getProfileVideos(mention: string) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO.USER_VIDEO(mention)}`);
        if (!res.ok) throw new Error("영상을 찾지 못했습니다.");
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('비디오 수신 실패:', error);
        throw error;
    }
}

export async function editUserProfile(
    formData: { username: string, mail: string, mention: string, bio: string },
    profileImg: File | null,
    currentProfileImgSrc: string, // 기존 이미지 경로
) {
    try {
        const form = new FormData();
        // 1. DTO에 해당하는 필드를 JSON 문자열로 변환하여 'req'라는 이름으로 FormData에 추가
        // 참고: Long id는 서버의 AuthUserReqDto에서 가져오므로 여기서 DTO에 포함하지 않아도 됩니다.
        const profileDto = {
            username: formData.username,
            mail: formData.mail,
            mention: formData.mention,
            bio: formData.bio,
            // profileImg, profileImgSrc 필드는 DTO에서 제거하거나 사용하지 않습니다.
        };
        form.append("req", JSON.stringify(profileDto));

        // 2. 파일 추가 (서버의 @RequestPart(value = "profileImg")와 매칭)
        // 3. 기존 이미지 경로 추가 (서버의 @RequestPart(value = "currentProfileImgSrc")와 매칭)
        if (profileImg) form.append("profileImg", profileImg);
        if (currentProfileImgSrc) form.append("currentProfileImgSrc", currentProfileImgSrc);

        const res = await apiClient.post<ProfileEditRes>(API_LIST.USER.EDIT, true, { form });
        if (!res.ok) throw new Error("서버 응답 오류: " + res);
        if (!res.data === undefined) throw new Error("값이 없음: " + res);

        console.log("프로필 수정 성공:", res.data);
        return res.data;
    } catch (error) {
        console.error("프로필 수정 실패:", error);
        throw error;
    }
}
