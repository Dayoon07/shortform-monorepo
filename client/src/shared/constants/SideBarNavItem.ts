import { ROUTE } from "./Route";
import { IconProps } from "../components/icon/IconProps";
import { 
    CommunityPageIcon, 
    ExplorePageIcon, 
    FollowingPageIcon, 
    HomePageIcon, 
    LikePageIcon, 
    UploadPageIcon
} from "../utils/icon/icon";

export interface NavItem {
    to: string;
    label: string;
    icon: React.ComponentType<IconProps>;
    // SVG 관련 선택적 속성
    stroke?: boolean;
    strokeWidth?: string;
    viewBox?: string;
}

export const NAV_ITEMS: NavItem[] = [
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


