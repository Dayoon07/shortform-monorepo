import { useEffect, useState } from "react";
import VideoGrid from "../components/video/VideoGrid";
import { getVideoAll } from "../services/videoService";

export default function HomePage() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getVideoAll();
            if (data) setVideos(data);
        };
        
        fetchData();
    }, []);

    return <VideoGrid videos={videos} key={videos.map(e => e.id)} />
}