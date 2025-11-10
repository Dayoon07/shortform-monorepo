// src/features/video/hooks/useVideoPagination.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { getVideoPaginated } from '../api/videoService';

/**
 * 무한 스크롤 방식의 비디오 페이징 훅
 */
export function useVideoPagination(initialSize = 20) {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    
    // 중복 요청 방지
    const isFetchingRef = useRef(false);

    // 초기 데이터 로드
    useEffect(() => {
        loadVideos(0, true);
    }, []);

    const loadVideos = useCallback(async (pageNum, isInitial = false) => {
        // 중복 요청 방지
        if (isFetchingRef.current) return;
        
        // 더 이상 불러올 데이터가 없으면 중단
        if (!isInitial && !hasMore) return;

        isFetchingRef.current = true;
        setLoading(true);
        if (isInitial) setInitialLoading(true);
        setError(null);

        try {
            const data = await getVideoPaginated(pageNum, initialSize);
            
            if (isInitial) {
                // 초기 로드 시 기존 데이터 교체
                setVideos(data.content || []);
            } else {
                // 추가 로드 시 기존 데이터에 추가
                setVideos(prev => [...prev, ...(data.content || [])]);
            }
            
            setHasMore(!data.last);
            setPage(pageNum);
        } catch (err) {
            console.error('Failed to load videos:', err);
            setError(err.message || '비디오를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
            setInitialLoading(false);
            isFetchingRef.current = false;
        }
    }, [hasMore, initialSize]);

    // 다음 페이지 로드
    const loadMore = useCallback(() => {
        if (!loading && hasMore && !isFetchingRef.current) {
            loadVideos(page + 1, false);
        }
    }, [loading, hasMore, page, loadVideos]);

    // 새로고침
    const refresh = useCallback(() => {
        setVideos([]);
        setPage(0);
        setHasMore(true);
        setError(null);
        loadVideos(0, true);
    }, [loadVideos]);

    return {
        videos,
        loading,
        initialLoading,
        hasMore,
        error,
        loadMore,
        refresh,
        page
    };
}