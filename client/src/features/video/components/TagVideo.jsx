import { CommonVideoGrid } from "../../../shared/components/CommonVideoGrid";
import { useTagVideo } from "../hooks/useTagVideo";

export function TagVideo({ hashtag }) {
    const { tagVideoList } = useTagVideo(hashtag);
    return <CommonVideoGrid videos={tagVideoList} message="해당 해시태그를 포함하는 영상이 없습니다" />
}