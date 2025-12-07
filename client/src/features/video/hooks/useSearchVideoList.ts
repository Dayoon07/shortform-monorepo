import { useEffect, useState } from "react";
import { searchVideoLogic } from "../../search/api/searchService";
import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";

export const useSearchVideoList = (searchValue: string) => {
    const [videos, setVideos] = useState<VideoGridContent[]>([]);

    useEffect(() => {
        const search = async () => {
            const sl = await searchVideoLogic(searchValue);
            setVideos(sl);
        };
        search();
    }, [searchValue]);

    return { videos };
}