import { useRef } from "react";

export function useClickSound(filePath) {
    const audioRef = useRef(null);

    return (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.error('Audio play failed:', err));
        } else {
            audioRef.current = new Audio(filePath);
            audioRef.current.play().catch(err => console.error('Audio play failed:', err));
        }
    };
}