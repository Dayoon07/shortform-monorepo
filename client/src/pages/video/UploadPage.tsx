import { useNavigate } from 'react-router-dom';
import { useUser } from '../../shared/context/UserContext';
import { useVideoUpload } from '../../features/video/hooks/useVideoUpload';
import VideoUploadDropzone from '../../features/video/components/VideoUploadDropzone';
import UploadProgress from '../../features/video/components/UploadProgress';
import VideoUploadModal from '../../widgets/video/VideoUploadModal';
import { ROUTE } from '../../shared/constants/Route';
import { useEffect } from 'react';
import { showSuccessToast } from '../../shared/utils/toast';

// `주석 처리` = 현재는 불필요한 컴포넌트/코드

export default function UploadPage() {
    const { user } = useUser();
    const navigate = useNavigate();
    const {
        // currentFile,
        previewUrl,
        fileProgress,
        uploadProgress,
        isUploading,
        showModal,
        handleFileSelect,
        handleUpload,
        reset,
        setShowModal
    } = useVideoUpload();

    const handleModalSubmit = async (metadata: any) => {
        await handleUpload(metadata);
        showSuccessToast("업로드 성공!");
    };

    const handleModalClose = () => {
        if (!isUploading && window.confirm("업로드를 취소하시겠습니까? 입력한 정보가 모두 사라집니다.")) {
            setShowModal(false);
            reset();
        }
    };

    useEffect(() => {
        if (!user) navigate(ROUTE.LOGINPLZ);
    }, [user, navigate]);

    if (!user) return null;

    return (
        <main className="flex-1 md:min-h-screen">
            <section className="w-full md:h-full md:flex md:flex-col items-center justify-center px-4 py-6 max-md:mt-32">
                <VideoUploadDropzone
                    onFileSelect={handleFileSelect}
                    disabled={fileProgress > 0 && fileProgress < 100}
                />

                {fileProgress > 0 && fileProgress < 100 && (
                    <div className="w-full max-w-3xl">
                        <UploadProgress
                            progress={fileProgress}
                            label="파일 처리 중..."
                            color="blue"
                        />
                    </div>
                )}

                <div className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-center lg:gap-8 
                    text-xs md:text-sm mt-4 space-y-4 lg:space-y-0">
                    <div className="text-gray-400">
                        {[
                            { title: "크기",        value: "최대 크기: 150MB"                  },
                            { title: "파일 형식",   value: "권장 형식은 .mp4이며 주요 포맷 지원" },
                            { title: "해상도",      value: "1080p, 1440p, 4K 고해상도 권장"    },
                            { title: "비율",        value: "가로: 16:9, 세로: 9:16 권장"       },
                        ].map((e, i) => ( 
                            <div key={e.title} className="flex items-start gap-2">
                                <span className="font-bold">{e.title}</span>
                                <span>{e.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <VideoUploadModal
                isOpen={showModal}
                onClose={handleModalClose}
                previewUrl={previewUrl}
                onSubmit={handleModalSubmit}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
            />
        </main>
    );
}