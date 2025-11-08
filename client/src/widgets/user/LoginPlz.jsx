import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { useUser } from "../../shared/context/UserContext";
import LoginModal from "../../features/user/components/LoginModal";
import SignupModal from "../../features/user/components/SignupModal";
import { useNavigate } from "react-router-dom";

export default function LoginPlz() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();

    // 이미 로그인된 경우 홈으로 리다이렉트
    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    return (
        <div className="mx-auto">
            <div className="flex items-center justify-center mt-20">
                <div className="text-center px-4">
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                            <Lock className="w-8 h-8 text-gray-400" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-semibold text-white mb-4">
                        로그인이 필요합니다
                    </h1>
                    
                    <p className="text-gray-400 text-lg mb-8">
                        서비스를 이용하려면 먼저 로그인해주세요
                    </p>

                    <div className="flex justify-center items-center gap-3">
                        <button
                            onClick={() => setShowSignupModal(true)}
                            className="px-6 py-3 border-2 border-gray-600 text-gray-300 bg-gray-900/50 
                                rounded-full hover:border-gray-500 hover:bg-gray-800 
                                transition-all duration-200 font-medium"
                        >
                            회원가입
                        </button>
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-sky-500 
                                hover:from-pink-600 hover:to-sky-600 text-white rounded-full 
                                transition-all duration-200 font-medium shadow-lg"
                        >
                            로그인
                        </button>
                    </div>

                    <div className="mt-12 text-sm text-gray-500">
                        <p>계정이 없으신가요? 지금 바로 가입하세요!</p>
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