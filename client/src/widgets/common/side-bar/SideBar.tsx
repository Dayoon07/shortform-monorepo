import { Link } from "react-router-dom";
import SearchBar from "../../../features/common/side-bar/components/SearchBar";
import Navigation from "../../../features/common/side-bar/components/Navigation";
import { ROUTE } from "../../../shared/constants/Route";
import { useSearch } from "../../../shared/hooks/useSearch";
import LoginModal from "../../../features/common/side-bar/components/LoginModal";
import SignupModal from "../../../features/common/side-bar/components/SignupModal";
import { useState } from "react";
import AuthButtons from "../../../features/common/side-bar/components/ui/AuthButtons";
import { useUser } from "../../../shared/context/UserContext";
import { useLogout } from "../../../shared/hooks/useLogout";

export default function SideBar() {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
    const [searchWord] = useSearch();
    const { user } = useUser();
    const { handleLogout } = useLogout();

    return (
        <>
            <aside className="max-md:hidden w-64 bg-black/50 backdrop-blur-sm flex flex-col px-3 py-6 space-y-4">
                <h1 className="text-3xl font-bold bg-gradient-to-t from-pink-500 to-sky-500 bg-clip-text text-transparent pl-2">
                    <Link to={ROUTE.HOMEPAGE}>FlipFlop</Link>
                </h1>

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
        </>
    );
}