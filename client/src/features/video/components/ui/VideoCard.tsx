import { memo, RefObject } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../../shared/constants/Route";
import { VideoGridContent } from "../../../../entities/video/ui/VideoGridContent";
import { Image } from "../../../../shared/components/common/custom/Image";

interface VideoCardProps {
    video: VideoGridContent,
    index: number,
    videoRefs: RefObject<(HTMLVideoElement | null)[]>
}

export const VideoCard = memo(({ video, index, videoRefs }: VideoCardProps) => {
    return (
        <div>
            <Link to={ROUTE.PROFILE_SWIPE_VIDEO(video.mention, video.videoLoc)}
                className="relative group cursor-pointer video-card"
            >
                <div className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
                    <video
                        ref={(el) => { videoRefs.current[index] = el; }}
                        data-src={video.videoSrc}
                        data-preview-img={video.previewImg}
                        playsInline
                        preload="none"
                        className="lazy-video w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                    <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/60 rounded-full px-2 py-1 backdrop-blur-sm">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span className="text-white text-xs font-medium">{video.likeCount}</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="mt-2 px-1">
                <Link to={ROUTE.PROFILE(video.mention)} className="block flex items-center space-x-2 mb-1">
                    <Image 
                        url={video.profileImgSrc} 
                        social={video.social} 
                        alt="VideoCard 컴포넌트 프로필"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-md font-bold truncate">
                        {video.uploaderUsername}
                    </span>
                </Link>

                <p className="font-bold text-md leading-tight line-clamp-2 mb-1 break-words whitespace-pre-wrap">
                    {video.videoTitle.length > 25
                        ? video.videoTitle.substring(0, 25) + "..."
                        : video.videoTitle}
                </p>

                <span className="text-gray-600 text-sm">
                    조회수 {video.videoViews.toLocaleString() === '0' ? '없음' : `${video.videoViews.toLocaleString()}회`}
                </span>
            </div>
        </div>
    );
});
