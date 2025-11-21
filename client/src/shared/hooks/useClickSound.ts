import { useRef } from "react";

export function useClickSound(filePath: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    return () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.error('오디오 실행 실패:', err));
        } else {
            audioRef.current = new Audio(filePath);
            audioRef.current.play().catch(err => console.error('오디오 실행 실패:', err));
        }
    };
}