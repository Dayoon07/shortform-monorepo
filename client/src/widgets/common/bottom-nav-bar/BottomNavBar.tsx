import { useLocation, Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { ROUTE } from "../../../shared/constants/Route";
import { useUser } from "../../../shared/context/UserContext";
import { NAVITEM } from "../../../shared/constants/BottomNavBarLocationList";
import { Image } from "../../../shared/components/common/custom/Image";

export default function BottomNavBar() {
    const { user } = useUser();
    const loc = useLocation();
    const activate = (p: string): boolean => 
        p === ROUTE.HOMEPAGE ? loc.pathname === p : loc.pathname.startsWith(p);

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-gray-200/90 backdrop-blur-sm border-t border px-4 md:hidden z-[100]">
            <div className="flex justify-around items-center">
                {NAVITEM.map((item) => {
                    const Icon = item.icon;
                    const active = activate(item.to);

                    return (
                        <Link 
                            to={item.to} 
                            key={item.to} 
                            aria-label={item.label} 
                            aria-current={active ? 'page' : undefined} 
                            className={`nav-item relative p-3 flex flex-col items-center transition-colors
                                ${active ? 'text-black' : 'text-gray-400'}
                            `}
                        >
                            <Icon />
                        </Link>
                    );
                })}

                {user ? (
                    <Link
                        to={ROUTE.PROFILE(user.mention)} 
                        aria-label="프로필" 
                        aria-current={activate(ROUTE.PROFILE(user.mention)) ? 'page' : undefined}
                        className={`nav-item p-3 flex flex-col items-center gap-1 transition-colors ${
                            activate(ROUTE.PROFILE(user.mention)) ? 'text-black' : 'text-gray-400'
                        }`}
                    >
                        <div className={`w-6 h-6 rounded-full overflow-hidden ${
                            activate(ROUTE.PROFILE(user.mention)) ? 'ring-2 ring-black' : ''
                        }`}>
                            <Image
                                url={user.profileImgSrc}
                                alt={user.username + "님의 프로필"}
                                social={user.social}
                                provider={user.provider}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </Link>
                ) : (
                    <Link
                        to={ROUTE.LOGINPLZ}
                        aria-label="로그인"
                        className={`nav-item p-3 transition-colors ${
                            activate(ROUTE.LOGINPLZ) ? 'text-black' : 'text-gray-400'
                        }`}
                    >
                        <LogIn className="w-6 h-6" />
                    </Link>
                )}
            </div>
        </nav>
    );
}
