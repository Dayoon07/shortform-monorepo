import { RefObject, useEffect, useRef } from "react";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";

// 비디오 언로드 지연 시간 (5초)
const UNLOAD_DELAY_MS = 5000;

export function useLazyHoverVideo(videos: VideoGridContent[]): RefObject<HTMLVideoElement[]> {
    const videoRefs = useRef<HTMLVideoElement[]>([]);
    // 언로드 타이머를 저장하여 호버 중에는 해제되지 않도록 관리합니다.
    const unloadTimers = useRef<Map<HTMLVideoElement, number>>(new Map());

    useEffect(() => {
        if (!Array.isArray(videos) || videos.length === 0) return;
        const timersSnapshot = unloadTimers.current; // 스냅샷 저장

        /**
         * 비디오를 메모리에서 해제합니다.
         * poster만 남기고 src를 제거하여 메모리를 절약합니다.
         * @param video 해제할 HTMLVideoElement
         */
        const unloadVideo = (video: HTMLVideoElement) => {
            if (video.hasAttribute("data-hovering")) return; // 호버 중이면 해제하지 않음

            // 1. 재생 중단 및 상태 초기화
            video.pause();
            video.currentTime = 0;

            // 2. src 해제 및 load 호출
            // 브라우저가 비디오 리소스를 해제하도록 유도
            if (video.src) {
                video.src = "";
                video.load();
                // 
            }
        };

        /**
         * 비디오 소스를 설정하고 로드/재생을 준비합니다.
         * @param video 타겟 HTMLVideoElement
         */
        const loadAndPlayVideo = (video: HTMLVideoElement) => {
            // Unload 타이머가 있으면 취소
            const timer = unloadTimers.current.get(video);
            if (timer) {
                clearTimeout(timer);
                unloadTimers.current.delete(video);
            }
            
            // src가 설정되어 있지 않다면 설정하고 로드 (Hover 시점)
            if (!video.src && video.dataset.src) {
                video.src = `${REST_API_SERVER}${video.dataset.src}`;
                // video.load()는 src가 설정되었을 때 메타데이터를 로드합니다.
                // 이미 IntersectionObserver에서 poster를 설정했으므로 여기서 load를 호출하여 비디오 파일 준비 시작
                video.load();
            }

            // 재생 시도 (실패 가능성 처리)
            video.currentTime = 0;
            video.play().catch(() => {});
        };

        /**
         * 호버 종료 후 언로드를 예약합니다.
         * @param video 타겟 HTMLVideoElement
         */
        const scheduleUnload = (video: HTMLVideoElement) => {
            // 기존 타이머 클리어
            const existingTimer = unloadTimers.current.get(video);
            if (existingTimer) {
                clearTimeout(existingTimer);
            }
            
            // 5초 후 언로드 예약
            const timer = window.setTimeout(() => {
                unloadTimers.current.delete(video);
                unloadVideo(video);
            }, UNLOAD_DELAY_MS);
            
            unloadTimers.current.set(video, timer);
        };


        // --------------------------------------------------------
        // IntersectionObserver 설정 (스크롤 진입/이탈 감지)
        // --------------------------------------------------------
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target as HTMLVideoElement;
                    const card = video.closest(".video-card") as HTMLElement;
                    
                    if (entry.isIntersecting) {
                        // 1. 뷰포트 진입 시 (Lazy Load - Poster만)

                        // 포스터만 설정하고 load는 호출하지 않음 (최소 메모리 사용)
                        if (video.dataset.previewImg) {
                            video.poster = `${REST_API_SERVER}${video.dataset.previewImg}`;
                            // video.load(); // <-- 제거: 메타데이터 로딩 방지
                        }

                        // 2. 이벤트 리스너 부착 (한 번만)
                        if (card && !card.dataset.listenerAttached) {
                            card.dataset.listenerAttached = "true";

                            // Mouseover: src 로드 및 재생 시작
                            card.addEventListener("mouseover", () => {
                                 // 오디오 트랙의 데이터도 보내지 않게 설정함 (트래픽 줄이기 위함)
                                video.muted = true;
                                card.setAttribute("data-hovering", "true");
                                loadAndPlayVideo(video);
                            });

                            // Mouseout: 재생 중단 및 언로드 예약
                            card.addEventListener("mouseout", () => {
                                card.removeAttribute("data-hovering");
                                video.pause();
                                scheduleUnload(video);
                            });
                            
                            // Click: 재생/일시 정지 토글 (원래 로직 유지)
                            video.addEventListener("click", (e) => {
                                e.preventDefault();
                                video.paused ? video.play() : video.pause();
                            });
                        }

                    } else {
                        // 3. 뷰포트 이탈 시 (즉시 언로드)
                        // 화면을 벗어나면 비디오 메모리를 즉시 해제
                        unloadVideo(video);
                    }
                });
            },
            {
                rootMargin: "100px", // 뷰포트 근처에 오면 관찰 시작
                threshold: 0 // 화면에 일부라도 보이면 관찰 시작
            }
        );
        // --------------------------------------------------------

        // 모든 비디오 요소에 Observer를 부착
        videoRefs.current.forEach((v) => v && observer.observe(v));

        // Cleanup: Observer와 타이머 모두 해제
        return () => {
            observer.disconnect();
            timersSnapshot.forEach(timer => clearTimeout(timer)); // 스냅샷 사용
            timersSnapshot.clear();
        };
    }, [videos]); // videos 배열이 변경될 때만 재실행

    return videoRefs;
}