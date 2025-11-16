import { useEffect, useRef } from "react";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";

export function useLazyHoverVideo(videos) {
    const videoRefs = useRef([]);

    useEffect(() => {
        if (!Array.isArray(videos) || videos.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const video = entry.target;

                        // Lazy load
                        if (video.dataset.src && !video.src) {
                            // 마우스 커서 호버하면 영상 실행하는 거는 나중에 구현
                            video.src = `${REST_API_SERVER}${video.dataset.src}`;
                            video.poster = `${REST_API_SERVER}${video.dataset.previewImg}`;
                            // video.load();
                            video.addEventListener("mouseover", e => e.load());
                        }

                        const card = video.closest(".video-card");
                        if (card && !card.dataset.listenerAttached) {
                            card.dataset.listenerAttached = "true";

                            card.addEventListener("mouseover", () => {
                                video.currentTime = 0;
                                video.play().catch(() => {});
                            });
                            card.addEventListener("mouseout", () => {
                                video.pause();
                                video.currentTime = 0;
                            });
                            video.addEventListener("click", (e) => {
                                e.preventDefault();
                                video.paused ? video.play() : video.pause();
                            });
                        }

                        observer.unobserve(video);
                    }
                });
            },
            {
                rootMargin: "100px",
                threshold: 0.5
            }
        );

        videoRefs.current.forEach((v) => v && observer.observe(v));

        return () => observer.disconnect();
    }, [videos]);

    return videoRefs;
}
