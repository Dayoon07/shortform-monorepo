import React, { useEffect, useState } from 'react';
import { VideoPlayer } from '../../features/video/components/VideoPlayer';
import { VideoActionButtons } from '../../features/video/components/VideoActionButtons';
import { VideoInfoOverlay } from '../../features/video/components/VideoInfoOverlay';
import { RandomVideoSwipe } from '../../entities/video/ui/RandomVideoSwipe';
import { User } from '../../entities/user/model/User';

interface SwipeVideoPlayerProps {
    video: RandomVideoSwipe, 
    user: User | null, 
    isFollowing: boolean, 
    onFollowChange: React.Dispatch<React.SetStateAction<boolean>>,
    onCommentClick: () => void,
    onInfoClick: () => void,
    onSwipe: (a: string) => void
}

export default function SwipeVideoPlayer({ 
    video, 
    user, 
    isFollowing, 
    onFollowChange,
    onCommentClick,
    onInfoClick,
    onSwipe 
}: SwipeVideoPlayerProps) {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // 화면 크기 감지 (md: 768px)
    useEffect(() => {
        const checkMobileSize = () => setIsMobile(window.innerWidth < 768);
        checkMobileSize();
        window.addEventListener('resize', checkMobileSize);
        return () => window.removeEventListener('resize', checkMobileSize);
    }, []);

    useEffect(() => {
        let startY = 0;

        const handleTouchStart = (e: TouchEvent): void => {
            startY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent): void => {
            const endY = e.changedTouches[0].clientY;
            const delta = startY - endY;
            if (delta > 50)   onSwipe('next');
            if (delta < -50)  onSwipe('prev');
        };

        const handleWheel = (e: WheelEvent): void => {
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