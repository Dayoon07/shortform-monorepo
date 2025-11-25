import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../shared/constants/Route";

export default function NotFoundProfile() {
    const navigate = useNavigate();
    
    return (
        <div className="flex-1 flex items-center justify-center h-screen bg-black text-white">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">프로필을 찾을 수 없습니다</h2>
                <button onClick={() => navigate(ROUTE.HOMEPAGE)}
                    className="px-6 py-2 bg-gradient-to-r from-pink-500 to-sky-500 rounded-lg hover:opacity-80"
                >
                    홈으로 돌아가기
                </button>
            </div>
        </div>
    );
}