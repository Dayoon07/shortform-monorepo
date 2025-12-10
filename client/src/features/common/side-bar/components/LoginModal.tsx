import Modal from "../../../../shared/components/common/Modal";
import { useState } from "react";
import { useSideBarLoginModal } from "../hooks/useSideBarLoginModal";
import { GoogleIcon } from "../../../../widgets/icon/icon";
import { REST_API_SERVER } from "../../../../shared/constants/ApiServer";
import { API_LIST } from "../../../../shared/constants/ApiList";

export default function LoginModal({ onClose }: { onClose: () => void }) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const inputClassName = `
        w-full p-3 bg-gray-200 border border-gray-300 
        rounded-xl focus:border-gray-400 focus:outline-none
    `;

    const { 
        isLoading,
        handleSubmit
    } = useSideBarLoginModal(username, password, onClose);

    return (
        <Modal onClose={onClose} title="로그인">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="사용자 이름"
                    className={inputClassName}
                    disabled={isLoading}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    className={inputClassName}
                    disabled={isLoading}
                    required
                />
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl font-bold bg-gray-200 hover:bg-gray-300 
                    transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? '로그인 중...' : '로그인'}
                </button>
                <hr />
                <div 
                    className="w-full flex justify-center items-center text-center py-3 bg-gray-200 
                        hover:bg-gray-300 font-semibold cursor-pointer rounded-xl transition-all 
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                        window.location.href = `${REST_API_SERVER}${API_LIST.USER.GOOGLE_LOGIN}`;
                    }}
                >
                    <GoogleIcon />
                    Google 계정으로 로그인
                </div>
            </form>
        </Modal>
    );
}