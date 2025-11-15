import { useEffect, useRef } from "react";
import { useVideoPagination } from "../../features/video/hooks/useVideoPagination";
import { VideoGrid } from "../../features/video/components/VideoGrid";
import { Loading } from "../../shared/components/Loading";
import { TryAgain } from "../../shared/components/TryAgain";

export default function VideoList() {
    const { 
        videos, 
        loading, 
        initialLoading, 
        hasMore, 
        error, 
        loadMore,
        refresh 
    } = useVideoPagination(6); // 한 페이지당 6개
    
    const observerTarget = useRef(null);

    // Intersection Observer를 사용한 무한 스크롤
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // 타겟이 화면에 보이고, 로딩 중이 아니고, 더 불러올 데이터가 있을 때
                if (entries[0].isIntersecting && !loading && hasMore) {
                    loadMore();
                }
            },
            {
                root: null, // viewport를 root로 사용
                rootMargin: '200px', // 200px 전에 미리 로드
                threshold: 0.1
            }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => currentTarget && observer.unobserve(currentTarget);
    }, [loadMore, loading, hasMore]);

    if (initialLoading) return <Loading message="비디오를 불러오는 중..." />;     // 초기 로딩
    if (error && videos.length === 0) return <TryAgain errorMessage={error} />; // 에러 발생

    return (
        <div className="relative mx-auto">
            <VideoGrid videos={videos} />
            
            {loading && videos.length > 0 && (
                <div className="flex justify-center py-8">
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        <span className="text-gray-400">더 불러오는 중...</span>
                    </div>
                </div>
            )}
            
            {/* Intersection Observer 타겟 */}
            {hasMore && !loading && (
                <div 
                    ref={observerTarget}
                    className="h-20 flex items-center justify-center"
                >
                    <span className="text-gray-600 text-sm">스크롤하여 더 보기</span>
                </div>
            )}
            
            {/* 더 이상 불러올 데이터가 없을 때 */}
            {!hasMore && videos.length > 0 && (
                <div className="text-center py-8 text-gray-400">
                    <p>모든 비디오를 불러왔습니다</p>
                </div>
            )}
            
            {/* 비디오가 하나도 없을 때 */}
            {!loading && videos.length === 0 && (
                <div className="flex flex-col items-center justify-center h-96">
                    <p className="text-gray-400 text-lg mb-4">비디오가 없습니다</p>
                    <button 
                        onClick={refresh}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        새로고침
                    </button>
                </div>
            )}
        </div>
    );
}