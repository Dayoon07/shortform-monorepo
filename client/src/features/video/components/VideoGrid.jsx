import { useLazyHoverVideo } from "../hooks/useLazyHoverVideo";
import { VideoCard } from "./VideoCard";

export function VideoGrid({ videos }) {
    const videoRefs = useLazyHoverVideo(videos);

    return (
        <div className="md:max-w-5xl md:mx-auto grid md:min-[480px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 max-md:pb-[200px] mt-2">
            {videos.slice(0, 100).map((v, i) => (
                <VideoCard key={v.videoLoc || i} video={v} index={i} videoRefs={videoRefs} />
            ))}
        </div>
    );
}
