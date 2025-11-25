import { ROUTE } from "./Route";
import { 
    CommunityPageIcon, 
    ExplorePageIcon, 
    FollowingPageIcon, 
    HomePageIcon, 
    LikePageIcon, 
    UploadPageIcon
} from "../../widgets/icon/icon";

export const NAV_ITEMS = [
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


