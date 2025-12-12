import { useNavigate } from "react-router-dom";
import { Image } from "../../shared/components/common/custom/Image";
import { ROUTE } from "../../shared/constants/Route";

export default function NotFoundWhat() {
    const navigate = useNavigate();
    const toGoHome = () => navigate(ROUTE.HOMEPAGE);
    return (
        <>
            <Image 
                url="https://dayoon07.github.io/img/wow404error.png"
                alt="Not Found What is?"
                social={true}
                onClick={toGoHome}
                className="w-32 h-32 cursor-pointer object-cover"
            />

            <p className="text-gray-400">URL이 잘못되어 있거나 없는 페이지입니다.</p>

            <button onClick={toGoHome} 
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 
                rounded-lg transition-colors">
                다시 시도
            </button>
        </>
    );
}
