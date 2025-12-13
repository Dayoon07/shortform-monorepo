import { useEffect } from "react";
import { usePost } from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../shared/context/UserContext";
import { Camera, X } from "lucide-react";
import { AvailabilityStatus } from "../../../../shared/constants/enums/AvailabilityStatuc";

// 함수는 웬만하면 hook으로 분리할 예정
export function PostWriteForm() {
    const { user } = useUser();
    const navigate = useNavigate();
    const {
        isSubmitting,
        content,
        setContent,
        uploadedImages,
        setVisibility,
        visibility,
        dragOver,
        validationMessage,
        imageInputRef,
        maxContentLength,
        handleSubmit,
        handleFiles,
        removeImage,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        charCountColor
    } = usePost(user);

    const postValueList = [{
            value: AvailabilityStatus.PUBLIC,
            label: "공개",
            desc: "모든 사용자가 볼 수 있습니다"
        },
        {
            value: AvailabilityStatus.FOLLOWERS,
            label: "팔로워만",
            desc: "나를 팔로우하는 사용자만 볼 수 있습니다"
        },
        {
            value: AvailabilityStatus.PRIVATE,
            label: "비공개",
            desc: "나만 볼 수 있습니다"
    }];

    // 이탈 경고 이벤트 등록
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!isSubmitting && (content.trim() || uploadedImages.length > 0)) {
                e.preventDefault();
                e.returnValue = '작성 중인 내용이 있습니다. 정말로 페이지를 떠나시겠습니까?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [content, uploadedImages, isSubmitting]);

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            <div className="rounded-2xl p-6 border border-gray-200 bg-white shadow-sm">
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                    이미지 첨부
                </label>

                <div onClick={() => imageInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                        dragOver 
                            ? 'border-blue-500 bg-blue-500/10' 
                            : 'border-gray-300 hover:border-blue-400 bg-gray-50'
                    }`}
                >
                    <div className="flex justify-center mb-3">
                        <Camera size={36} className="text-gray-500" />
                    </div>
                    <p className="text-gray-600 mb-2">
                        클릭하거나 파일을 드래그하여 이미지를 업로드하세요
                    </p>
                    <p className="text-xs text-gray-500">
                        PNG, JPG, GIF 파일만 업로드 가능 (최대 5MB, 최대 5장)
                    </p>
                </div>

                <input ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />

                {uploadedImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                        {uploadedImages.map((file, index) => (
                            <div key={index} className="relative">
                                <img src={URL.createObjectURL(file)} alt={`업로드 ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg border border-gray-300"
                                />
                                <button type="button" onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                                        flex items-center justify-center hover:bg-red-600 shadow-md"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="rounded-2xl p-6 border border-gray-200 bg-white shadow-sm">
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                    내용
                </label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    maxLength={maxContentLength}
                    placeholder="팔로워들을 위해 새로운 소식을 올려보세요. (글 또는 이미지만으로도 게시할 수 있어요)"
                    className="w-full border border-gray-300 rounded-xl p-4 text-gray-800 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors resize-none"
                />
                <div className="text-right mt-2">
                    <span className={`text-xs ${charCountColor()}`}>
                        {content.length}/{maxContentLength}
                    </span>
                </div>
            </div>

            <div className="rounded-2xl p-6 border border-gray-200 bg-white shadow-sm">
                <label className="block text-sm font-semibold mb-4 text-gray-800">
                    공개 범위
                </label>
                <div className="space-y-3">
                    {postValueList.map(({ value, label, desc }) => (
                        <label key={value} className={`flex items-start space-x-3 cursor-pointer p-3 rounded-lg transition-colors 
                            ${visibility === value ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}
                        >
                            <input
                                type="radio"
                                name="visibility"
                                value={value}
                                checked={visibility === value}
                                onChange={(e) => setVisibility(e.target.value)}
                                className="w-5 h-5 text-blue-600 bg-white border-gray-300 mt-0.5 focus:ring-blue-500"
                            />
                            <div>
                                <div className="text-sm font-medium text-gray-800">{label}</div>
                                <p className="text-xs text-gray-500 mt-1">{desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {validationMessage && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">
                    {validationMessage}
                </div>
            )}

            <div className="flex justify-end space-x-4 pt-6">
                <button type="button" onClick={() => navigate(-1)}
                    className="px-8 py-3 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-100 transition-all"
                >
                    취소
                </button>
                <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-black text-white hover:bg-gray-800 
                    rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    {isSubmitting ? '게시 중...' : '게시하기'}
                </button>
            </div>
        </form>
    );
}