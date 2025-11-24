import { useEffect, useState } from "react";
import { searchVideoLogic } from "../../search/api/searchService";
import { useUser } from "../../../shared/context/UserContext";
import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";

export const useSearchVideoList = (searchValue: string): { videos: VideoGridContent[] } => {
    const { user } = useUser();
    const [videos, setVideos] = useState<VideoGridContent[]>([]);

    useEffect(() => {
        const search = async (): Promise<void> => {
            const mention = user?.mention ? user.mention : null;
            const a: VideoGridContent[] = await searchVideoLogic(searchValue, mention);
            setVideos(a);
        };
        search();
    }, [searchValue, user]);

    return { videos };
}