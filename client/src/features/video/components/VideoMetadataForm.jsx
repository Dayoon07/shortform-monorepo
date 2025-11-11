import { useState } from 'react';
import { useUser } from "../../../shared/context/UserContext";

export default function VideoMetadataForm({ onSubmit, isSubmitting, previewUrl }) {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        hashtags: '',
        visibility: 'public',
        commentsAllowed: 'public',
        mention: user?.mention
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
                <video 
                    src={previewUrl}
                    className="w-full max-w-sm rounded-lg" 
                    controls
                />
            </div>

            <div>
                <label htmlFor="video-title" className="block text-sm font-medium text-gray-700 mb-2">
                    동영상 제목 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="video-title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="동영상 제목을 입력하세요"
                    maxLength={100}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent
                        disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">최대 100자까지 입력 가능합니다.</p>
            </div>

            <div>
                <label htmlFor="video-description" className="block text-sm font-medium text-gray-700 mb-2">
                    동영상 설명
                </label>
                <textarea
                    id="video-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="동영상에 대한 설명을 입력하세요"
                    maxLength={2000}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent
                        disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">최대 2000자까지 입력 가능합니다.</p>
            </div>

            <div>
                <label htmlFor="video-hashtags" className="block text-sm font-medium text-gray-700 mb-2">
                    해시태그
                </label>
                <input
                    type="text"
                    id="video-hashtags"
                    name="hashtags"
                    value={formData.hashtags}
                    onChange={handleChange}
                    placeholder="해시태그1 해시태그2 해시태그3"
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent
                        disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">해시태그는 공백으로 구분합니다.</p>
            </div>

            <div>
                <label htmlFor="video-visibility" className="block text-sm font-medium text-gray-700 mb-2">
                    동영상 시청 권한 <span className="text-red-500">*</span>
                </label>
                <select
                    id="video-visibility"
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent
                        disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                    <option value="public">전체 공개</option>
                    <option value="followers">팔로워만</option>
                    <option value="private">나만 보기</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    댓글 작성 허용 <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="commentsAllowed"
                            value="public"
                            checked={formData.commentsAllowed === 'public'}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-4 h-4 text-[#FE2C55] border-gray-300 focus:ring-[#FE2C55]"
                        />
                        <span className="ml-2 text-sm text-gray-700">모든 사용자</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="commentsAllowed"
                            value="followers"
                            checked={formData.commentsAllowed === 'followers'}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-4 h-4 text-[#FE2C55] border-gray-300 focus:ring-[#FE2C55]"
                        />
                        <span className="ml-2 text-sm text-gray-700">팔로워만</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="commentsAllowed"
                            value="private"
                            checked={formData.commentsAllowed === 'private'}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-4 h-4 text-[#FE2C55] border-gray-300 focus:ring-[#FE2C55]"
                        />
                        <span className="ml-2 text-sm text-gray-700">댓글 허용 안함</span>
                    </label>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !formData.title.trim()}
                className="w-full px-6 py-2 bg-[#FE2C55] text-white rounded-md 
                    hover:bg-[#e71b45] disabled:bg-gray-400 disabled:cursor-not-allowed
                    transition-colors"
            >
                {isSubmitting ? '업로드 중...' : '업로드'}
            </button>
        </form>
    );
}