import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";
import { CommonVideoGrid } from "../../../shared/components/video/CommonVideoGrid";
import { useTagVideo } from "../hooks/useTagVideo";

export function TagVideo({ hashtag }: { hashtag?: string }) {
    const tagVideoList: VideoGridContent[] = useTagVideo(hashtag);
    return <CommonVideoGrid 
                videos={tagVideoList} 
                message="해당 해시태그를 포함하는 영상이 없습니다" 
            />
}