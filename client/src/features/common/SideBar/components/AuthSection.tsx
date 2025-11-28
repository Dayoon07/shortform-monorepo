import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthButtons from "./ui/AuthButtons";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useUser } from "../../../../shared/context/UserContext";
import { logout } from "../../../user/api/userService";
import { showSuccessToast } from "../../../../shared/utils/toast";

export default function AuthSection() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = async (): Promise<void> => {
        const data = await logout();
        setUser(null);
        showSuccessToast(data);
        navigate("/");
    };

    return (
        <>
            <AuthButtons 
                user={user}
                onLogout={handleLogout}
                onShowLogin={() => setShowLoginModal(true)}
                onShowSignup={() => setShowSignupModal(true)}
            />

            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
            {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} />}
        </>
    );
}