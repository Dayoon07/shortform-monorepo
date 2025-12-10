import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { useUser } from "../../shared/context/UserContext";
import LoginModal from "../../features/user/components/LoginModal";
import SignupModal from "../../features/user/components/SignupModal";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../shared/constants/Route";

export default function LoginPlz() {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
    const { user } = useUser();
    const navigate = useNavigate();

    // 이미 로그인된 경우 홈으로 리다이렉트
    useEffect(() => {
        if (user) navigate(ROUTE.HOMEPAGE);
    }, [user, navigate]);

    return (
        <div className="mx-auto">
            <div className="flex items-center justify-center mt-20">
                <div className="text-center px-4">
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <Lock className="w-8 h-8" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold mb-4">
                        로그인이 필요합니다
                    </h1>
                    
                    <p className="text-md mb-8">
                        서비스를 이용하려면 먼저 로그인해주세요
                    </p>

                    <div className="flex justify-center items-center gap-3">
                        <div className="relative p-0.5 rounded-full group"> 
                            <div className="absolute inset-0 bg-gradient-to-t from-pink-500 to-sky-500 rounded-full"></div>
                            
                            <button onClick={() => setShowSignupModal(true)}
                                className="relative px-6 py-3 
                                    bg-white 
                                    text-gray-800
                                    rounded-full 
                                    transition-all duration-200 font-medium font-bold
                                    hover:shadow-md"
                            >
                                회원가입
                            </button>
                        </div>
                        
                        <div className="relative p-0.5 rounded-full group"> 
                            <div className="absolute inset-0 bg-gradient-to-t from-pink-500 to-sky-500 rounded-full"></div>
                            <button onClick={() => setShowLoginModal(true)}
                                className="relative px-6 py-3 
                                    bg-white 
                                    text-gray-800
                                    rounded-full 
                                    transition-all duration-200 font-medium font-bold
                                    hover:shadow-lg"
                            >
                                로그인
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showLoginModal && (
                <LoginModal onClose={() => setShowLoginModal(false)} />
            )}
            {showSignupModal && (
                <SignupModal onClose={() => setShowSignupModal(false)} />
            )}
        </div>
    );
}