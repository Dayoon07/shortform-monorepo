import { useState, useEffect, useCallback, useRef } from 'react';
import { getVideoPaginated } from '../api/videoService';
import { VideoGridContent } from '../../../entities/video/ui/VideoGridContent';
import { Page } from '../../../entities/constants/Page';

/**
 * 무한 스크롤 방식의 비디오 페이징 훅
 */
export function useVideoPagination(initialSize: number = 10) {
    const [videos, setVideos] = useState<VideoGridContent[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    
    // 중복 요청 방지
    const isFetchingRef = useRef<boolean>(false);

    const loadVideos = useCallback(async (pageNum: number, isInitial = false) => {
        // 중복 요청 방지
        if (isFetchingRef.current) return;
        
        // 더 이상 불러올 데이터가 없으면 중단
        if (!isInitial && !hasMore) return;

        isFetchingRef.current = true;
        setLoading(true);
        if (isInitial) setInitialLoading(true);
        setError(null);

        try {
            const data: Page<VideoGridContent> = await getVideoPaginated(pageNum, initialSize);

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
            // Error 객체에서 메시지를 안전하게 가져오기
            const errorMessage = err instanceof Error ? err.message : '비디오를 불러오는데 실패했습니다.';
            setError(errorMessage);
        } finally {
            setLoading(false);
            setInitialLoading(false);
            isFetchingRef.current = false;
        }
    }, [hasMore, initialSize]);

    // 초기 데이터 로딩
    useEffect(() => {
        // ESLint 규칙을 비활성화하는 대신, 의존성 배열을 명시하거나 loadVideos를 적절히 처리해야 합니다.
        // 현재 로직은 '컴포넌트 마운트 시 한 번만'을 의도했으므로, 아래와 같이 유지할 수 있습니다.
        loadVideos(0, true);
        // loadVideos는 initialSize에 의존하지만, 이 로직은 단 한 번의 초기 호출을 위한 것입니다.
        // 만약 loadVideos를 의존성에 추가하면, `hasMore`나 `initialSize`가 변경될 때마다 초기 로드가 다시 발생합니다.
        // 여기서는 의도대로 빈 배열을 유지하며, 주석으로 의도를 명시합니다.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    // 다음 페이지 로드
    const loadMore = useCallback(() => {
        if (!loading && hasMore && !isFetchingRef.current) {
            loadVideos(page + 1, false);
        }
    }, [loading, hasMore, page, loadVideos]); // 의존성 배열에 loadVideos 추가

    // 새로고침
    const refresh = useCallback(() => {
        setVideos([]);
        setPage(0);
        setHasMore(true);
        setError(null);
        loadVideos(0, true);
    }, [loadVideos]); // 의존성 배열에 loadVideos 추가

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