import { useLazyHoverVideo } from "../hooks/useLazyHoverVideo";
import { VideoCard } from "./VideoCard";

export function VideoGrid({ videos, maxVideos = 100 }) {
    const videoRefs = useLazyHoverVideo(videos);

    if (!videos || videos.length === 0) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-gray-400 text-lg">비디오가 없습니다</p>
            </div>
        );
    }

    return (
        <div className="md:max-w-5xl md:mx-auto grid md:min-[480px] grid-cols-2 
            sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 
            max-md:pb-[200px] p-2"
        >
            {videos.slice(0, maxVideos).map((video, index) => {
                return (
                    <VideoCard 
                        key={video.videoLoc || video.id || `video-${index}`}
                        video={video} 
                        index={index} 
                        videoRefs={videoRefs}
                    />
                );
            })}
        </div>
    );
}