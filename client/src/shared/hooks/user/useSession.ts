import { useNavigate } from "react-router-dom";
import { login, logout } from "../../../features/user/api/userService";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { ROUTE } from "../../constants/Route";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { LoginRes } from "../../../entities/user/ui/LoginRes";

export const useSession = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { setUser } = useUser();
    const navigate = useNavigate();

    const logoutHook = async (): Promise<void> => {
        const data = await logout();
        setUser(null);
        showSuccessToast(data.message);
        navigate(ROUTE.HOMEPAGE);
    };

    const loginHook = async (e: { preventDefault: () => void; }, onSuccess?: () => void) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password) {
            setError("아이디와 비밀번호를 모두 입력해주세요");
            return;
        }

        setIsLoading(true);

        try {
            const data: LoginRes | null = await login(username, password);
            
            if (data && data.success) {
                setUser(data.user);
                showSuccessToast(data.message);
                
                if (onSuccess) {
                    onSuccess(); // 모달 닫기 콜백 실행
                }
                
                setTimeout(() => {
                    navigate(ROUTE.HOMEPAGE);
                }, 100);
            } else {
                setError(data?.message || "로그인에 실패했습니다");
                showErrorToast(data?.message || "로그인에 실패했습니다");
            }
        } catch (error) {
            console.error("로그인 오류: ", error);
            showErrorToast(error as Error);
            setError("로그인 중 오류가 발생했습니다");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        loginHook,
        logoutHook,
        isLoading,
        error,
        username,
        password,
        setUsername,
        setPassword
    };
}