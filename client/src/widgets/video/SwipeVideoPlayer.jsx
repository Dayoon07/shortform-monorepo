import React, { useEffect } from 'react';
import { VideoPlayer } from '../../features/video/components/VideoPlayer';
import { VideoActionButtons } from '../../features/video/components/VideoActionButtons';
import { VideoInfoOverlay } from '../../features/video/components/VideoInfoOverlay';

export default function SwipeVideoPlayer({ 
    video, 
    user, 
    isFollowing, 
    onFollowChange,
    onCommentClick,
    onSwipe 
}) {
    useEffect(() => {
        let startY = 0;

        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            const endY = e.changedTouches[0].clientY;
            const delta = startY - endY;
            
            if (delta > 50) {
                onSwipe('next');
            } else if (delta < -50) {
                onSwipe('prev');
            }
        };

        const handleWheel = (e) => {
            if (e.deltaY > 50) {
                onSwipe('next');
            } else if (e.deltaY < -50) {
                onSwipe('prev');
            }
        };

        // 위/아래 화살표 키 누르면 스와이프 되지만 현재는 주석 처리
        // const handleKeyDown = (e) => {
        //     const tagName = e.target.tagName.toLowerCase();
        //     if (tagName === 'input' || tagName === 'textarea') return;

        //     switch(e.key) {
        //         case 'ArrowDown':
        //             e.preventDefault();
        //             onSwipe('next');
        //             break;
        //         case 'ArrowUp':
        //             e.preventDefault();
        //             onSwipe('prev');
        //             break;
        //     }
        // };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('wheel', handleWheel);
        // document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('wheel', handleWheel);
            // document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onSwipe]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <VideoPlayer video={video} />
            
            <VideoActionButtons
                video={video}
                user={user}
                onCommentClick={onCommentClick}
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
