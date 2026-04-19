import { useState, useRef, useEffect, MouseEvent, RefObject } from 'react';

export interface VideoPlayerControls {
    videoRef: RefObject<HTMLVideoElement | null>;
    isPlaying: boolean;
    progress: number;
    togglePlay: () => void;
    handleProgressClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export function useVideoPlayer(): VideoPlayerControls {
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState<number>(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                // videoRef.current가 HTMLVideoElement임을 확신
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const updateProgress = () => {
        if (videoRef.current) {
            // videoRef.current가 HTMLVideoElement임을 확신
            const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(percent || 0);
        }
    };

    // 이벤트 객체에 MouseEvent<HTMLDivElement> 타입을 명시
    const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return;
        
        // currentTarget이 HTMLDivElement임을 확신
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const ratio = Math.min(Math.max(x / rect.width, 0), 1);
        videoRef.current.currentTime = ratio * videoRef.current.duration;
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleTimeUpdate = updateProgress;

        // 타입스크립트 환경에서 addEventListener의 이벤트 타입이 정확한지 확인
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    return {
        videoRef,
        isPlaying,
        progress,
        togglePlay,
        handleProgressClick
    };
}