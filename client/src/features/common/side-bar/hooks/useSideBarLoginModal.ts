import { useState } from "react";
import { useUser } from "../../../../shared/context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoginRes } from "../../../../entities/user/ui/LoginRes";
import { login } from "../../../user/api/userService";
import { showErrorToast, showSuccessToast } from "../../../../shared/utils/toast";
import { ROUTE } from "../../../../shared/constants/Route";

export function useSideBarLoginModal(username: string, password: string, onClose: () => void) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }): Promise<void> => {
        e.preventDefault();
        if (!username || !password) {
            showErrorToast("아이디와 비밀번호를 모두 입력해주세요");
            return;
        }
        setIsLoading(true);
        try {
            const data: LoginRes | null = await login(username, password);
            
            if (data?.success === false || data == null) {
                showErrorToast(`로그인 실패: ${data?.message || "사용자명 또는 <br className='md:hidden'/> 비밀번호가 올바르지 않습니다"}`, 5000);
                navigate(ROUTE.HOMEPAGE);
            }
            if (data?.success === true) {
                setUser(data.user);
                showSuccessToast("로그인 되었습니다");
                navigate(ROUTE.HOMEPAGE); // 홈으로 이동 (새로고침 없이)
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

    return {
        isLoading,
        handleSubmit
    }
}