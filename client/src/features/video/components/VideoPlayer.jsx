import React, { useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { REST_API_SERVER } from '../../../shared/constants/ApiServer';
import { useVideoPlayer } from '../hooks/useVideoPlayer';

export function VideoPlayer({ video }) {
    const { videoRef, isPlaying, progress, togglePlay, handleProgressClick } = useVideoPlayer();

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(e => console.log('자동재생 실패:', e));
        }
    }, [video.id]);

    return (
        <div className="relative aspect-[9/16] h-[90vh] w-auto max-w-[90vw]">
            <video
                ref={videoRef}
                src={`${REST_API_SERVER}${video.videoSrc}`}
                className="max-w-full max-h-full object-contain mx-auto my-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                autoPlay
                loop
                playsInline
            />

            <div 
                className="absolute inset-0 cursor-pointer z-10"
                onClick={togglePlay}
            />

            <div className="absolute md:top-4 md:left-4 top-2 left-2 z-30">
                <button
                    onClick={togglePlay}
                    className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
                    aria-label="재생/일시정지"
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
            </div>

            <div 
                className="absolute bottom-0 max-md:bottom-9 left-0 w-full h-2 bg-gray-600 z-20 cursor-pointer"
                onClick={handleProgressClick}
            >
                <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}