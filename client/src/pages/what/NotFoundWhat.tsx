import { useNavigate } from "react-router-dom";

export default function NotFoundWhat() {
    const navigate = useNavigate();
    return (
        <div className="mx-auto">
            <div className="flex items-center justify-center mt-20">
                <div className="text-center px-4">
                    <img 
                        src="https://dayoon07.github.io/img/wow404error.png"
                        alt="Not Found What is?"
                        onClick={() => navigate(-1)}
                        className="w-[300px] h-[300px] cursor-pointer object-cover"
                    />
                    <>
                        <p className="text-gray-400">URL이 잘못되어 있거나 없는 페이지입니다.</p> <br />
                        <button 
                            onClick={() => navigate(-1)} 
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg duration-300 transition-colors">
                                뒤로 돌아가기
                        </button>
                    </>
                </div>
            </div>
        </div>
    );
}
