import { useLocation, Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { ROUTE } from "../../../shared/constants/Route";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { useUser } from "../../../shared/context/UserContext";
import { useClickSound } from "../../../shared/hooks/useClickSound";
import { NAVITEM } from "../../../shared/constants/BottomNavBarLocationList";
import { clickSound } from "../../../shared/constants/Mp3List";

export default function BottomNavBar() {
    const { user } = useUser();
    const location = useLocation();
    const handlePlayClickSound = useClickSound(clickSound);

    // 현재 경로가 활성 상태인지 확인
    const isActive = (path: string): boolean => {
        if (path === ROUTE.HOMEPAGE) {
            return location.pathname === path;
        } else {
            return location.pathname.startsWith(path);
        }
    };

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-sm border-t border-gray-800 px-4 md:hidden z-[100]">
            <div className="flex justify-around items-center">
                {NAVITEM.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.to);

                    return (
                        <Link 
                            key={item.to} 
                            to={item.to} 
                            aria-label={item.label} 
                            aria-current={active ? 'page' : undefined} 
                            className={`nav-item relative p-3 flex flex-col items-center transition-colors
                                ${active ? 'text-white' : 'text-gray-400'}
                            `}
                            onClick={handlePlayClickSound}
                        >
                            <Icon />
                        </Link>
                    );
                })}

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
                                src={REST_API_SERVER + user.profileImgSrc} 
                                alt={user.username + "님의 프로필"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </Link>
                ) : (
                    <Link 
                        to={ROUTE.LOGINPLZ} 
                        aria-label="로그인" 
                        onClick={handlePlayClickSound}
                        className={`nav-item p-3 transition-colors ${isActive(ROUTE.LOGINPLZ) ? 'text-white' : 'text-gray-400'}`}
                    >
                        <LogIn className="w-6 h-6" />
                    </Link>
                )}
            </div>
        </nav>
    );
}