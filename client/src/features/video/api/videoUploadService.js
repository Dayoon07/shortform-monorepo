import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { API_LIST } from "../../../shared/constants/ApiList";

/**
 * 비디오를 서버에 업로드합니다
 * @param {File} file - 업로드할 비디오 파일
 * @param {Object} metadata - 비디오 메타데이터
 * @param {Function} onProgress - 업로드 진행률 콜백
 * @returns {Promise<Object>} 업로드 결과
 */
export async function uploadVideo(file, metadata, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        // 파일과 메타데이터 추가
        formData.append('video', file);
        formData.append('title', metadata.title);
        formData.append('description', metadata.description || '');
        formData.append('hashtags', metadata.hashtags || '');
        formData.append('visibility', metadata.visibility);
        formData.append('commentsAllowed', metadata.commentsAllowed);
        formData.append("mention", metadata.mention);

        // 업로드 진행률 추적
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                onProgress?.(percent);
            }
        });

        // 완료 처리
        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                } catch (e) {
                    resolve({ success: true });
                }
            } else {
                reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
            }
        });

        // 오류 처리
        xhr.addEventListener('error', () => {
            reject(new Error('네트워크 오류가 발생했습니다.'));
        });

        xhr.addEventListener('abort', () => {
            reject(new Error('업로드가 취소되었습니다.'));
        });

        // 요청 전송
        xhr.open('POST', `${REST_API_SERVER}${API_LIST.VIDEO.UPLOAD_VIDEO}`);
        xhr.send(formData);

        // 취소 기능을 위해 xhr 반환
        return xhr;
    });
}

/**
 * 비디오 파일 유효성 검사
 * @param {File} file - 검사할 파일
 * @returns {Object} { valid: boolean, error?: string }
 */
export function validateVideoFile(file) {
    if (!file) {
        return { valid: false, error: '파일을 선택해주세요.' };
    }

    // 비디오 파일 타입 검사
    if (!file.type.startsWith('video/')) {
        return { valid: false, error: '동영상 파일만 업로드 가능합니다.' };
    }

    // 확장자 검사
    const allowedExtensions = ['mp4', 'mov', 'avi', 'wmv'];
    const extension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
        return { 
            valid: false, 
            error: '허용되지 않은 동영상 형식입니다. (mp4, mov, avi, wmv만 가능)' 
        };
    }

    // 파일 크기 검사 (150MB)
    const maxSize = 1024 * 1024 * 150;
    if (file.size > maxSize) {
        return { valid: false, error: '파일 크기가 150MB를 초과합니다.' };
    }

    return { valid: true };
}