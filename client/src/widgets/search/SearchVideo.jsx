import { useEffect, useState } from "react";
import { searchVideoLogic } from "../../features/search/api/SearchService";
import { CommonVideoGrid } from "../../shared/components/CommonVideoGrid";
import { useUser } from "../../shared/context/UserContext";

export default function SearchVideo({ searchValue }) {
    const [videos, setVideos] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const search = async () => {
            const mention = user.mention ? user.mention : null;
            const a = await searchVideoLogic(searchValue, mention);
            setVideos(a);
        };
        search();
    }, [searchValue, user]);

    return <CommonVideoGrid videos={videos} />
}