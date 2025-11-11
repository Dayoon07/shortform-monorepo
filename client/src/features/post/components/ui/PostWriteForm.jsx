import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { usePost } from '../../hooks/usePost';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../../shared/context/UserContext';
import { ROUTE } from '../../../../shared/constants/Route';

export default function PostWriteForm() {
    const { user } = useUser();
    const navigate = useNavigate();
    const { submitPost, isSubmitting } = usePost();
    
    const [content, setContent] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [visibility, setVisibility] = useState('public');
    const [dragOver, setDragOver] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    
    const imageInputRef = useRef(null);
    const maxImages = 5;
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const maxContentLength = 2000;

    // 이미지 파일 처리
    const handleFiles = (files) => {
        const filesArray = Array.from(files);
        const remainingSlots = maxImages - uploadedImages.length;

        if (remainingSlots <= 0) {
            setValidationMessage(`최대 ${maxImages}장까지만 업로드할 수 있습니다.`);
            return;
        }

        const validFiles = filesArray.slice(0, remainingSlots).filter(file => {
            if (!file.type.startsWith('image/')) {
                setValidationMessage('이미지 파일만 업로드 가능합니다.');
                return false;
            }
            if (file.size > maxFileSize) {
                setValidationMessage('5MB 이하의 파일만 업로드 가능합니다.');
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
    const removeImage = (index) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
    };

    // 드래그 앤 드롭
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    // 폼 검증
    const validateForm = () => {
        const hasContent = content.trim().length > 0;
        const hasImages = uploadedImages.length > 0;
        const contentTooLong = content.length > maxContentLength;

        if (!hasContent && !hasImages) {
            setValidationMessage('글 또는 이미지 중 하나를 입력해주세요.');
            return false;
        }

        if (contentTooLong) {
            setValidationMessage('내용이 너무 깁니다. 2000자 이하로 작성해주세요.');
            return false;
        }

        setValidationMessage('');
        return true;
    };

    // 폼 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm() || isSubmitting) return;

        const formData = new FormData();
        formData.append('content', content.trim());
        formData.append('visibility', visibility);
        formData.append('mention', user.mention);
        
        uploadedImages.forEach(file => {
            formData.append('images', file);
        });

        try {
            const response = await submitPost(formData);
            if (response.success) {
                // 1.5초 후 프로필 게시글 페이지로 이동
                setTimeout(() => {
                    navigate(ROUTE.PROFILE_POST(user.mention));
                }, 1500);
            }
        } catch (error) {
            console.error('게시글 작성 실패:', error);
        }
    };

    // 페이지 이탈 경고
    const handleBeforeUnload = (e) => {
        if (!isSubmitting && (content.trim() || uploadedImages.length > 0)) {
            e.preventDefault();
            e.returnValue = '작성 중인 내용이 있습니다. 정말로 페이지를 떠나시겠습니까?';
        }
    };

    // 이탈 경고 이벤트 등록
    useState(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [content, uploadedImages, isSubmitting]);

    const charCountColor = () => {
        const length = content.length;
        if (length > maxContentLength * 0.9) return 'text-red-400';
        if (length > maxContentLength * 0.7) return 'text-yellow-500';
        return 'text-gray-500';
    };

    return (
        <section className="max-w-4xl mx-auto px-6 md:py-16 max-md:py-6 max-md:pb-[100px]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">커뮤니티 글 작성</h1>
                <p className="text-gray-400">사람들과 생각을 공유해보세요</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 이미지 업로드 영역 */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                        이미지 첨부
                    </label>

                    <div
                        onClick={() => imageInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                            dragOver 
                                ? 'border-blue-500 bg-blue-500/10' 
                                : 'border-gray-600 hover:border-gray-500'
                        }`}
                    >
                        <div className="flex justify-center mb-3">
                            <Camera size={36} className="text-gray-400" />
                        </div>
                        <p className="text-gray-400 mb-2">
                            클릭하거나 파일을 드래그하여 이미지를 업로드하세요
                        </p>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, GIF 파일만 업로드 가능 (최대 5MB, 최대 5장)
                        </p>
                    </div>

                    <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFiles(e.target.files)}
                    />

                    {/* 이미지 미리보기 */}
                    {uploadedImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                            {uploadedImages.map((file, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`업로드 ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg border border-gray-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 내용 입력 */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                        내용
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        maxLength={maxContentLength}
                        placeholder="팔로워들을 위해 새로운 소식을 올려보세요. (글 또는 이미지만으로도 게시할 수 있어요)"
                        className="w-full bg-black border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors resize-none"
                    />
                    <div className="text-right mt-2">
                        <span className={`text-xs ${charCountColor()}`}>
                            {content.length}/{maxContentLength}
                        </span>
                    </div>
                </div>

                {/* 공개 범위 */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                    <label className="block text-sm font-semibold text-gray-300 mb-4">
                        공개 범위
                    </label>
                    <div className="space-y-3">
                        {[
                            { value: 'public', label: '공개', desc: '모든 사용자가 볼 수 있습니다' },
                            { value: 'followers', label: '팔로워만', desc: '나를 팔로우하는 사용자만 볼 수 있습니다' },
                            { value: 'private', label: '비공개', desc: '나만 볼 수 있습니다' }
                        ].map(({ value, label, desc }) => (
                            <label
                                key={value}
                                className="flex items-start space-x-3 cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition-colors"
                            >
                                <input
                                    type="radio"
                                    name="visibility"
                                    value={value}
                                    checked={visibility === value}
                                    onChange={(e) => setVisibility(e.target.value)}
                                    className="w-5 h-5 text-white bg-black border-gray-600 mt-0.5"
                                />
                                <div>
                                    <div className="text-sm font-medium text-gray-300">{label}</div>
                                    <p className="text-xs text-gray-500 mt-1">{desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 검증 메시지 */}
                {validationMessage && (
                    <div className="text-sm text-red-400">
                        {validationMessage}
                    </div>
                )}

                {/* 버튼 */}
                <div className="flex justify-end space-x-4 pt-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-12 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 hover:border-gray-500 transition-all"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? '게시 중...' : '게시하기'}
                    </button>
                </div>
            </form>
        </section>
    );
}