import { useParams } from "react-router-dom";
import { Post } from "../../widgets/post/Post";

export default function ProfilePostDetailPage() {
    const { communityUuid } = useParams();
    return <Post cuuid={communityUuid} />
}