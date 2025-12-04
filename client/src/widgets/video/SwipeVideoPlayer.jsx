import React, { useEffect, useState } from 'react';
import { VideoPlayer } from '../../features/video/components/VideoPlayer';
import { VideoActionButtons } from '../../features/video/components/VideoActionButtons';
import { VideoInfoOverlay } from '../../features/video/components/VideoInfoOverlay';

export default function SwipeVideoPlayer({ 
    video, 
    user, 
    isFollowing, 
    onFollowChange,
    onCommentClick,
    onInfoClick,
    onSwipe 
}) {
    const [isMobile, setIsMobile] = useState(false);

    // 화면 크기 감지 (md: 768px)
    useEffect(() => {
        const checkMobileSize = () => setIsMobile(window.innerWidth < 768);
        checkMobileSize();
        window.addEventListener('resize', checkMobileSize);
        return () => window.removeEventListener('resize', checkMobileSize);
    }, []);

    useEffect(() => {
        let startY = 0;

        const handleTouchStart = (e) => startY = e.touches[0].clientY;

        const handleTouchEnd = (e) => {
            const endY = e.changedTouches[0].clientY;
            const delta = startY - endY;
            if (delta > 50)   onSwipe('next');
            if (delta < -50)  onSwipe('prev');
        };

        const handleWheel = (e) => {
            if (e.deltaY > 50)  onSwipe('next');
            if (e.deltaY < -50) onSwipe('prev');
        };

        // 모바일: 터치만 활성화
        if (isMobile) {
            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchend', handleTouchEnd);

            return () => {
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchend', handleTouchEnd);
            };
        }
        // PC: 휠만 활성화
        else {
            window.addEventListener('wheel', handleWheel);

            return () => {
                window.removeEventListener('wheel', handleWheel);
            };
        }
    }, [onSwipe, isMobile]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <VideoPlayer video={video} />
            
            <VideoActionButtons
                video={video}
                user={user}
                onCommentClick={onCommentClick}
                onInfoClick={onInfoClick}
                onSwipe={onSwipe}
            />
            
            <VideoInfoOverlay
                video={video}
                user={user}
                isFollowing={isFollowing}
                onFollowChange={onFollowChange}
            />
        </div>
    );
}