import { useState, useCallback, useEffect, useRef } from 'react';
import { getRandomVideo } from '../api/swipeVideoService';

export function useSwipeVideo(initialVideo, user) {
    const [videoHistory, setVideoHistory] = useState([]);       // 비디오 히스토리 (앞뒤로 이동 가능하도록)
    const [currentIndex, setCurrentIndex] = useState(0);        // 현재 인덱스
    const [watchedIds, setWatchedIds] = useState(new Set());    // 시청한 비디오 ID 세트 (중복 방지)
    const [isLoading, setIsLoading] = useState(false);          // 로딩 상태
    const [error, setError] = useState(null);                   // 에러 상태
    const nextVideoRef = useRef(null);                          // 다음 비디오 프리로드용 ref

    // 초기 비디오 설정
    useEffect(() => {
        if (initialVideo && videoHistory.length === 0) {
            const normalized = normalizeVideoData(initialVideo);
            setVideoHistory([normalized]);
            setWatchedIds(new Set([normalized.id]));
        }
    }, [initialVideo, videoHistory.length]);

    // 현재 비디오
    const currentVideo = videoHistory[currentIndex];

    // 비디오 데이터 정규화 (백엔드 응답 구조에 맞게 수정)
    const normalizeVideoData = (responseData) => {
        // video 객체가 있으면 사용, 없으면 responseData 자체 사용
        const video = responseData.video || responseData;
        const uploader = responseData.uploader || video.uploader;
        
        return {
            id: responseData.id || video.id,
            videoSrc: video.videoSrc,
            videoLoc: video.videoLoc || video.id,
            title: video.videoTitle || video.title || '',
            description: video.videoDescription || video.description || '',
            videoTag: video.videoTag || '',
            uploader: {
                id: uploader?.id,
                mention: uploader?.mention || '',
                username: uploader?.username || '',
                profileImgSrc: uploader?.profileImgSrc || '/images/default-profile.png'
            },
            likeCount: responseData.likeCnt || video.likeCount || 0,
            commentCount: responseData.commentCnt || video.commentCount || 0,
            isLiked: responseData.isLiked || video.isLiked || false,
            isFollowing: responseData.isFollowing || video.isFollowing || false
        };
    };

    // 다음 비디오 가져오기
    const fetchNextVideo = useCallback(async (currentVideoLoc = null) => {
        try {
            // 현재 비디오의 videoLoc을 넘겨서 다음 영상 가져오기
            const data = await getRandomVideo(user.mention, Array.from(watchedIds), currentVideoLoc);
            
            if (!data) {
                return null;
            }

            // hasMore가 false면 더 이상 영상 없음
            if (data.hasMore === false) {
                return null;
            }

            return normalizeVideoData(data);
        } catch (error) {
            console.error('다음 비디오 로딩 실패:', error);
            throw error;
        }
    }, [watchedIds, user?.mention]);

    // 다음 비디오로 이동
    const nextVideo = async () => {
        // 히스토리가 비어있으면 중단
        if (videoHistory.length === 0) {
            console.warn('비디오 히스토리가 비어있습니다');
            return;
        }

        // 히스토리에 다음 영상이 이미 있으면 그냥 이동
        if (currentIndex < videoHistory.length - 1) {
            setCurrentIndex(prev => prev + 1);
            
            // 마지막에서 두 번째 영상이면 미리 다음 영상 로드
            if (currentIndex === videoHistory.length - 2) {
                const currentVideoLoc = videoHistory[currentIndex + 1]?.videoLoc;
                prefetchNextVideo(currentVideoLoc);
            }
            return;
        }

        // 새로운 비디오 로드
        setIsLoading(true);
        setError(null);

        try {
            // 이미 프리로드된 비디오가 있으면 사용
            let newVideo = nextVideoRef.current;
            
            if (!newVideo) {
                // 현재 비디오의 videoLoc을 넘겨서 다음 영상 가져오기
                const currentVideoLoc = currentVideo?.videoLoc;
                newVideo = await fetchNextVideo(currentVideoLoc);
            }

            if (!newVideo) {
                setError('더 이상 시청할 영상이 없습니다');
                return;
            }

            // 중복 체크
            if (watchedIds.has(newVideo.id)) {
                console.warn('중복 영상 감지, 다시 시도합니다');
                nextVideoRef.current = null;
                await nextVideo(); // 재귀 호출
                return;
            }

            // 히스토리에 추가
            setVideoHistory(prev => [...prev, newVideo]);
            setCurrentIndex(prev => prev + 1);
            
            // 시청 목록에 추가
            setWatchedIds(prev => {
                const newSet = new Set(prev);
                newSet.add(newVideo.id);
                
                // 메모리 관리: 200개 초과시 오래된 것 삭제
                if (newSet.size > 200) {
                    const oldIds = Array.from(newSet).slice(0, 100);
                    oldIds.forEach(id => newSet.delete(id));
                }
                
                return newSet;
            });

            // 다음 영상 미리 로드
            nextVideoRef.current = null;
            prefetchNextVideo(newVideo.videoLoc);

        } catch (error) {
            console.error('다음 영상 로딩 실패:', error);
            setError('영상을 불러올 수 없습니다');
        } finally {
            setIsLoading(false);
        }
    };

    // 이전 비디오로 이동
    const prevVideo = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setError(null);
        } else {
            setError('첫 번째 영상입니다');
            setTimeout(() => setError(null), 2000);
        }
    }, [currentIndex]);

    // 다음 비디오 미리 로드
    const prefetchNextVideo = useCallback(async (currentVideoLoc) => {
        if (nextVideoRef.current) return; // 이미 로드 중이면 중단

        try {
            const video = await fetchNextVideo(currentVideoLoc);
            nextVideoRef.current = video;
        } catch (error) {
            console.warn('프리로드 실패:', error);
        }
    }, [fetchNextVideo]);

    // 첫 로드 후 다음 영상 프리로드
    useEffect(() => {
        if (currentVideo && !nextVideoRef.current) {
            prefetchNextVideo(currentVideo.videoLoc);
        }
    }, [currentVideo, prefetchNextVideo]);

    return {
        currentVideo,
        nextVideo,
        prevVideo,
        isLoading,
        error,
        canGoPrev: currentIndex > 0,
        canGoNext: true, // 항상 시도 가능
        historyLength: videoHistory.length,
        currentIndex
    };
}