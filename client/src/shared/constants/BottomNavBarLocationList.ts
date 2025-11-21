import { ROUTE } from "./Route";
import { 
    HomePageIcon, 
    ExplorePageIcon, 
    FancyUploadPageIcon, 
    FollowingPageIcon
} from "../../widgets/icon/icon";

export const NAVITEM = [
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