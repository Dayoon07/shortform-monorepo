import { useNavigate } from "react-router-dom";
import { login, logout } from "../../features/user/api/userService";
import { useUser } from "../context/UserContext";
import { showSuccessToast } from "../utils/toast";
import { ROUTE } from "../constants/Route";
import { useState } from "react";

export const useLogout = () => {
    const navigate = useNavigate();
    const { accessTkn, setUser } = useUser();

    const handleLogout = async (): Promise<void> => {
        const data = await logout(accessTkn);
        setUser(null); // <- 이거 없으면 로컬 스토리지 안 지워짐
        showSuccessToast(data.message);
        navigate(ROUTE.HOMEPAGE);
    };

    return { handleLogout };
}

const useLogin = (username: string, password: string) => {
    const [loadingState, setLoadingState] = useState<boolean>(false);
    setLoadingState(true);
    try {
        const data = await login(username, password);
    } catch (error) {
        console.error(error);
    }
}