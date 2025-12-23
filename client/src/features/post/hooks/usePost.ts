import { useRef, useState } from 'react';
import { createPost } from '../api/postService';
import { showSuccessToast, showErrorToast } from '../../../shared/utils/toast';
import { User } from '../../../entities/user/model/User';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/Route';
import { AvailabilityStatus } from '../../../shared/constants/enums/AvailabilityStatus';

export function usePost(user: User | null) {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");
    const [uploadedImages, setUploadedImages] = useState<Blob[]>([]);
    const [visibility, setVisibility] = useState<string>(AvailabilityStatus.PUBLIC);
    const [dragOver, setDragOver] = useState<boolean>(false);
    const [validationMessage, setValidationMessage] = useState<string>("");
    const imageInputRef = useRef<HTMLInputElement>(null);
    const maxImages = 5;
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const maxContentLength = 2000;

    const navigate = useNavigate();

    const submitPost = async (formData: FormData) => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const res = await createPost(formData);
            console.log(res);

            if (!res.ok || res.data === undefined) {
                showErrorToast(res.data?.message || '게시글 작성에 실패했습니다');
                throw new Error(res.data?.message || '게시글 작성에 실패했습니다');
            }

            if (res.data) {
                showSuccessToast(res.data.message);
                return res.data;
            }
        } catch (error) {
            showErrorToast(error as string || '네트워크 오류가 발생했습니다');
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    /** 폼 검증 */
    const validateForm = () => {
        const hasContent = content.trim().length > 0;
        const hasImages = uploadedImages.length > 0;
        const contentTooLong = content.length > maxContentLength;

        if (!hasContent && !hasImages) {
            setValidationMessage('글 또는 이미지 중 하나를 입력해주세요');
            showErrorToast('글 또는 이미지 중 하나를 입력해주세요');
            return false;
        }

        if (contentTooLong) {
            setValidationMessage('내용이 너무 깁니다. 2000자 이하로 작성해주세요');
            showErrorToast('내용이 너무 깁니다. 2000자 이하로 작성해주세요')
            return false;
        }

        setValidationMessage('');
        return true;
    };

    // 폼 제출
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm() || isSubmitting || !user) return;

        const formData = new FormData();
        formData.append('content', content.trim());
        formData.append('visibility', visibility);
        formData.append('mention', user.mention);
        uploadedImages.forEach(file => formData.append('images', file));

        try {
            const r = await submitPost(formData);
            if (r !== undefined && r.success) navigate(ROUTE.PROFILE(user.mention));
        } catch (error) {
            console.error('게시글 작성 실패:', error);
        }
    };
    
    // 이미지 파일 처리
    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        
        const filesArray = Array.from(files);
        const remainingSlots = maxImages - uploadedImages.length;

        if (remainingSlots <= 0) {
            showErrorToast(`최대 ${maxImages}장까지만 업로드할 수 있습니다`);
            setValidationMessage(`최대 ${maxImages}장까지만 업로드할 수 있습니다`);
            return;
        }

        const validFiles = filesArray.slice(0, remainingSlots).filter(file => {
            if (!file.type.startsWith('image/')) {
                setValidationMessage('이미지 파일만 업로드 가능합니다');
                showErrorToast("이미지 파일만 업로드 가능합니다");
                return false;
            }
            if (file.size > maxFileSize) {
                showErrorToast("5MB 이하의 파일만 업로드 가능합니다");
                setValidationMessage('5MB 이하의 파일만 업로드 가능합니다');
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            setUploadedImages(prev => [...prev, ...validFiles]);
            setValidationMessage('');
        }
    };

    // 이미지 삭제
    const removeImage = (index: number) => 
        setUploadedImages(prev => prev.filter((_, i) => i !== index));

    // 드래그 앤 드롭
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => setDragOver(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    const charCountColor = () => {
        const length = content.length;
        if (length > maxContentLength * 0.9) return 'text-red-400';
        if (length > maxContentLength * 0.7) return 'text-yellow-500';
        return 'text-gray-500';
    };

    return {
        submitPost,
        isSubmitting,

        content,
        setContent,
        uploadedImages,
        setVisibility,
        visibility,
        dragOver,
        validationMessage,

        imageInputRef,
        maxImages,
        maxFileSize,
        maxContentLength,

        handleSubmit,
        handleFiles,
        removeImage,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        charCountColor
    };
}