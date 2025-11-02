import { ROUTE } from "../../../shared/constants/Route";
import { HomePageIcon, ExplorePageIcon, UploadPageIcon, FollowingPageIcon } from "../../icon/icon";
import { LogInIcon } from "lucide-react";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { Link } from "react-router-dom";
import { useUser } from "../../../features/user/hooks/useUsers";

export default function BottomNavBar() {
    const { user } = useUser();

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-sm border-t border-gray-800 px-4 md:hidden z-[100]">
            <div className="flex justify-around items-center">
                <Link to={ROUTE.HOMEPAGE} className="nav-item p-3 text-white">
                    <HomePageIcon />
                </Link>
                <Link to={ROUTE.EXPLORE} className="nav-item p-3 text-gray-400">
                    <ExplorePageIcon />
                </Link>
                <Link to={ROUTE.STUDIO_UPLOAD} className="nav-item p-3 text-gray-400">
                    <UploadPageIcon />
                </Link>
                <Link to={ROUTE.FOLLOWING} className="nav-item p-3 text-gray-400">
                    <FollowingPageIcon />
                </Link>
                {user ? (
                    <Link to={ROUTE.PROFILE(user.mention)} className="nav-item p-3 text-gray-400">
                        <img src={`${REST_API_SERVER}/${user.profileImgSrc}`} alt="..." style={{ width: 24, height: 24, borderRadius: "100%" }} />
                        <span className="font-medium">프로필</span>
                    </Link>
                ) : (
                    <Link to={ROUTE.LOGINPLZ} className="nav-item p-3 text-gray-400">
                        <LogInIcon />
                    </Link>
                )}
            </div>
        </nav>
    );
}