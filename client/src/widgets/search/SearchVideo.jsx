import { useEffect, useState } from "react";
import { searchVideoLogic } from "../../features/search/api/SearchService";
import { CommonVideoGrid } from "../../shared/components/CommonVideoGrid";

export default function SearchVideo({ searchValue }) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const search = async () => {
            const a = await searchVideoLogic(searchValue);
            setVideos(a);
        };
        search();
    }, [searchValue]);

    return (
        <CommonVideoGrid videos={videos} />
    ) 
}