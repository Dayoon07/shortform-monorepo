import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../../shared/context/UserContext';
import { useSwipeVideo } from '../../features/video/hooks/useSwipeVideo';
import SwipeVideoPlayer from '../../widgets/video/SwipeVideoPlayer';
import { Loading } from '../../shared/components/common/Loading';
import { getFirstSwipeVideo } from '../../features/video/api/swipeVideoService';
import ToGoPage from "../../shared/components/common/ToGoPage";
import { CommentModal } from '../../widgets/comment/CommentModal';
import { VideoInfoModal } from '../../widgets/video/VideoInfoModal';
import { RandomVideoSwipe } from '../../entities/video/ui/RandomVideoSwipe';
import { ErrorAndLoading } from '../../features/video/components/ErrorAndLoading';
import { cl } from '../../shared/constants/CurrentLocation';

export default function SwipeVideoPage() {
    const [initialVideo, setInitialVideo] = useState<RandomVideoSwipe | null>(null);
    const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
    const [showVideoInfoModal, setShowVideoInfoModal] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { user } = useUser();
    const params = useParams();
    const mention = params?.mention?.replace('@', '');
    const videoLoc = params?.videoLoc;
    const hasFetched = useRef<boolean>(false);   // 중복 호출 방지
    const {
        currentVideo,
        nextVideo,
        prevVideo,
        isLoading,
        error: swipeError,
        canGoPrev
    } = useSwipeVideo(initialVideo, user);

    /** 스와이프 핸들러 */
    const handleSwipe = (direction: string) => {
        if (direction === 'next') nextVideo();
        if (direction === 'prev') prevVideo();
    };

    // 초기 비디오 로드
    useEffect(() => {
        const fetchInitialVideo = async () => {
            if (hasFetched.current) return; // 이미 호출했으면 중단
            
            if (!videoLoc || !mention) {
                setLoadError('잘못된 접근입니다'); 
                return;
            }
            
            hasFetched.current = true;  // 호출 시작 표시
            const data = await getFirstSwipeVideo(videoLoc, user ? user.mention : null);
            console.log(data);
            if (!data || data.data === undefined) {
                setLoadError("영상을 불러올 수 없습니다");
                hasFetched.current = false; // 에러 발생 시 다시 시도 가능하도록
                return;
            }
            
            setInitialVideo(data.data);
            setIsFollowing(data.data.isFollowing || false);
        };

        if (user !== null) fetchInitialVideo();
    }, [mention, videoLoc, user, navigate]);

    useEffect(() => {   // URL 업데이트 (뒤로가기 지원)
        if (currentVideo?.video.uploader.mention && currentVideo?.video.videoLoc) {
            const newUrl = `${cl}/@${currentVideo.video.uploader.mention}/swipe/video/${currentVideo.video.videoLoc}`;
            const currentPath = window.location.pathname;
            
            if (currentPath !== newUrl) {   // URL이 다를 때만 업데이트
                window.history.pushState(
                    { videoId: currentVideo.id }, 
                    '', 
                    newUrl
                );
            }
            
            document.title = `${currentVideo.video.videoTitle || 'Video'} | FlipFlop`;
        }
    }, [currentVideo]);

    useEffect(() => {   // 브라우저 뒤로가기 처리
        const handlePopState = (e: { preventDefault: () => void; }) => {
            if (canGoPrev) {    // 뒤로가기 시 이전 비디오로 이동
                e.preventDefault();
                prevVideo();
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [canGoPrev, prevVideo]);

    if (loadError) return <ToGoPage errorMessage={loadError} />      // 에러 처리
    if (!initialVideo || !currentVideo) return <Loading message="영상을 불러오는 중..." />; // 초기 로딩

    return (
        <main className="flex-1 flex items-center justify-center relative">
            <SwipeVideoPlayer
                video={currentVideo}
                user={user}
                isFollowing={isFollowing}
                onFollowChange={setIsFollowing}
                onCommentClick={() => setShowCommentModal(true)}
                onInfoClick={() => setShowVideoInfoModal(true)}
                onSwipe={handleSwipe}
            />

            <ErrorAndLoading 
                isLoading={isLoading}
                swipeError={swipeError}
                canGoPrev={canGoPrev}
            />

            <CommentModal
                open={showCommentModal}
                onClose={() => setShowCommentModal(false)}
                videoCommentSize={currentVideo.commentCnt}
                user={user}
                videoId={currentVideo.id}
            />

           <VideoInfoModal
                open={showVideoInfoModal}
                onClose={() => setShowVideoInfoModal(false)}
                v={currentVideo}
            />
        </main>
    );
}