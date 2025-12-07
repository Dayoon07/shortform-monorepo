import { useEffect, useState } from "react";
import { searchVideoLogic } from "../../search/api/searchService";
import { useUser } from "../../../shared/context/UserContext";
import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";

export const useSearchVideoList = (searchValue: string): { videos: VideoGridContent[] } => {
    const { accessTkn } = useUser();
    const [videos, setVideos] = useState<VideoGridContent[]>([]);

    useEffect(() => {
        const search = async (): Promise<void> => {
            const a: VideoGridContent[] = await searchVideoLogic(searchValue, accessTkn);
            setVideos(a);
        };
        search();
    }, [searchValue, accessTkn]);

    return { videos };
}