import { useNavigate } from "react-router-dom";

export default function ToGoPage({
    errorMessage = "예기치 못한 오류 또는 에러가 발생했습니다",
    toGoMessage = "홈으로 돌아가기",
    navigateRoute = "/"
}) {
    const navigate = useNavigate();
    return (
        <div className="flex-1 flex items-center justify-center bg-black">
            <div className="text-center px-4">
                <p className="text-xl mb-4 text-gray-400">{errorMessage}</p>
                <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-sky-500 rounded-lg hover:opacity-80"
                    onClick={() => navigate(navigateRoute)}
                >
                    {toGoMessage}
                </button>
            </div>
        </div>
    );
}