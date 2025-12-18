import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../shared/constants/Route";

export default function NotFoundProfile({ nfm = "프로필을 찾을 수 없습니다" }: { nfm?: string }) {
    const navigate = useNavigate();
    
    return (
        <div className="flex-1 flex items-center justify-center h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{nfm}</h2>
                <button onClick={() => navigate(ROUTE.HOMEPAGE)}
                    className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 duration-300"
                >
                    홈으로 돌아가기
                </button>
            </div>
        </div>
    );
}