import { memo, RefObject, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "../../../../shared/constants/Route";
import { VideoGridContent } from "../../../../entities/video/ui/VideoGridContent";
import { Image } from "../../../../shared/components/common/custom/Image";
import { MoreVertical } from "lucide-react";
import { User } from "../../../../entities/user/model/User";
import { DropdownMenuBtn } from "../../../../shared/components/video/ui/DropdownMenuBtn";

interface VideoCardProps {
    video: VideoGridContent,
    index: number,
    videoRefs: RefObject<(HTMLVideoElement | null)[]>,
    uploaderPublic?: boolean,
    currentUser?: User | null,
    onShowModal?: () => void,
    onShowModal2?: (p1: number) => void
}

export const VideoCard = memo(({
    video, 
    index, 
    videoRefs, 
    uploaderPublic = true,
    currentUser,
    onShowModal,
    onShowModal2 
}: VideoCardProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    // 외부 클릭 감지 로직
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // 메뉴가 열려있고, 클릭된 요소가 메뉴 영역이나 버튼 영역에 속하지 않으면 메뉴를 닫습니다.
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node) && 
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);


    // 메뉴 토글 핸들러
    const handleMenuToggle = (e: React.MouseEvent) => {
        e.preventDefault(); // Link 태그로 인한 페이지 이동 방지
        e.stopPropagation(); // 이벤트 버블링 방지
        setIsMenuOpen(prev => !prev);
    };

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
                    
                    {/* MoreVertical 아이콘 및 드롭다운 메뉴 (오른쪽 상단) */}
                    {currentUser != null && (
                        <div className="absolute top-2 right-2 z-10" ref={menuRef}>
                            <button 
                                ref={buttonRef}
                                onClick={handleMenuToggle} 
                                className="p-1 text-white bg-black/50 rounded-full transition-colors"
                                aria-expanded={isMenuOpen}
                                aria-label="비디오 옵션"
                            >
                                <MoreVertical className="w-5 h-5" />
                            </button>
                            
                            <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {isMenuOpen && (
                                    <div className="py-1">
                                        {currentUser?.id === video.uploaderId && (
                                            <>
                                                <DropdownMenuBtn
                                                    text="영상 수정하기"
                                                    onClickEventFunc={() => navigate(ROUTE.VIDEO_EDIT)}
                                                />
                                                <DropdownMenuBtn
                                                    text="영상 삭제하기"
                                                    onClickEventFunc={() => onShowModal?.()}
                                                />
                                            </>
                                        )}
                                        {currentUser?.id !== video.uploaderId && (
                                            <DropdownMenuBtn
                                                text="신고하기"
                                                onClickEventFunc={() => onShowModal2?.(index)}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Link>

            <div className="mt-2 px-1">
                {uploaderPublic && (
                    <Link to={ROUTE.PROFILE(video.mention)} className="block flex items-center space-x-2 mb-1">
                        <Image 
                            url={video.profileImgSrc} 
                            social={video.social} 
                            provider={video.provider}
                            alt="VideoCard 컴포넌트 프로필"
                            className="w-8 h-8 border rounded-full object-cover"
                        />
                        <span className="text-md font-bold truncate">
                            {video.uploaderUsername}
                        </span>
                    </Link>
                )}

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