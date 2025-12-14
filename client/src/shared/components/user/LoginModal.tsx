import { useCallback, useEffect } from "react";
import { useSession } from "../../hooks/user/useSession";
import { FloatingInput } from "./ui/FloatingInput";
import Modal from "../common/Modal";
import { GoogleIcon } from "../../utils/icon/icon";
import { API_LIST, REST_API_SERVER } from "../../constants/ApiCollectionList";

export default function LoginModal({ onClose }: { onClose: () => void }) {
    const url = `${REST_API_SERVER}${API_LIST.USER.GOOGLE_LOGIN}`;
    const {
        error,
        isLoading,
        loginHook,
        username,
        password,
        setPassword,
        setUsername
    } = useSession();

    const handleLogin = useCallback((e: { preventDefault: () => void }) => {
        loginHook(e, onClose);
    }, [loginHook, onClose]);

    const modalEsc = useCallback((e: KeyboardEvent): void => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", modalEsc);
        return () => document.removeEventListener("keydown", modalEsc);
    }, [modalEsc]);

    return (
        <Modal onClose={onClose} title="로그인">
            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <FloatingInput 
                    type="text" 
                    id="login-username" 
                    htmlFor="login-username"
                    value={username} 
                    labelText="사용자 이름을 입력하세요" 
                    onChange={(e) => setUsername(e.target.value)} 
                    disabled={isLoading} 
                    required={true} 
                    autoFocus={true}
                />
                <FloatingInput 
                    type="password" 
                    id="login-password" 
                    htmlFor="login-password"
                    value={password} 
                    labelText="비밀번호를 입력하세요" 
                    onChange={(e) => setPassword(e.target.value)} 
                    disabled={isLoading} 
                    required={true}
                />

                <button type="submit" disabled={isLoading} 
                    className="w-full py-3 rounded-xl font-bold bg-gray-200 
                    hover:bg-gray-300 transition-all disabled:opacity-50 
                    disabled:cursor-not-allowed max-md:text-sm"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span className="max-md:text-sm">로그인 중...</span>
                        </div>
                    ) : (
                        "로그인"
                    )}
                </button>
                <hr />
                <div 
                    id="google-login-btn" 
                    onClick={() => {window.location.href = url}}
                    className="w-full flex justify-center items-center 
                        text-center py-3 bg-gray-200 hover:bg-gray-300 
                        font-semibold cursor-pointer rounded-xl transition-all 
                        disabled:opacity-50 disabled:cursor-not-allowed max-md:text-sm"
                >
                    <GoogleIcon />
                    Google 계정으로 로그인
                </div>
            </form>
        </Modal>
    );
}