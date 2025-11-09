import { X } from 'lucide-react';
import VideoMetadataForm from '../../features/video/components/VideoMetadataForm';
import UploadProgress from '../../features/video/components/UploadProgress';

export default function VideoUploadModal({ 
    isOpen, 
    onClose, 
    previewUrl,
    onSubmit,
    isUploading,
    uploadProgress
}) {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !isUploading) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">동영상 정보 입력</h2>
                    {!isUploading && (
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* 업로드 진행 중 */}
                {isUploading && (
                    <UploadProgress 
                        progress={uploadProgress}
                        label="서버 업로드 중..."
                        color="pink"
                    />
                )}

                {/* 폼 */}
                {!isUploading && (
                    <VideoMetadataForm
                        previewUrl={previewUrl}
                        onSubmit={onSubmit}
                        isSubmitting={isUploading}
                    />
                )}
            </div>
        </div>
    );
}