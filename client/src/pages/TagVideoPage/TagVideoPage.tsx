import { useParams } from "react-router-dom";
import TagVideoList from "../../widgets/video/TagVideoList";

export default function TagVideoPage() {
    const { videoTag } = useParams();
    return <TagVideoList hashtag={videoTag} />
}