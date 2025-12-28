import { Calendar, Users, Video, Eye, Heart } from "lucide-react";
import { ProfileUserInfo } from "../../entities/profile/ui/ProfileUserInfo";
import Modal from "../../shared/components/common/Modal";

interface ProfileInfoModalProps {
    profile: ProfileUserInfo,
    videoCount: number,
    isOpen: boolean,
    onClose: () => void
}

export default function ProfileInfoModal({
    profile,
    videoCount,
    isOpen,
    onClose
}: ProfileInfoModalProps) {
    if (!isOpen) return null;
    
    return (
        <Modal onClose={onClose} title={profile.username} titleAlign="left">
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
        </Modal>
    );
}