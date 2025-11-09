import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../shared/context/UserContext';
import { useSwipeVideo } from '../../features/video/hooks/useSwipeVideo';
import SwipeVideoPlayer from '../../widgets/video/SwipeVideoPlayer';
import { Loading } from '../../shared/components/Loading';
import { getFirstSwipeVideo } from '../../features/video/api/swipeVideoService';

export default function SwipeVideoPage() {
    const params = useParams();
    const mention = params?.mention;
    const videoLoc = params?.videoLoc;
    
    const { user } = useUser();
    const [initialVideo, setInitialVideo] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState(null);

    console.log('Params:', { mention, videoLoc });

    const {
        currentVideo,
        nextVideo,
        prevVideo,
        isLoading,
        canGoPrev
    } = useSwipeVideo(initialVideo);

    // 초기 비디오 데이터 로드
    useEffect(() => {
        const fetchInitialVideo = async () => {

            if (!user) {
                console.log('⏳ user 로딩 중...');
                return;
            }
            
            if (!videoLoc) {
                console.log('❌ videoLoc 없음');
                return;
            }
            
            if (!user.mention) {
                console.log('❌ user.mention 없음');
                return;
            }
            
            try {
                if (!videoLoc || !user?.mention) {
                    console.log('Missing required params:', { videoLoc, userMention: user?.mention });
                    return;
                }
                
                const data = await getFirstSwipeVideo(videoLoc, user.mention);
                console.log('현재 영상:', data);
                setInitialVideo(data);
            } catch (error) {
                console.error('Error fetching video:', error);
                setError(error.message);
            }
        };

        fetchInitialVideo();
    }, [mention, videoLoc, user?.mention]);

    // URL 업데이트
    useEffect(() => {
        if (currentVideo?.uploader?.mention && currentVideo?.videoLoc) {
            const newUrl = `/@${currentVideo.uploader.mention}/swipe/video/${currentVideo.videoLoc}`;
            window.history.pushState({ videoId: currentVideo.id }, '', newUrl);
            document.title = `${currentVideo.title || 'Video'} | FlipFlop`;
        }
    }, [currentVideo]);

    const handleSwipe = (direction) => {
        if (direction === 'next') {
            nextVideo();
        } else if (direction === 'prev' && canGoPrev) {
            prevVideo();
        }
    };

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center bg-black">
                <div className="text-center text-white">
                    <p className="text-xl mb-2">오류가 발생했습니다</p>
                    <p className="text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    if (!initialVideo) {
        return <Loading />;
    }

    return (
        <main className="flex-1 flex items-center justify-center relative bg-black">
            <SwipeVideoPlayer
                video={currentVideo}
                user={user}
                isFollowing={isFollowing}
                onFollowChange={setIsFollowing}
                onCommentClick={() => setShowCommentModal(true)}
                onSwipe={handleSwipe}
            />

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                        <p className="text-white text-sm">영상 로딩중...</p>
                    </div>
                </div>
            )}

            {showCommentModal && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 z-50"
                    onClick={() => setShowCommentModal(false)}
                >
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        <div 
                            className="bg-gray-900 rounded-2xl w-full max-w-2xl h-3/4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <p className="text-white p-4">댓글 모달 (구현 예정)</p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}