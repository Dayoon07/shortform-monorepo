import { useState, useEffect } from 'react';
import { Info, MessageCircle, Share2, ChevronUp, ChevronDown } from 'lucide-react';
import { toggleVideoLike } from '../api/swipeVideoService';
import { showErrorToast, showSuccessToast } from '../../../shared/utils/toast';
import { VideoLikeButton } from './ui/VideoLikeButton';
import { VideoActionButton } from './ui/VideoActionButton';

export function VideoActionButtons({ video, user, onCommentClick, onInfoClick, onSwipe }) {
    const [isLiked, setIsLiked] = useState(video.isLiked);
    const [likeCount, setLikeCount] = useState(video.likeCount);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // video prop이 변경될 때마다 좋아요 상태 및 갯수 동기화
    useEffect(() => {
        setIsLiked(video.isLiked);
        setLikeCount(video.likeCount);
    }, [video.id, video.isLiked, video.likeCount]);

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
                if (data.likeCnt !== undefined) { 
                    setLikeCount(data.data.likeCnt);
                }
            }
        } catch (error) {
            console.error('좋아요 처리 실패:', error);
            showErrorToast("요청 처리 중 오류가 발생했습니다");
        }
    };

    const handleShare = async () => {
        try {
            // 현재 페이지 URL을 복사
            await navigator.clipboard.writeText(window.location.href); 
            showSuccessToast("링크가 복사되었습니다");
        } catch (err) {
            console.error('클립보드 복사 실패:', err);
            showErrorToast("링크 복사에 실패했습니다");
        }
    };

    return (
        <div className="absolute right-2 md:right-6 bottom-20 md:bottom-32 flex flex-col items-center space-y-4 md:space-y-6 z-20">
            <VideoLikeButton 
                onClick={handleLike}
                disabled={!user}
                ariaLabel="좋아요"
                likeCount={likeCount}
                isAnimating={isAnimating}
                isLiked={isLiked}
            />

            <VideoActionButton 
                onClick={onCommentClick}
                ariaLabel="댓글"
                BtnIcon={MessageCircle}
                text={video.commentCount}
            />

            <VideoActionButton 
                onClick={handleShare}
                ariaLabel="공유"
                BtnIcon={Share2}
                text="공유"
            />

            <VideoActionButton 
                onClick={onInfoClick}
                ariaLabel="설명"
                BtnIcon={Info}
                text="설명"
            />

            {/* 모바일 전용 위 스와이프 버튼 */}
            {isMobile && (
                <VideoActionButton
                    onClick={() => onSwipe('prev')}
                    ariaLabel="이전 영상"
                    BtnIcon={ChevronUp}
                    text="" // 텍스트를 표시하지 않을 경우 빈 문자열
                />
            )}

            {/* 모바일 전용 아래 스와이프 버튼 */}
            {isMobile && (
                <VideoActionButton
                    onClick={() => onSwipe('next')}
                    ariaLabel="다음 영상"
                    BtnIcon={ChevronDown}
                    text="" // 텍스트를 표시하지 않을 경우 빈 문자열
                />
            )}
        </div>
    );
}