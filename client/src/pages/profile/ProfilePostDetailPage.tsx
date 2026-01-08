import { useParams } from "react-router-dom";
import { Post } from "../../widgets/post/Post";

export default function ProfilePostDetailPage() {
    const { communityUuid } = useParams();
    console.log("communityUuid: " + communityUuid);

    return (
        <Post cuuid={communityUuid} />
    );
}