import { useEffect } from "react";
import { X } from "lucide-react";
import { useSession } from "../../hooks/user/useSession";
import { GoogleButton } from "../common/GoogleButton";
import { FloatingInput } from "./ui/FloatingInput";

export default function LoginModal({ onClose }: { onClose: () => void }) {
    const {
        error,
        isLoading,
        loginHook,
        username,
        password,
        setPassword,
        setUsername
    } = useSession();
        
    /** 백드롭 클릭으로 닫기 */
    const BackdropCloseClick = (e: { target: any; currentTarget: any; }): void => {
        if (e.target === e.currentTarget) onClose();
    };

    // ESC 키로 닫기
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent): void => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={BackdropCloseClick}
        >
            <div className="bg-gray-900 rounded-2xl max-w-md w-full mx-4 p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-center">로그인</h3>
                    <button className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-lg"
                        onClick={onClose} aria-label="닫기"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={loginHook} className="space-y-4">
                    <div>
                        {/* <label htmlFor="login-username" className="block text-sm font-medium text-gray-300 mb-2">
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
                        /> */}

                        <FloatingInput 
                            type="text"
                            id="login-username"
                            htmlFor="login-username"
                            value={username}
                            labelText="사용자 이름"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="사용자 이름을 입력하세요"
                            disabled={isLoading}
                            required={true}
                            autoFocus={true}
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

                    <button type="submit" 
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
                            "로그인"
                        )}
                    </button>
                    <GoogleButton />
                </form>

                <div className="mt-6 text-center">
                    <button onClick={onClose}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}