import { useState, useEffect } from 'react';
import { Info, ThumbsUp, MessageCircle, Share2, ChevronUp, ChevronDown } from 'lucide-react';
import { toggleVideoLike } from '../api/swipeVideoService';
import { showErrorToast, showSuccessToast } from '../../../shared/utils/toast';

// interface VideoActionButtonsProps {
//     video: VideoGridContent[],
//     user: User,
//     onCommentClick: () => void,
//     onInfoClick: () => void,
//     onSwipe: () => void
// }

export function VideoActionButtons({ video, user, onCommentClick, onInfoClick, onSwipe }) {
    const [isLiked, setIsLiked] = useState(video.isLiked);
    const [likeCount, setLikeCount] = useState(video.likeCount);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // 화면 크기 감지 (md: 768px)
    useEffect(() => {
        const checkMobileSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobileSize();
        window.addEventListener('resize', checkMobileSize);
        return () => window.removeEventListener('resize', checkMobileSize);
    }, []);

    const handleLike = async () => {
        if (!user) {
            showErrorToast("로그인이 필요한 기능입니다");
            return;
        }

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 600);

        try {
            const data = await toggleVideoLike(video.id);
            
            if (data) {
                setIsLiked(data.isLiked);
                if (data.totalLikes !== undefined) {
                    setLikeCount(data.likeCnt);
                }
            }
        } catch (error) {
            console.error('좋아요 처리 실패:', error);
            showErrorToast("요청 처리 중 오류가 발생했습니다");
        }
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            showSuccessToast("링크가 복사되었습니다");
        } catch (err) {
            console.error('클립보드 복사 실패:', err);
            showErrorToast("링크 복사에 실패했습니다");
        }
    };

    return (
        <div className="absolute right-2 md:right-6 bottom-20 md:bottom-32 flex flex-col items-center space-y-4 md:space-y-6 z-20">
            <div className="flex flex-col items-center group">
                <button
                    onClick={handleLike}
                    disabled={!user}
                    className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all"
                    aria-label="좋아요"
                >
                    <ThumbsUp
                        className={`h-7 w-7 transition-colors duration-200 ${isAnimating ? 'heart-animation' : ''}`}
                        fill={isLiked ? '#ef4444' : 'none'}
                        stroke={isLiked ? '#ef4444' : 'currentColor'}
                    />
                </button>
                <span className="text-xs md:text-sm mt-1 text-white">{likeCount}</span>
            </div>

            <div className="flex flex-col items-center group">
                <button
                    onClick={onCommentClick}
                    className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all"
                    aria-label="댓글"
                >
                    <MessageCircle className="h-7 w-7 text-white" />
                </button>
                <span className="text-xs md:text-sm mt-1 text-white">{video.commentCount}</span>
            </div>

            <div className="flex flex-col items-center group">
                <button
                    onClick={handleShare}
                    className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all"
                    aria-label="공유"
                >
                    <Share2 className="h-7 w-7 text-white" />
                </button>
                <span className="text-xs md:text-sm mt-1 text-white">공유</span>
            </div>

            <div className="flex flex-col items-center group">
                <button
                    onClick={onInfoClick}
                    className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all"
                    aria-label="설명"
                >
                    <Info className="h-7 w-7 text-white" />
                </button>
                <span className="text-xs md:text-sm mt-1 text-white">설명</span>
            </div>

            {/* 모바일 전용 위 스와이프 버튼 */}
            {isMobile && (
                <div className="flex flex-col items-center group">
                    <button
                        onClick={() => onSwipe('prev')}
                        className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all"
                        aria-label="이전 영상"
                    >
                        <ChevronUp className="h-7 w-7 text-white" />
                    </button>
                </div>
            )}

            {/* 모바일 전용 아래 스와이프 버튼 */}
            {isMobile && (
                <div className="flex flex-col items-center group">
                    <button
                        onClick={() => onSwipe('next')}
                        className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all"
                        aria-label="다음 영상"
                    >
                        <ChevronDown className="h-7 w-7 text-white" />
                    </button>
                </div>
            )}
        </div>
    );
}