import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { useProfileEdit } from "../hooks/useProfileEdit";

export default function ProfileEditFormModal({ profile, isOpen, onClose }) {
    const {
        previewImg,
        formData,
        handleImageChange,
        handleInputChange,
        handleSubmit,
        resetForm
    } = useProfileEdit(profile, onClose);

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full mx-4">
                <h2 className="text-xl font-bold mb-4 text-black text-center">프로필 수정</h2>

                <div className="space-y-4 text-black">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-left">프로필 이미지</label>
                        <div className="flex items-center space-x-4">
                            <img
                                src={`${previewImg !== null ? REST_API_SERVER + previewImg : REST_API_SERVER + profile.profileImgSrc}`}
                                alt="프로필 미리보기"
                                className="w-16 h-16 rounded-full object-cover border"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                                    file:rounded-full file:border-0 file:text-sm file:font-semibold 
                                    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium mb-2 text-left">사용자명</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="mail" className="block text-sm font-medium mb-2 text-left">이메일</label>
                        <input
                            type="email"
                            id="mail"
                            name="mail"
                            value={formData.mail}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="mention" className="block text-sm font-medium mb-2 text-left">사용자 멘션</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 
                                border-gray-300 bg-gray-50 text-gray-500 text-sm">@</span>
                            <input
                                type="text"
                                id="mention"
                                name="mention"
                                value={formData.mention}
                                onChange={handleInputChange}
                                required
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium mb-2 text-left">자기소개</label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows="4"
                            placeholder="자신을 소개해주세요..."
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex space-x-3 max-md:pb-20">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-4 py-2 text-white rounded-md 
                                bg-gradient-to-r from-pink-500 to-sky-500 
                                hover:from-pink-600 hover:to-sky-600"
                        >
                            저장
                        </button>
                        <button
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md 
                                hover:bg-gray-600 focus:outline-none focus:ring-2 
                                focus:ring-gray-500"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}