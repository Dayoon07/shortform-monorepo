import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../../shared/context/UserContext';
import { useSwipeVideo } from '../../features/video/hooks/useSwipeVideo';
import SwipeVideoPlayer from '../../widgets/video/SwipeVideoPlayer';
import { Loading } from '../../shared/components/Loading';
import { getFirstSwipeVideo } from '../../features/video/api/swipeVideoService';

export default function SwipeVideoPage() {
    const params = useParams();
    const navigate = useNavigate();
    const { user } = useUser();
    
    const mention = params?.mention?.replace('@', '');
    const videoLoc = params?.videoLoc;
    
    const [initialVideo, setInitialVideo] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loadError, setLoadError] = useState(null);

    const {
        currentVideo,
        nextVideo,
        prevVideo,
        isLoading,
        error: swipeError,
        canGoPrev
    } = useSwipeVideo(initialVideo, user);

    // 초기 비디오 로드
    useEffect(() => {
        const fetchInitialVideo = async () => {
            // 로그인 안 했으면 로그인 페이지로
            if (!user) {
                navigate('/loginplz');
                return;
            }
            
            if (!videoLoc || !mention) {
                setLoadError('잘못된 접근입니다');
                return;
            }
            
            try {
                const data = await getFirstSwipeVideo(videoLoc, user.mention);
                console.log(data);
                if (!data) {
                    setLoadError('영상을 찾을 수 없습니다');
                    return;
                }
                
                setInitialVideo(data);
                setIsFollowing(data.isFollowing || false);
            } catch (error) {
                console.error('Error fetching initial video:', error);
                setLoadError('영상을 불러올 수 없습니다');
            }
        };

        fetchInitialVideo();
    }, [mention, videoLoc, user, navigate]);

    // URL 업데이트 (뒤로가기 지원)
    useEffect(() => {
        if (currentVideo?.uploader?.mention && currentVideo?.videoLoc) {
            const newUrl = `/@${currentVideo.uploader.mention}/swipe/video/${currentVideo.videoLoc}`;
            const currentPath = window.location.pathname;
            
            // URL이 다를 때만 업데이트
            if (currentPath !== newUrl) {
                window.history.pushState(
                    { videoId: currentVideo.id }, 
                    '', 
                    newUrl
                );
            }
            
            document.title = `${currentVideo.title || 'Video'} | FlipFlop`;
        }
    }, [currentVideo]);

    // 브라우저 뒤로가기 처리
    useEffect(() => {
        const handlePopState = (e) => {
            // 뒤로가기 시 이전 비디오로 이동
            if (canGoPrev) {
                e.preventDefault();
                prevVideo();
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [canGoPrev, prevVideo]);

    // 스와이프 핸들러
    const handleSwipe = (direction) => {
        if (direction === 'next') {
            nextVideo();
        } else if (direction === 'prev') {
            prevVideo();
        }
    };

    // 에러 처리
    if (loadError) {
        return (
            <div className="flex-1 flex items-center justify-center bg-black">
                <div className="text-center text-white px-4">
                    <p className="text-xl mb-4">{loadError}</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-sky-500 rounded-lg hover:opacity-80"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    // 초기 로딩
    if (!initialVideo || !currentVideo) {
        return <Loading message="영상을 불러오는 중..." />;
    }

    return (
        <main className="flex-1 flex items-center justify-center relative bg-black">
            {/* 비디오 플레이어 */}
            <SwipeVideoPlayer
                video={currentVideo}
                user={user}
                isFollowing={isFollowing}
                onFollowChange={setIsFollowing}
                onCommentClick={() => setShowCommentModal(true)}
                onSwipe={handleSwipe}
            />

            {/* 로딩 오버레이 */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pointer-events-none">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                        <p className="text-white text-sm">다음 영상 로딩중...</p>
                    </div>
                </div>
            )}

            {/* 에러 토스트 */}
            {swipeError && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn">
                    {swipeError}
                </div>
            )}

            {/* 네비게이션 힌트 */}
            <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 text-white text-sm opacity-50 z-40 pointer-events-none">
                {canGoPrev && (
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <span>위로 스와이프</span>
                    </div>
                )}
                <div className="flex items-center space-x-1">
                    <span>아래로 스와이프</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {/* 댓글 모달 */}
            {showCommentModal && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowCommentModal(false)}
                >
                    <div 
                        className="bg-gray-900 rounded-2xl w-full max-w-2xl h-3/4 overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-700">
                            <h3 className="text-white text-lg font-semibold">댓글</h3>
                            <button 
                                onClick={() => setShowCommentModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <p className="text-gray-400 text-center">댓글 기능은 구현 예정입니다</p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}