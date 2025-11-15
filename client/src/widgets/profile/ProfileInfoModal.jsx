import { Calendar, Users, Video, Eye, Heart, X } from "lucide-react";

export default function ProfileInfoModal({ profile, videoCount, isOpen, onClose }) {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center px-6 py-6 border-b">
                    <h2 className="text-xl font-semibold text-black">{profile.username}</h2>
                    <button onClick={onClose} className="text-black text-4xl hover:text-gray-600">
                        <X />
                    </button>
                </div>
                
                <div className="p-6 space-y-4 text-black">
                    {profile.bio && (
                        <div>
                            <h3 className="font-semibold text-lg mb-2">설명</h3>
                            <p className="whitespace-pre-wrap">{profile.bio}</p>
                        </div>
                    )}
                    
                    <div>
                        <h3 className="font-semibold text-lg mb-3">추가 정보</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Calendar size={24} className="text-gray-600" />
                                <span>가입일: {profile.createAt?.substring(0, 10)}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Users size={24} className="text-gray-600" />
                                <span>팔로워: {profile.followerCount || 0}명</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Video size={24} className="text-gray-600" />
                                <span>동영상: {videoCount || 0}개</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Eye size={24} className="text-gray-600" />
                                <span>조회수: {(profile.totalViews || 0).toLocaleString()}회</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Heart size={24} className="text-gray-600" />
                                <span>좋아요: {(profile.totalLikes || 0).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}