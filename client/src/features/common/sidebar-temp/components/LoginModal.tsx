import { useState } from "react";
import Modal from "../../../../shared/components/common/Modal";
import { login } from "../../../user/api/userService";
import { useUser } from "../../../../shared/context/UserContext";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../../shared/utils/toast";
import { LoginResponse } from "../../../../entities/user/ui/LoginResponse";

export default function LoginModal({ onClose }: { onClose: () => void }) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }): Promise<void> => {
        e.preventDefault();
        if (!username || !password) {
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }
        setIsLoading(true);
        try {
            const data: LoginResponse | null = await login(username, password);
            
            if (data !== null) {
                if (data.success === false) {
                    showErrorToast(`로그인 실패: ${data.message || "사용자명 또는 <br className='md:hidden'/> 비밀번호가 올바르지 않습니다"}`, 5000);
                } else {
                    setUser(data.user); // Context 업데이트
                    showSuccessToast("로그인 되었습니다");
                    navigate('/'); // 홈으로 이동 (새로고침 없이)
                }
            }
        } catch (error) {
            console.error("로그인 요청 오류: ", error);
            showErrorToast(`
                로그인 중 오류가 발생했습니다
                <br className='md:hidden'/>
                <br className='md:hidden'/>
                로그인 실패: 사용자명 또는
                <br className='md:hidden'/>
                비밀번호가 올바르지 않습니다    
            `);
            throw error;
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    return (
        <Modal onClose={onClose} title="로그인">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="사용자 이름"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-gray-400 focus:outline-none"
                    disabled={isLoading}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-gray-400 focus:outline-none"
                    disabled={isLoading}
                    required
                />
                <button 
                    type="submit" 
                    className="w-full py-3 rounded-xl font-bold bg-gray-700 hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? '로그인 중...' : '로그인'}
                </button>
            </form>
        </Modal>
    );
}