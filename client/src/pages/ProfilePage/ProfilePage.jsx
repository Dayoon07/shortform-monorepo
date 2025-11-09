import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../shared/context/UserContext";
import { useProfile } from "../../features/profile/hooks/useProfile";
import ProfileHeader from "../../features/profile/components/ui/ProfileHeader";
import ProfileInfoModal from "../../widgets/profile/ProfileInfoModal";
import { ROUTE } from "../../shared/constants/Route";
import { Loading } from "../../shared/components/Loading";
import NotFoundProfile from "../../widgets/profile/NotFoundProfile";
import { CommonVideoGrid } from "../../shared/components/CommonVideoGrid";

export default function ProfilePage() {
    const { mention } = useParams();
    const { user } = useUser();
    const [showInfoModal, setShowInfoModal] = useState(false);

    const navigate = useNavigate();
    const cleanMention = mention?.replace('@', '');

    const {
        profile,
        videos,
        loading,
    } = useProfile(mention, user);
    
    if (loading) return <Loading />;
    if (!profile) return <NotFoundProfile />;
    
    return (
        <main className="flex-1 overflow-y-auto bg-black text-white">
            <ProfileHeader 
                profile={profile}
                onShowInfo={() => setShowInfoModal(true)}
            />

            <div className="flex border-b border-gray-800 sticky top-0 bg-black z-10">
                <button onClick={() => navigate(ROUTE.PROFILE(cleanMention))}
                    className="px-12 py-3 font-semibold border-b-2 transition border-white text-white"
                >
                    동영상
                </button>
                <button onClick={() => navigate(ROUTE.PROFILE_POST(cleanMention))}
                    className="px-12 py-3 font-semibold border-b-2 transition border-transparent text-gray-400 hover:text-white"
                >
                    게시글
                </button>
            </div>

            {videos.length > 0 ? (
                <CommonVideoGrid videos={videos} />
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-400">동영상이 없습니다</p>
                </div>
            )}
            
            {/* 프로필 정보 */}
            <ProfileInfoModal 
                profile={profile}
                isOpen={showInfoModal}
                onClose={() => setShowInfoModal(false)}
            />

        </main>
    );
}