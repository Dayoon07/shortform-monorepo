import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../shared/context/UserContext";
import { getProfileByMention, getProfileVideos } from "../../features/profile/api/profileService";
import { checkFollowStatus, toggleFollow } from "../../features/follow/api/followService";
import ProfileHeader from "../../features/profile/components/ui/ProfileHeader";
import FollowButton from "../../features/follow/components/ui/FollowButton";
import ProfileInfoModal from "../../widgets/profile/ProfileInfoModal";
import { showSuccessToast, showErrorToast } from "../../shared/utils/toast";
import { ROUTE } from "../../shared/constants/Route";
import { Loading } from "../../shared/components/Loading";
import NotFoundProfile from "../../widgets/profile/NotFoundProfile";
import { CommonVideoGrid } from "../../shared/components/CommonVideoGrid";

export default function ProfilePage() {
    const { mention } = useParams();
    const { user } = useUser();
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    
    const cleanMention = mention?.replace('@', '');
    const isOwnProfile = user?.mention === cleanMention;

    const navigate = useNavigate();
    
    const handleFollow = async (mention) => {
        try {
            const data = await toggleFollow(mention);
            setIsFollowing(true);
            showSuccessToast(data);
        } catch (error) {
            showErrorToast('팔로우에 실패했습니다.');
            console.error(error);
        }
    };
    
    const handleUnfollow = async (mention) => {
        try {
            const data = await toggleFollow(mention);
            setIsFollowing(false);
            showSuccessToast(data);
        } catch (error) {
            showErrorToast('언팔로우에 실패했습니다.');
            console.error(error);
        }
    };
    
    // const handleShare = async (uuid) => {
    //     try {
    //         await navigator.clipboard.writeText(`${window.location.origin}/@${cleanMention}/post/${uuid}`);
    //         showSuccessToast('링크가 복사되었습니다!');
    //     } catch (error) {
    //         showErrorToast('링크 복사에 실패했습니다.');
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
            if (!cleanMention) return;
            
            setLoading(true);
            try {
                const [profileData, videosData] = await Promise.all([
                    getProfileByMention(cleanMention),
                    getProfileVideos(cleanMention),
                ]);
                
                setProfile(profileData);
                setVideos(videosData);
                
                // 팔로우 상태 확인
                if (user && !isOwnProfile) {
                    const followStatus = await checkFollowStatus(profileData.mention);
                    setIsFollowing(followStatus);
                }
            } catch (error) {
                console.error('프로필 불러오기 실패: ', error);
                showErrorToast('프로필을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [cleanMention, user, isOwnProfile]);
    
    if (loading) {
        return <Loading />
    }
    
    if (!profile) {
        return <NotFoundProfile />
    }
    
    return (
        <main className="flex-1 overflow-y-auto bg-black text-white min-h-screen">
            <div className="max-w-6xl mx-auto">
                <ProfileHeader 
                    profile={profile}
                    isOwnProfile={isOwnProfile}
                    onShowInfo={() => setShowInfoModal(true)}
                />
                
                {/* 팔로우 버튼 */}
                {!isOwnProfile && user && (
                    <div className="px-6 pb-4">
                        <FollowButton
                            isFollowing={isFollowing}
                            onFollow={handleFollow}
                            onUnfollow={handleUnfollow}
                            mention={profile.mention}
                        />
                    </div>
                )}
                
                <div className="flex border-b border-gray-800 sticky top-0 bg-black z-10">
                    <button
                        onClick={() => navigate(ROUTE.PROFILE(cleanMention))}
                        className="flex-1 py-3 font-semibold border-b-2 transition border-white text-white"
                    >
                        동영상
                    </button>
                    <button
                        onClick={() => navigate(ROUTE.PROFILE_POST(cleanMention))}
                        className="flex-1 py-3 font-semibold border-b-2 transition border-transparent text-gray-400 hover:text-white"
                    >
                        게시글
                    </button>
                </div>

                {videos.length > 0 ? (
                    // <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 pb-20">
                    //     {videos.map((video, index) => (
                    //         <VideoCard key={video.id || index} video={video} index={index} videoRefs={{ current: [] }} />
                    //     ))}
                    // </div>
                    <CommonVideoGrid videos={videos} />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400">동영상이 없습니다</p>
                    </div>
                )}
                
                {/* <div className="p-4">
                    {activeTab === 'videos' ? (
                        videos.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 pb-20">
                                {videos.map((video, index) => (
                                    <VideoCard key={video.id || index} video={video} index={index} videoRefs={{ current: [] }} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-400">동영상이 없습니다</p>
                            </div>
                        )
                    ) : (
                        posts.length > 0 ? (
                            <div className="max-w-2xl mx-auto space-y-6 pb-20">
                                {posts.map(post => (
                                    <PostCard 
                                        key={post.id || post.communityUuid}
                                        post={post}
                                        onLike={(id) => console.log('Like', id)}
                                        onCommentClick={(id) => console.log('Comment', id)}
                                        onShare={handleShare}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-400">게시글이 없습니다</p>
                            </div>
                        )
                    )}
                </div> */}
            </div>
            
            <ProfileInfoModal 
                profile={profile}
                isOpen={showInfoModal}
                onClose={() => setShowInfoModal(false)}
            />
        </main>
    );
}