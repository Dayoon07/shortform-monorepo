import { useState, useCallback, useRef } from 'react';
import { uploadVideo, validateVideoFile } from '../api/videoUploadService';
import { showSuccessToast, showErrorToast } from '../../../shared/utils/toast';
import { extractThumbnail } from '../utils/thumbnailExtractor'; // 추가

export function useVideoUpload() {
    const [currentFile, setCurrentFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [thumbnailBlob, setThumbnailBlob] = useState(null); // 추가
    const [fileProgress, setFileProgress] = useState(0);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const xhrRef = useRef(null);

    const reset = useCallback(() => {
        setCurrentFile(null);
        setThumbnailBlob(null); // 추가
        setFileProgress(0);
        setUploadProgress(0);
        setIsUploading(false);
        setShowModal(false);
        
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl('');
        }
    }, [previewUrl]);

    const handleFileSelect = useCallback(async (file) => {
        const validation = validateVideoFile(file);
        
        if (!validation.valid) {
            showErrorToast(validation.error);
            return false;
        }

        setCurrentFile(file);
        
        // 미리보기 URL 생성
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // 파일 처리 진행률 시뮬레이션
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            setFileProgress(progress);
        }, 100);

        try {
            // 섬네일 추출
            const thumbnail = await extractThumbnail(file, 1);
            setThumbnailBlob(thumbnail);
            
            clearInterval(interval);
            setFileProgress(100);
            
            setTimeout(() => {
                setFileProgress(0);
                setShowModal(true);
            }, 300);
        } catch (error) {
            clearInterval(interval);
            console.error('섬네일 추출 실패:', error);
            showErrorToast('섬네일 생성에 실패했습니다.');
            setFileProgress(0);
        }

        return true;
    }, []);

    const handleUpload = useCallback(async (metadata) => {
        if (!currentFile) {
            showErrorToast('업로드할 파일이 없습니다.');
            return;
        }

        if (!metadata.title?.trim()) {
            showErrorToast('동영상 제목을 입력해주세요.');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const result = await uploadVideo(
                currentFile,
                metadata,
                thumbnailBlob, // 섬네일 전달
                (percent) => setUploadProgress(percent)
            );

            showSuccessToast('동영상이 성공적으로 업로드되었습니다!');
            reset();
            return result;
        } catch (error) {
            console.error('업로드 오류:', error);
            showErrorToast('업로드 중 오류가 발생했습니다: ' + error.message);
            throw error;
        } finally {
            setIsUploading(false);
        }
    }, [currentFile, thumbnailBlob, reset]); // thumbnailBlob 의존성 추가

    const cancelUpload = useCallback(() => {
        if (xhrRef.current) {
            xhrRef.current.abort();
        }
        reset();
    }, [reset]);

    return {
        currentFile,
        previewUrl,
        thumbnailBlob, // 추가 (필요시 사용)
        fileProgress,
        uploadProgress,
        isUploading,
        showModal,
        handleFileSelect,
        handleUpload,
        cancelUpload,
        reset,
        setShowModal
    };
}