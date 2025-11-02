import { useEffect, useState } from "react";
import { getVideoAll } from "../../features/video/api/videoService";
import { VideoGrid } from "../../features/video/components/VideoGrid";

export default function VideoList() {
    const [videos, setVideos] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getVideoAll();
            if (data) setVideos(data);
        };
        
        fetchData();
    }, []);

    return (
        <>
            <VideoGrid videos={videos} key={videos.map(e => e.id)} />
        </>
    );
}