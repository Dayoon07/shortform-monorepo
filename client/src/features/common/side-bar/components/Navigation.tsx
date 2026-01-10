import { Link, useLocation } from "react-router-dom";
import { ROUTE } from "../../../../shared/constants/Route";
import { NAV_ITEMS } from "../../../../shared/constants/SideBarNavItem";
import { User } from "../../../../entities/user/model/User";
import { Image } from "../../../../shared/components/common/custom/Image";

export default function Navigation({ user }: { user?: User | null }) {
    const loc = useLocation();
    const activate = (p: string): boolean => 
        p === ROUTE.HOMEPAGE ? loc.pathname === p : loc.pathname.startsWith(p);
    return (
        <nav className="flex flex-col space-y-2 w-58">
            {NAV_ITEMS.map((item) => (
                <Link to={item.to} key={item.to} className={`${
                    activate(item.to) ? "bg-black text-white" 
                    : "text-black bg-white hover:bg-gray-300/50"
                    } nav-btn flex items-center space-x-4 p-2 rounded-lg transition-colors group`}
                >
                    <item.icon />
                    <span className="font-medium">{item.label}</span>
                </Link>
            ))}
            
            {user && (
                <Link to={ROUTE.PROFILE(user.mention)} 
                    className={`${
                        activate(ROUTE.PROFILE(user.mention)) 
                            ? 'bg-black text-white' 
                            : 'text-black bg-whtie hover:bg-gray-300/50'
                        } nav-btn flex items-center space-x-4 p-2 
                        rounded-lg transition-colors group`
                    }
                >
                    <Image
                        url={user.profileImgSrc}
                        alt={user.username + "님의 프로필"}
                        social={user.social}
                        provider={user.provider}
                        className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium">프로필</span>
                </Link>
            )}
        </nav>
    );
}