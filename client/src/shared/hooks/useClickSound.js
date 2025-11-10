import { useRef } from "react";

export function useClickSound(filePath) {
    const audioRef = useRef(null);

    return (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.error('오디오 실행 실패:', err));
        } else {
            audioRef.current = new Audio(filePath);
            audioRef.current.play().catch(err => console.error('오디오 실행 실패:', err));
        }
    };
}