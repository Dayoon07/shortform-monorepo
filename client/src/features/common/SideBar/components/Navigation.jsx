import { Link } from "react-router-dom";
import NavItem from "../../../../widgets/common/SideBar/NavItem";
import { ROUTE } from "../../../../shared/constants/Route";
import { REST_API_SERVER } from "../../../../shared/constants/ApiServer";
import { NAV_ITEMS } from "../../../../shared/constants/SideBarNavItem";

export default function Navigation({ user }) {
    return (
        <nav className="flex flex-col space-y-2 w-60">
            {NAV_ITEMS.map((item) => (
                <NavItem key={item.to} {...item} />
            ))}
            
            {user && (
                <Link className="nav-btn flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-xl transition-colors group"
                    to={ROUTE.PROFILE(user.mention)} 
                >
                    <img src={`${REST_API_SERVER}${user.profileImgSrc}`} alt="Profile" className="w-6 h-6 rounded-full" />
                    <span className="font-medium">프로필</span>
                </Link>
            )}
        </nav>
    );
}