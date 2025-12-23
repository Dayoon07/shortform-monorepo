import { useLocation } from "react-router-dom"
import { Post } from "../../widgets/post/Post";

export default function ProfilePostDetailPage() {
    const w = new URLSearchParams(useLocation().pathname).get("communityUuid") ?? "";
    console.log("communityUuid: " + w);
    return <Post cuuid={w} />
}