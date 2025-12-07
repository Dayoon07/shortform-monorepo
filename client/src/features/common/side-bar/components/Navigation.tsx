import { Link } from "react-router-dom";
import { ROUTE } from "../../../../shared/constants/Route";
import { REST_API_SERVER } from "../../../../shared/constants/ApiServer";
import { NAV_ITEMS } from "../../../../shared/constants/SideBarNavItem";
import { User } from "../../../../entities/user/model/User";

export default function Navigation({ user }: { user?: User | null }) {
    return (
        <nav className="flex flex-col space-y-2 w-58">
            {NAV_ITEMS.map((item) => (
                <Link to={item.to} key={item.to}
                    className="nav-btn flex items-center space-x-4 p-2 
                        hover:bg-gray-300/50 rounded-lg transition-colors group"
                >
                    <item.icon />
                    <span className="font-medium">{item.label}</span>
                </Link>
            ))}
            
            {user && (
                <Link to={ROUTE.PROFILE(user.mention)} 
                    className="nav-btn flex items-center space-x-3 p-3 
                        hover:bg-gray-300/50 rounded-lg 
                        transition-colors group"
                >
                    <img 
                        src={user.social ? `${user.profileImgSrc}` : `${REST_API_SERVER}${user.profileImgSrc}`} 
                        alt={`${user.username}님 프로필`} 
                        className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium">프로필</span>
                </Link>
            )}
        </nav>
    );
}