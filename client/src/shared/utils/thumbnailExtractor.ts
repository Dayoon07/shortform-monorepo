/**
 * 영상을 업로드하면 해당 영상의 프로필 이미지를 추출하는 함수
 * @param {Blob} videoFile
 * @param {number} timeInSeconds 
 */
export const extractThumbnail = (videoFile: Blob, timeInSeconds: number = 1) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;
        
        video.onloadedmetadata = () => {
            const seekTime = Math.min(timeInSeconds, video.duration / 2);
            video.currentTime = seekTime;
        };
        
        video.onseeked = () => {
            if (!ctx) {
                reject(new Error('Canvas context를 가져올 수 없습니다'));
                return;
            }
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            canvas.toBlob(
                (blob) => {
                    URL.revokeObjectURL(video.src);
                    resolve(blob);
                },
                'image/jpeg',
                0.8
            );
        };
        
        video.onerror = () => {
            URL.revokeObjectURL(video.src);
            reject(new Error('비디오 로드 실패'));
        };
        
        video.src = URL.createObjectURL(videoFile);
    });
};
