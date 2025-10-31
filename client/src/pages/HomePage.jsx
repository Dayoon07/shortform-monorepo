import { useEffect, useState } from "react";
import { getVideoAll } from "../services/VideoService";

export default function HomePage() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getVideoAll();
            if (data) setVideos(data);
        };
        
        fetchData();
    }, []);

    return (
        <div>
            {videos.map(video => (
                <div key={video.id} className="w-[100px] h-[100px] shadow-md text-black">
                    {video.videoTitle}
                </div>
            ))}
        </div>
    );
}