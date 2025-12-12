import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../shared/context/UserContext';
import { API_LIST } from '../../shared/constants/ApiCollectionList';
import { showSuccessToast, showErrorToast } from '../../shared/utils/toast';
import { ROUTE } from '../../shared/constants/Route';
import { apiClient } from '../../shared/utils/ApiClient';
import { User } from '../../entities/user/model/User';

export default function OAuthCallbackPage() {
    const navigate = useNavigate();
    const { setUser } = useUser();

    // 쿠키에서 값을 읽는 헬퍼 함수
    const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift() || null;
        }
        return null;
    }
    const handleOAuthCallback = useCallback(async (): Promise<void> => {
        try {
            const token = getCookie("accessTkn");
            
            if (!token) {
                showErrorToast("토큰을 찾을 수 없습니다");
                throw new Error('토큰을 찾을 수 없습니다');
            }

            const res = await apiClient.get<User>(API_LIST.USER.ME, true);
            console.log(res.data);
            if (!res.data) {
                showErrorToast("사용자 정보를 찾을 수 없습니다");
                throw new Error('사용자 정보를 찾을 수 없습니다');
            }
            setUser(res.data);
            localStorage.setItem("accessTkn", token);
            localStorage.setItem("user", JSON.stringify(res.data));
            showSuccessToast("로그인되었습니다");
            navigate(ROUTE.HOMEPAGE);
        } catch (error) {
            console.error("OAuth 콜백 처리 실패:", error);
            showErrorToast("로그인에 실패했습니다");
            navigate(ROUTE.LOGINPLZ);
        }
    }, [navigate, setUser]);

    useEffect(() => {
        handleOAuthCallback();
    }, [navigate, setUser, handleOAuthCallback]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-gray-400">로그인 처리 중...</p>
            </div>
        </div>
    );
}