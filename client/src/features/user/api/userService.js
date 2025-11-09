import { API_LIST } from "../../../shared/constants/ApiList";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { showSuccessToast } from "../../../shared/utils/toast";

export async function signup(formData) {
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
            alert("회원가입 실패: " + message);
        }
    } catch (error) {
        alert("에러 발생: " + error.message);
    }
}

export async function login(username, password) {
    try {
        //      주석 처리된 코드는 구글 소셜 로그인 기능 + JWT 토큰 로그인 
        //      방식을 구현하고 막상 사용을 안해서 그냥 방치 중
        //
        // fetch('/user/login', {   로그인
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-Client-Type': 'mobile'
        //     },
        //     body: JSON.stringify({
        //         username: 'user',
        //         password: 'pass'
        //     })
        // })
        //
        // // 이후 API 요청시
        // fetch('/api/someEndpoint', {
        //     headers: {
        //         'Authorization': 'Bearer ' + token
        //     }
        // })
        const response = await fetch(`${REST_API_SERVER}${API_LIST.USER.LOGIN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            // setTimeout(() => window.location.href = window.location.origin, 1000);
            showSuccessToast("로그인 되었습니다.");
            return data;
        } else {
            alert(`로그인 실패: ${data.message || "사용자명 또는 비밀번호가 올바르지 않습니다."}`);
        }
    } catch (error) {
        console.error("로그인 요청 오류:", error);
        alert("로그인 중 오류가 발생했습니다.");
    }
}

export async function logout() {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.USER.LOGOUT}`, {
            method: "POST"
        });
        if (res.ok) {
            const data1 = await res.text();
            // const data2 = await res.json();
            console.log(data1);
            // console.log(data2);
            localStorage.clear();
            // showSuccessToast("로그아웃 되었습니다");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function userInfoEdit(username, mail, mention, bio, profileImg, currentProfileImgSrc) {
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
    }
}