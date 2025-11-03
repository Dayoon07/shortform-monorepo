import { useEffect, useState } from "react";
import { getVideoAll } from "../../features/video/api/videoService";
import { VideoGrid } from "../../features/video/components/VideoGrid";

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
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-gray-400">로딩 중...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    return <VideoGrid videos={videos} />;
}