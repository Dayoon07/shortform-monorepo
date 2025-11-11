import { useLazyHoverVideo } from "../../features/video/hooks/useLazyHoverVideo";
import { VideoCard } from "../../features/video/components/VideoCard";

export function CommonVideoGrid({ videos, message = "영상이 없습니다" }) {
    const videoRefs = useLazyHoverVideo(videos);
    const commonVideoGridClassName = `
        md:max-w-6xl md:mx-auto grid md:min-[480px] grid-cols-2 
        sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
        2xl:grid-cols-6 gap-2 max-md:pb-[200px] p-2
    `;
    if (!videos || videos.length === 0) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-gray-400 text-lg">{message}</p>
            </div>
        );
    }

    return (
        <div className={commonVideoGridClassName}>
            {videos.map((video, index) => {
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