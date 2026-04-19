import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constants/Route";
import React from "react";

interface ToGoPageProps {
    errorMessage?: string,
    toGoMessage?: string,
    navigateRoute?: string
}

const ToGoPage: React.FC<ToGoPageProps> = ({
    errorMessage    = "예기치 못한 오류 또는 에러가 발생했습니다",
    toGoMessage     = "홈으로 돌아가기",
    navigateRoute   = ROUTE.HOMEPAGE
}) => {
    const navigate = useNavigate();
    return (
        <div className="flex-1 flex items-center justify-center md:mt-32 max-md:mt-10">
            <div className="text-center px-4">
                <p className="text-xl mb-4 text-gray-400">{errorMessage}</p>
                <button className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 duration-300"
                    onClick={() => navigate(navigateRoute)}
                >
                    {toGoMessage}
                </button>
            </div>
        </div>
    );
}

export default ToGoPage;