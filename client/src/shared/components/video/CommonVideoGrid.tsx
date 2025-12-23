import { useLazyHoverVideo } from "../../../features/video/hooks/useLazyHoverVideo";
import { VideoCard } from "../../../features/video/components/ui/VideoCard";
import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";
import { RefObject, useState } from "react";
import { useUser } from "../../context/UserContext";
import { DeleteModal } from "./ui/DeleteModal";
import { ReportModal } from "../report/ReportModal";
import { ReportTargetType } from "../../constants/enums/ReportTargetType";

interface CommonVideoGridProps {
    videos: VideoGridContent[],
    message?: string,
    cardUploaderPublic?: boolean
}

export function CommonVideoGrid({ 
    videos, 
    message = "영상이 없습니다",
    cardUploaderPublic = true
}: CommonVideoGridProps) {
    const [modelOpenStatus, setModelOpenStatus] = useState<boolean>(false);
    const [modelOpenStatus2, setModelOpenStatus2] = useState<boolean>(false);
    const videoRefs: RefObject<HTMLVideoElement[]> = useLazyHoverVideo(videos);
    const { user } = useUser();
    const commonVideoGridClassName = `
        md:max-w-6xl md:mx-auto grid md:min-[480px] grid-cols-2 
        sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
        2xl:grid-cols-6 gap-2 max-md:pb-[200px] p-2`;

    if (!videos || videos.length === 0) {
        return <p className="mx-auto text-gray-400 text-lg mt-32 text-center">{message}</p>
    }

    return (
        <div className={commonVideoGridClassName}>
            {videos.map((video, index) => {
                return (
                    <VideoCard 
                        key={video.videoLoc || video.videoId || `video-${index}`}
                        video={video} 
                        index={index} 
                        videoRefs={videoRefs}
                        uploaderPublic={cardUploaderPublic}
                        currentUser={(user !== null) ? user : null}
                        onShowModal={() => setModelOpenStatus(true)}
                        onShowModal2={() => setModelOpenStatus2(true)}
                    />
                );
            })}

            {modelOpenStatus && <DeleteModal onClose={() => setModelOpenStatus(false)} />}
            {modelOpenStatus2 && <ReportModal 
                targetType={ReportTargetType.VIDEO}
                onClose={() => setModelOpenStatus2(false)} />}
        </div>
    );
}