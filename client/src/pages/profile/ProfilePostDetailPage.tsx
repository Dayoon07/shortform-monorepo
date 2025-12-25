import { useLocation, useParams } from "react-router-dom";
import { Post } from "../../widgets/post/Post";

export default function ProfilePostDetailPage() {
    const { mention } = useParams();
    const p = new URLSearchParams(useLocation().search).get("p") ?? "";
    console.log("mention:", mention);
    console.log("p (communityUuid):", p);

    return <Post cuuid={p} />;
}