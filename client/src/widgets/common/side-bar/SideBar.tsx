import { useState } from "react";
import { Logo } from "../../../shared/components/common/Logo";
import { useUser } from "../../../shared/context/UserContext";
import { useSession } from "../../../shared/hooks/user/useSession";
import { useSearch } from "../../../shared/hooks/useSearch";
import SearchBar from "../../../features/common/side-bar/components/SearchBar";
import Navigation from "../../../features/common/side-bar/components/Navigation";
import LoginModal from "../../../shared/components/user/LoginModal";
import AuthButtons from "../../../features/common/side-bar/components/ui/AuthButtons";
import SignupModal from "../../../shared/components/user/SignupModal";

export default function SideBar() {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
    const [searchWord] = useSearch();
    const { user } = useUser();
    const { logoutHook } = useSession();

    const side = `max-md:hidden w-64 flex flex-col px-4 
        space-y-4 fixed h-full left-0 top-0`;

    return (
        <div>
            <aside className={side}>
                <Logo className="pt-4 pb-2" />
                <SearchBar initialValue={searchWord} />
                <Navigation user={user} />
                <AuthButtons 
                    user={user}
                    onLogout={logoutHook}
                    onShowLogin={() => setShowLoginModal(true)}
                    onShowSignup={() => setShowSignupModal(true)}
                />
            </aside>
            
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
            {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} />}
        </div>
    );
}