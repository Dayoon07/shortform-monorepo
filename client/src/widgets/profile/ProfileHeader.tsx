import { useState } from "react";
import { REST_API_SERVER } from "../../shared/constants/ApiCollectionList";
import { useUser } from "../../shared/context/UserContext";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { FollowRelationModal } from "../../features/profile/components/ui/FollowRelationModal";
import { useParams } from "react-router-dom";
import ToggleFollowButton from "../../features/follow/components/ui/ToggleFollowButton";
import ProfileEditFormModal from "../../features/profile/components/ProfileEditFormModal";
import { ProfileUserInfo } from "../../entities/profile/ui/ProfileUserInfo";
import { User } from "../../entities/user/model/User";

interface ProfileHeaderProps {
    profile: ProfileUserInfo,
    videoCount: number,
    onShowInfo: () => void
}

export default function ProfileHeader({ profile, videoCount, onShowInfo }: ProfileHeaderProps) {
    const [profileData, setProfileData] = useState<ProfileUserInfo>(profile);
    const [profileEditModal, setProfileEditModal] = useState<boolean>(false);
    const [followModalOpen, setFollowModalOpen] = useState<boolean>(false);
    const [followModalTitle, setFollowModalTitle] = useState<string>("");
    const [followModalData, setFollowModalData] = useState<User[]>([]);

    const { mention } = useParams();
    const { user } = useUser();

    const {
        isOwnProfile,
        getFollowerListHook,
        getFollowingListHook
    } = useProfile(mention, user);

    /** 팔로워 수 변경 → Optimistic UI */
    const handleFollowerCountChange = (isFollowing: boolean) => {
        setProfileData((prev) => ({
            ...prev,
            followerCount: prev.followerCount + (isFollowing ? 1 : -1),
        }));
    };

    /** 팔로우 목록(=following) 모달 오픈 */
    const openFollowingModal = async () => {
        setFollowModalTitle("팔로우");
        setFollowModalData(await getFollowingListHook());
        setFollowModalOpen(true);
    };

    /** 팔로워 목록 모달 오픈 */
    const openFollowerModal = async () => {
        setFollowModalTitle("팔로워");
        setFollowModalData(await getFollowerListHook());
        setFollowModalOpen(true);
    };

    return (
        <>
            <div className="flex flex-col sm:max-w-6xl sm:mx-auto sm:flex-row sm:space-x-6 mb-4 p-6 sm:items-center">
                <div className="max-sm:flex max-sm:justify-center mb-4 sm:mb-0">
                    <img src={profile.social ? `${profile.profileImgSrc}` : `${REST_API_SERVER}${profile.profileImgSrc}`} alt="프로필" 
                        className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover p-1 bg-gradient-to-r from-pink-500 to-sky-500" 
                    />
                </div>
                
                <div className="space-y-2 max-sm:text-center flex-1">
                    
                    <div>
                        <h1 className="text-3xl font-semibold">{profile.username}</h1>
                        <div className="sm:flex space-x-4 max-sm:justify-center mt-1">
                            <small className="font-semibold">@{profile.mention}</small>
                            <small className="text-gray-400 hover:underline cursor-pointer" 
                                onClick={onShowInfo}
                            >
                                더보기
                            </small>
                        </div>
                    </div>

                    <div className="flex space-x-4 max-sm:justify-center">
                        <div>
                            <span className="text-lg font-semibold">{profile.followingCount || 0}</span>{' '}
                            <span className="text-gray-600 hover:underline cursor-pointer"
                                onClick={openFollowingModal}
                            >
                                팔로우
                            </span>
                        </div>

                        <div>
                            <span className="text-lg font-semibold">{profileData.followerCount || 0}</span>{' '}
                            <span className="text-gray-600 hover:underline cursor-pointer"
                                onClick={openFollowerModal}
                            >
                                팔로워
                            </span>
                        </div>

                        <div>
                            <span className="text-lg font-semibold">{videoCount || 0}</span>{' '}
                            <span className="text-gray-600">동영상</span>
                        </div>
                    </div>

                    {profile.bio && (
                        <p className="text-sm text-gray-600">
                            {profile.bio.length > 21 ? profile.bio.substring(0, 20) + '...' : profile.bio}
                        </p>
                    )}

                    {user && (
                        !isOwnProfile ? (
                            <ToggleFollowButton 
                                followReqUser={user} 
                                followResUser={profile}
                                onFollowChange={handleFollowerCountChange}
                            />
                        ) : (
                            <button type="button" onClick={() => setProfileEditModal(true)} className="inline-block rounded-full 
                                bg-neutral-100 px-6 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-200 focus:outline-none 
                                active:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 transition font-semibold"
                            >
                                프로필 편집
                            </button>
                        )
                    )}

                    <ProfileEditFormModal 
                        profile={profile} 
                        isOpen={profileEditModal}
                        onClose={() => setProfileEditModal(false)}
                    />
                </div>
            </div>

            <FollowRelationModal
                isOpen={followModalOpen}
                onClose={() => setFollowModalOpen(false)}
                title={followModalTitle}
                users={followModalData}
                sessionUser={user}
            />
        </>
    );
}
