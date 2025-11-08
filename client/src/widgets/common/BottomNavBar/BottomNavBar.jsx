import { useLocation, Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { ROUTE } from "../../../shared/constants/Route";
import { HomePageIcon, ExplorePageIcon, FollowingPageIcon, FancyUploadPageIcon } from "../../icon/icon";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { useUser } from "../../../shared/context/UserContext";
import { useClickSound } from "../../../shared/hooks/useClickSound";

export default function BottomNavBar() {
    const { user } = useUser();
    const location = useLocation();
    const handlePlayClickSound = useClickSound("/mp3/click.mp3");

    // 현재 경로가 활성 상태인지 확인
    const isActive = (path) => {
        if (path === ROUTE.HOMEPAGE) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    const navItems = [
        {
            to: ROUTE.HOMEPAGE,
            icon: HomePageIcon,
            label: "홈",
            show: true
        },
        {
            to: ROUTE.EXPLORE,
            icon: ExplorePageIcon,
            label: "추천",
            show: true
        },
        {
            to: ROUTE.STUDIO_UPLOAD,
            icon: FancyUploadPageIcon,
            label: "업로드",
            show: true
        },
        {
            to: ROUTE.FOLLOWING,
            icon: FollowingPageIcon,
            label: "팔로잉",
            show: true
        }
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-sm border-t border-gray-800 px-4 md:hidden z-[100]">
            <div className="flex justify-around items-center">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.to);

                    return (
                        <Link 
                            key={item.to}
                            to={item.to}
                            className={`nav-item relative p-3 flex flex-col items-center transition-colors
                                ${active ? 'text-white' : 'text-gray-400'}
                            `}
                            aria-label={item.label}
                            aria-current={active ? 'page' : undefined}
                            onClick={handlePlayClickSound}
                        >
                            <Icon />
                        </Link>
                    );
                })}

                {/* 프로필 또는 로그인 버튼 */}
                {user ? (
                    <Link 
                        to={ROUTE.PROFILE(user.mention)} 
                        aria-label="프로필" 
                        className={`nav-item p-3 flex flex-col items-center gap-1 transition-colors ${
                            isActive(ROUTE.PROFILE(user.mention)) ? 'text-white' : 'text-gray-400'
                        }`}
                        onClick={handlePlayClickSound}
                        aria-current={isActive(ROUTE.PROFILE(user.mention)) ? 'page' : undefined}
                    >
                        <div className={`w-6 h-6 rounded-full overflow-hidden ${isActive(ROUTE.PROFILE(user.mention)) ? 'ring-2 ring-white' : ''}`}>
                            <img 
                                src={`${REST_API_SERVER}${user.profileImgSrc}`} 
                                alt={`${user.username}의 프로필`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="%23999" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/%3E%3C/svg%3E';
                                }}
                            />
                        </div>
                    </Link>
                ) : (
                    <Link 
                        to={ROUTE.LOGINPLZ} 
                        className={`nav-item p-3 transition-colors ${
                            isActive(ROUTE.LOGINPLZ) ? 'text-white' : 'text-gray-400'
                        }`}
                        aria-label="로그인"
                        onClick={handlePlayClickSound}
                    >
                        <LogIn className="w-6 h-6" />
                    </Link>
                )}
            </div>
        </nav>
    );
}