import { useState, useRef, useEffect } from 'react';

export function useVideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
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
            const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(percent || 0);
        }
    };

    const handleProgressClick = (e) => {
        if (!videoRef.current) return;
        
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