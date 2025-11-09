import { useState, useCallback, useEffect } from 'react';
import { getRandomVideo } from '../api/swipeVideoService';

export function useSwipeVideo(initialVideo) {
    const [videoHistory, setVideoHistory] = useState(initialVideo ? [initialVideo] : []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [watchedIds, setWatchedIds] = useState(
        initialVideo ? new Set([initialVideo.id]) : new Set()
    );
    const [isLoading, setIsLoading] = useState(false);

    // initialVideo가 변경되면 상태 초기화
    useEffect(() => {
        if (initialVideo && videoHistory.length === 0) {
            setVideoHistory([initialVideo]);
            setWatchedIds(new Set([initialVideo.id]));
        }
    }, [initialVideo]);

    const currentVideo = videoHistory[currentIndex];

    const normalizeVideoData = (responseData) => {
        const video = responseData.video;
        return {
            id: video.id,
            videoSrc: video.videoSrc,
            videoLoc: video.videoLoc || video.id,
            title: video.videoTitle || '',
            description: video.videoDescription || '',
            videoTag: video.videoTag || '',
            uploader: {
                id: video.uploader?.id,
                mention: video.uploader?.mention || '',
                username: video.uploader?.username || '',
                profileImgSrc: video.uploader?.profileImgSrc || '/images/default-profile.png'
            },
            likeCount: responseData.likeCnt || 0,
            commentCount: responseData.commentCnt || 0,
            isLiked: responseData.isLiked || false,
            isFollowing: responseData.isFollowing || false
        };
    };

    const nextVideo = useCallback(async () => {
        // 비디오 히스토리가 없으면 중단
        if (videoHistory.length === 0) {
            console.warn('비디오 히스토리가 비어있습니다.');
            return;
        }

        // 히스토리에 다음 영상이 있으면 이동
        if (currentIndex < videoHistory.length - 1) {
            setCurrentIndex(currentIndex + 1);
            return;
        }

        setIsLoading(true);
        try {
            const data = await getRandomVideo(Array.from(watchedIds));
            
            if (data?.hasMore === false) {
                alert('더 이상 시청할 영상이 없습니다.');
                return;
            }

            const newVideo = normalizeVideoData(data);
            
            if (watchedIds.has(newVideo.id)) {
                console.warn('중복 영상 감지');
                await nextVideo(); // 재귀 호출
                return;
            }

            setWatchedIds(prev => {
                const newSet = new Set(prev);
                newSet.add(newVideo.id);
                
                // 메모리 관리: 1000개 초과시 오래된 것 삭제
                if (newSet.size > 1000) {
                    const oldIds = Array.from(newSet).slice(0, 500);
                    oldIds.forEach(id => newSet.delete(id));
                }
                
                return newSet;
            });

            setVideoHistory(prev => [...prev, newVideo]);
            setCurrentIndex(prev => prev + 1);

        } catch (error) {
            console.error('다음 영상 로딩 실패:', error);
            alert('다음 영상을 불러올 수 없습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [currentIndex, videoHistory, watchedIds]);

    const prevVideo = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            alert('첫 번째 영상입니다.');
        }
    }, [currentIndex]);

    return {
        currentVideo,
        nextVideo,
        prevVideo,
        isLoading,
        canGoPrev: currentIndex > 0,
        canGoNext: currentIndex < videoHistory.length - 1 || !isLoading
    };
}