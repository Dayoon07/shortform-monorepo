import { UserInfoEditResponse } from "../../../entities/user/ui/UserInfoEditRes";
import { LoginResponse } from "../../../entities/user/ui/LoginRes";
import { API_LIST, REST_API_SERVER } from "../../../shared/constants/ApiCollectionList";
import { showSuccessToast, showErrorToast } from "../../../shared/utils/toast";
import { LogoutRes } from "../../../entities/user/ui/LogoutRes";
import { apiClient } from "../../../shared/utils/ApiClient";

export async function signup(formData: FormData): Promise<{ data: string }> {
    try {
        const response = await fetch(`${REST_API_SERVER}${API_LIST.USER.SIGNUP}`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.text();
            return { data: data };
        } else {
            const message = await response.text();
            showErrorToast(`회원가입 실패: ${message}`);
            return { data: message };
        }
    } catch (error) {
        showErrorToast(`에러 발생 ${error}`);
        throw error;
    }
}

export async function login(username: string, password: string): Promise<LoginResponse | null> {
    const response = await apiClient.post<LoginResponse>(API_LIST.USER.LOGIN, false, {
        "username": username,
        "password": password
    });

    if (!response.ok || response.data === undefined || !response.data.success) {
        console.error("로그인 실패: ", response?.data?.message);
        return null;
    } else {
        localStorage.setItem("accessTknType", response.data.tokenType);
        localStorage.setItem("accessTkn", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        showSuccessToast(response.data.message);
        return response.data;
    }
}

export async function logout(token: string | null): Promise<LogoutRes> {
    const res = await apiClient.post<LogoutRes>(API_LIST.USER.LOGOUT, true);
    if (!res.ok || res.data === undefined) throw new Error("에러남!");
    localStorage.clear();
    return res.data;
}

export async function userInfoEdit(
    username: string, 
    mail: string, 
    mention: string, 
    bio: string, 
    profileImg: Blob, 
    currentProfileImgSrc: Blob): Promise<UserInfoEditResponse> {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.USER.EDIT}`, {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
                username: username,
                mail: mail,
                mention: mention,
                bio: bio,
                profileImg: profileImg,
                currentProfileImgSrc: currentProfileImgSrc
            })
        });

        if (!res.ok) throw new Error(`에러: ${res}`);

        const data = await res.json();
        console.log(data);
        return {
            status: data.success,
            message: data.message,
            profileImgPath: data.profileImgPath,
            data: data.user
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}