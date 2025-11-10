import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { login } from "../../user/api/userService";
import { useUser } from "../../../shared/context/UserContext";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../../shared/utils/toast";

export default function LoginModal({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { setUser } = useUser();
    const navigate = useNavigate();

    // ESC 키로 닫기
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // 백드롭 클릭으로 닫기
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password) {
            setError('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        setIsLoading(true);

        try {
            const data = await login(username, password);
            
            if (data && data.success) {
                setUser(data.user);
                onClose();
                showSuccessToast(data.message);
                navigate("/");
            } else {
                setError(data?.message || '로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            setError('로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div 
                className="bg-gray-900 rounded-2xl max-w-md w-full mx-4 p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">로그인</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-lg"
                        aria-label="닫기"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* 에러 메시지 */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {/* 폼 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="login-username" className="block text-sm font-medium text-gray-300 mb-2">
                            사용자 이름
                        </label>
                        <input
                            id="login-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="사용자 이름을 입력하세요"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl 
                                     text-white placeholder-gray-500
                                     focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20
                                     transition-all"
                            disabled={isLoading}
                            required
                            autoFocus
                        />
                    </div>

                    <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-2">
                            비밀번호
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl 
                                     text-white placeholder-gray-500
                                     focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20
                                     transition-all"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* 로그인 버튼 */}
                    <button 
                        type="submit" 
                        className="w-full py-3 rounded-xl font-bold 
                                 bg-gradient-to-r from-pink-500 to-sky-500 
                                 hover:from-pink-600 hover:to-sky-600
                                 disabled:from-gray-600 disabled:to-gray-700
                                 disabled:cursor-not-allowed
                                 text-white transition-all duration-200
                                 shadow-lg hover:shadow-xl
                                 transform hover:scale-[1.02] active:scale-[0.98]"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>로그인 중...</span>
                            </div>
                        ) : (
                            '로그인'
                        )}
                    </button>
                </form>

                {/* 추가 옵션 */}
                <div className="mt-6 text-center">
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}