import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../shared/context/UserContext';
import { REST_API_SERVER } from '../../shared/constants/ApiServer';
import { showSuccessToast, showErrorToast } from '../../shared/utils/toast';
import { ROUTE } from '../../shared/constants/Route';
import { API_LIST } from '../../shared/constants/ApiList';

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

    useEffect(() => {
        const handleOAuthCallback = async (): Promise<void> => {
            try {
                const token = getCookie("accessTkn");
                
                if (!token) {
                    showErrorToast("토큰을 찾을 수 없습니다");
                    throw new Error('토큰을 찾을 수 없습니다');
                }

                const response = await fetch(`${REST_API_SERVER}${API_LIST.USER.ME}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (!response.ok) throw new Error("사용자 정보를 가져올 수 없습니다");

                const data = await response.json();
                setUser(data);
                localStorage.setItem("accessTkn", token);
                localStorage.setItem("user", JSON.stringify(data));
                
                showSuccessToast("로그인되었습니다");
                navigate(ROUTE.HOMEPAGE);
            } catch (error) {
                console.error("OAuth 콜백 처리 실패:", error);
                showErrorToast("로그인에 실패했습니다");
                navigate(ROUTE.LOGINPLZ);
            }
        };

        handleOAuthCallback();
    }, [navigate, setUser]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-gray-400">로그인 처리 중...</p>
            </div>
        </div>
    );
}