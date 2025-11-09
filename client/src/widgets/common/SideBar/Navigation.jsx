import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { 
    CommunityPageIcon,
    ExplorePageIcon,
    FollowingPageIcon,
    HomePageIcon,
    LikePageIcon,
    UploadPageIcon
} from "../../icon/icon";
import { ROUTE } from "../../../shared/constants/Route";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";

const NAV_ITEMS = [
    {
        to: ROUTE.HOMEPAGE,
        label: "홈",
        icon: HomePageIcon
    },
    {
        to: ROUTE.EXPLORE,
        label: "추천",
        icon: ExplorePageIcon
    },
    {
        to: ROUTE.LIKES,
        label: "좋아요",
        icon: LikePageIcon,
        stroke: true
    },
    {
        to: ROUTE.FOLLOWING,
        label: "팔로잉",
        icon: FollowingPageIcon,
        viewBox: "0 0 48 48"
    },
    {
        to: ROUTE.STUDIO_UPLOAD,
        label: "업로드",
        icon: UploadPageIcon,
        viewBox: "0 0 48 48"
    },
    {
        to: ROUTE.STUDIO_POST_WRITE,
        label: "커뮤니티",
        icon: CommunityPageIcon,
        stroke: true,
        strokeWidth: "2"
    }
];

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