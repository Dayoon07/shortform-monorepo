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
    currentProfileImgSrc: string,
): Promise<ProfileEditRes> {
    const token = localStorage.getItem("accessTkn");
    const form = new FormData();

    // 1. DTO 데이터를 JSON Blob으로 추가 (서버의 @RequestPart와 매칭)
    const profileDto = {
        username: formData.username,
        mail: formData.mail,
        mention: formData.mention,
        bio: formData.bio,
    };
    form.append("req", new Blob([JSON.stringify(profileDto)], { type: 'application/json' }));

    // 2. 파일 및 추가 파라미터
    if (profileImg) form.append("profileImg", profileImg);
    if (currentProfileImgSrc) form.append("currentProfileImgSrc", currentProfileImgSrc);

    // 3. fetch 직접 호출
    const response = await fetch(`${REST_API_SERVER}${API_LIST.USER.EDIT}`, {
        method: 'POST',
        headers: {
            // 중요: Content-Type은 안 적어도 됩니다. 브라우저가 바운더리를 포함해 자동으로 설정합니다.
            'Authorization': `Bearer ${token}`
        },
        body: form
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "프로필 수정 실패");
    }

    return await response.json();
}