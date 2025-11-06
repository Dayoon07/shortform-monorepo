import { useEffect, useState } from "react";
import { getVideoAll } from "../../features/video/api/videoService";
import { VideoGrid } from "../../features/video/components/VideoGrid";
import { Loading } from "../../shared/components/Loading";
import { TryAgain } from "../../shared/components/TryAgain";

export default function VideoList() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getVideoAll();
                console.log(data);
                setVideos(data);
            } catch (err) {
                console.error('Failed to load videos:', err);
                setError('비디오를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <TryAgain />
    }

    return <VideoGrid videos={videos} />;
}