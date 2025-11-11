import { useEffect, useState } from "react";
import { searchVideoLogic } from "../../search/api/SearchService";

export const useSearchVideoList = (user, searchValue) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const search = async () => {
            const mention = user.mention ? user.mention : null;
            const a = await searchVideoLogic(searchValue, mention);
            setVideos(a);
        };
        search();
    }, [searchValue, user]);

    return { videos };
}