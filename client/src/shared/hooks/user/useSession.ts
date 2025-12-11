import { useNavigate } from "react-router-dom";
import { login, logout } from "../../../features/user/api/userService";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { ROUTE } from "../../constants/Route";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { LoginResponse } from "../../../entities/user/ui/LoginRes";

/**
 * 사용자 관리를 편하게 하기 위해 기존에 도메인마다 컴포넌트에 있던 중복된 
 * LoginModal, SignupModal을 합치고 logout, login hook으로 만들어서 
 * 전역에서 사용할 수 있게 만듬
 * 
 * 로그인은 shared에 있는 LoginModal에서만 진행하고 
 * 로그아웃은 logoutHook 하나만 가져가서 사용하면 됩니다
 */
export const useSession = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { accessTkn, setUser } = useUser();
    const navigate = useNavigate();

    const logoutHook = async (): Promise<void> => {
        const data = await logout(accessTkn);
        setUser(null); // <- 이거 없으면 로컬 스토리지 안 지워짐
        showSuccessToast(data.message);
        navigate(ROUTE.HOMEPAGE);
    };

    const loginHook = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password) {
            setError("아이디와 비밀번호를 모두 입력해주세요");
            return;
        }

        setIsLoading(true);

        try {
            const data: LoginResponse | null = await login(username, password);
            
            if (data && data.success) {
                setUser(data.user);
                showSuccessToast(data.message);
                navigate(ROUTE.HOMEPAGE);
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






