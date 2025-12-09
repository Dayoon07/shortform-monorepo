import SearchBar from "../../../features/common/side-bar/components/SearchBar";
import Navigation from "../../../features/common/side-bar/components/Navigation";
import { useSearch } from "../../../shared/hooks/useSearch";
import LoginModal from "../../../features/common/side-bar/components/LoginModal";
import SignupModal from "../../../features/common/side-bar/components/SignupModal";
import { useState } from "react";
import AuthButtons from "../../../features/common/side-bar/components/ui/AuthButtons";
import { useUser } from "../../../shared/context/UserContext";
import { useLogout } from "../../../shared/hooks/useLogout";
import { Logo } from "../../../shared/components/common/Logo";

export default function SideBar() {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
    const [searchWord] = useSearch();
    const { user } = useUser();
    const { handleLogout } = useLogout();

    return (
        <div>
            <aside className="max-md:hidden w-64 border-r flex flex-col px-4 space-y-4 fixed h-full left-0 top-0">
                <Logo className="pt-4 pb-2" />

                <SearchBar initialValue={searchWord} />
                <Navigation user={user} />
                
                <AuthButtons 
                    user={user}
                    onLogout={handleLogout}
                    onShowLogin={() => setShowLoginModal(true)}
                    onShowSignup={() => setShowSignupModal(true)}
                />
            </aside>
            
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
            {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} />}
        </div>
    );
}