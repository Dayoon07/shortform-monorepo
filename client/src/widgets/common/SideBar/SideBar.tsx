import { JSX, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../../features/common/SideBar/components/SearchBar";
import Navigation from "../../../features/common/SideBar/components/Navigation";
import AuthButtons from "../../../features/common/SideBar/components/AuthButtons";
import LoginModal from "../../../features/common/SideBar/components/LoginModal";
import SignupModal from "../../../features/common/SideBar/components/SignupModal";
import { ROUTE } from "../../../shared/constants/Route";
import { logout } from "../../../features/user/api/userService";
import { useUser } from "../../../shared/context/UserContext";
import { useSearch } from "../../../shared/hooks/useSearch";
import { showSuccessToast } from "../../../shared/utils/toast";

export default function SideBar(): JSX.Element {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
    const [searchWord] = useSearch();
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleSearch = (query: string): void => {
        if (query.trim()) {
            navigate(ROUTE.DYNAMIC_SEARCH_ROUTE(encodeURIComponent(query)));
        }
    };

    const handleLogout = async (): Promise<void> => {
        const data = await logout();
        setUser(null); // <- 이거 없으면 로컬 스토리지 안 지워짐
        showSuccessToast(data);
        navigate("/");
    };

    return (
        <>
            <aside className="max-md:hidden w-64 bg-black/50 backdrop-blur-sm flex flex-col px-3 py-6 space-y-4">
                <h1 className="text-3xl font-bold bg-gradient-to-t from-pink-500 to-sky-500 bg-clip-text text-transparent pl-2">
                    <Link to={ROUTE.HOMEPAGE}>FlipFlop</Link>
                </h1>

                <SearchBar 
                    initialValue={searchWord} 
                    onSearch={handleSearch} 
                />

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