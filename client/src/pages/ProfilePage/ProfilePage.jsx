import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../shared/context/UserContext";
import { useProfile } from "../../features/profile/hooks/useProfile";
import ProfileHeader from "../../features/profile/components/ui/ProfileHeader";
import FollowButton from "../../features/follow/components/ui/FollowButton";
import ProfileInfoModal from "../../widgets/profile/ProfileInfoModal";
import { ROUTE } from "../../shared/constants/Route";
import { Loading } from "../../shared/components/Loading";
import NotFoundProfile from "../../widgets/profile/NotFoundProfile";
import { CommonVideoGrid } from "../../shared/components/CommonVideoGrid";
import ProfileEditFormModal from "../../widgets/profile/ProfileEditFormModal";

export default function ProfilePage() {
    const { mention } = useParams();
    const { user } = useUser();
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [profileEditModal, setProfileEditModal] = useState(false);

    const navigate = useNavigate();
    const cleanMention = mention?.replace('@', '');

    const {
        profile,
        videos,
        loading,
        isFollowing,
        isOwnProfile,
        handleToggleFollow
    } = useProfile(mention, user);
    
    if (loading) return <Loading />;
    if (!profile) return <NotFoundProfile />;
    
    return (
        <main className="flex-1 overflow-y-auto bg-black text-white min-h-screen">
            <div className="max-w-6xl mx-auto">
                <ProfileHeader 
                    profile={profile}
                    isOwnProfile={isOwnProfile}
                    onShowInfo={() => setShowInfoModal(true)}
                />
                
                {/* 
                    조건 
                    - 현재 로그인한 유저이면서 프로필의 정보가 현재 유저의 정보와 다르면 팔로우 버튼
                */}
                {user && (
                    !isOwnProfile ? (
                        <div className="px-6 pb-4">
                            <FollowButton
                                isFollowing={isFollowing}
                                onFollow={handleToggleFollow}
                                onUnfollow={handleToggleFollow}
                                mention={profile.mention}
                            />
                        </div>
                    ) : (
                        <div className="px-6 pb-4">
                            {/* 프로필 편집 버튼 (본인 프로필일 때만 화면에 출력) */}
                            <button className="bg-gradient-to-r from-pink-500 to-sky-500 hover:from-pink-600 hover:to-sky-600 px-8 py-2 rounded-md" 
                                type="button" id="user-profile-edit-btn" onClick={() => setProfileEditModal(true)}
                            >
                                프로필 편집
                            </button>
                        </div>
                    )
                )}

                <div className="flex border-b border-gray-800 sticky top-0 bg-black z-10">
                    <button onClick={() => navigate(ROUTE.PROFILE(cleanMention))}
                        className="flex-1 py-3 font-semibold border-b-2 transition border-white text-white"
                    >
                        동영상
                    </button>
                    <button onClick={() => navigate(ROUTE.PROFILE_POST(cleanMention))}
                        className="flex-1 py-3 font-semibold border-b-2 transition border-transparent text-gray-400 hover:text-white"
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
            </div>
            
            {/* 프로필 정보 */}
            <ProfileInfoModal 
                profile={profile}
                isOpen={showInfoModal}
                onClose={() => setShowInfoModal(false)}
            />

            {/* 프로필 정보 수정 */}
            <ProfileEditFormModal 
                profile={profile} 
                isOpen={profileEditModal}
                onClose={() => setProfileEditModal(false)}
            />

        </main>
    );
}