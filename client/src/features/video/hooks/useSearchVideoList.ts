import { useCallback, useEffect, useState } from "react";
import { searchVideoLogic } from "../../search/api/searchService";
import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";

export const useSearchVideoList = (searchValue: string) => {
    const [videos, setVideos] = useState<VideoGridContent[]>([]);

    const search = useCallback(async () => {
        const sl = await searchVideoLogic(searchValue);
        if (!sl.ok || sl.data === undefined) {
            setVideos([]);
            throw new Error("에러 발생: " + sl);
        }
        setVideos(sl.data);
    }, [searchValue]);

    useEffect(() => {
        search();
    }, [search]);

    return { videos };
}