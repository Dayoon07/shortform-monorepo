import { useEffect } from "react";
import { usePost } from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../shared/context/UserContext";
import { Camera, X } from "lucide-react";

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

    const postValueList = [
        { value: 'public',      label: '공개',      desc: '모든 사용자가 볼 수 있습니다' },
        { value: 'followers',   label: '팔로워만',  desc: '나를 팔로우하는 사용자만 볼 수 있습니다' },
        { value: 'private',     label: '비공개',    desc: '나만 볼 수 있습니다' }
    ];

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
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                    이미지 첨부
                </label>

                <div onClick={() => imageInputRef.current?.click()}
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
                                    className="w-full h-24 object-cover rounded-lg border border-gray-600"
                                />
                                <button type="button" onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                >
                                    <X />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                    내용
                </label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
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

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                <label className="block text-sm font-semibold text-gray-300 mb-4">
                    공개 범위
                </label>
                <div className="space-y-3">
                    {postValueList.map(({ value, label, desc }) => (
                        <label key={value} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-800 
                            p-3 rounded-lg transition-colors"
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

            {validationMessage && (
                <div className="text-sm text-red-400">
                    {validationMessage}
                </div>
            )}

            <div className="flex justify-end space-x-4 pt-6">
                <button type="button" onClick={() => navigate(-1)}
                    className="px-12 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 hover:border-gray-500 transition-all"
                >
                    취소
                </button>
                <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                    rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 
                    disabled:cursor-not-allowed"
                >
                    {isSubmitting ? '게시 중...' : '게시하기'}
                </button>
            </div>
        </form>
    );
}