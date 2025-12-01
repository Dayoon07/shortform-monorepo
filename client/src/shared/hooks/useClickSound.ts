import { useRef } from "react";

export function useClickSound(filePath: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // 오디오 로딩 에러 핸들러
    const handleAudioError = (e: Event) => {
        const audio = e.currentTarget as HTMLAudioElement;
        console.error(
            '오디오 로딩 오류 발생:', 
            `소스 경로: ${audio.src}`, 
            `에러 코드: ${audio.error?.code}`,
            '브라우저가 지원하는 형식이 아닐 수 있습니다.'
        );
    };

    return () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            // play() 실패는 NotSupportedError, DOMException 등 다양합니다.
            audioRef.current.play().catch(err => console.error('오디오 재생 중 실행 실패:', err)); 
        } else {
            // 💡 오디오 요소를 생성하고 에러 리스너를 추가합니다.
            const newAudio = new Audio(filePath);
            newAudio.addEventListener('error', handleAudioError);
            audioRef.current = newAudio;
            
            // 💡 바로 재생을 시도합니다.
            audioRef.current.play().catch(err => {
                // 이 에러는 주로 파일이 로딩되지 않았을 때 발생합니다.
                console.error('오디오 초기 재생 시 실행 실패:', err);
            });
        }
    };
}