import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../shared/context/UserContext";
import { getProfileByMention, getProfileVideos, getProfilePosts } from "../../features/profile/api/profileService";
import { checkFollowStatus, toggleFollow } from "../../features/follow/api/followService";
import { VideoCard } from "../../features/video/components/VideoCard";
import ProfileHeader from "../../features/profile/components/ui/ProfileHeader";
import PostCard from "../../features/post/components/ui/PostCard";
import FollowButton from "../../features/follow/components/ui/FollowButton";
import ProfileInfoModal from "../../widgets/profile/ProfileInfoModal";
import { showSuccessToast, showErrorToast } from "../../shared/utils/toast";
import { ROUTE } from "../../shared/constants/Route";

export default function ProfilePage() {
    const { mention } = useParams();
    const { user } = useUser();
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    
    const cleanMention = mention?.replace('@', '');
    const isOwnProfile = user?.mention === cleanMention;

    const navigate = useNavigate();
    
    const handleFollow = async (mention) => {
        try {
            await toggleFollow(mention);
            setIsFollowing(true);
            showSuccessToast('팔로우했습니다.');
        } catch (error) {
            showErrorToast('팔로우에 실패했습니다.');
        }
    };
    
    const handleUnfollow = async (mention) => {
        try {
            await toggleFollow(mention);
            setIsFollowing(false);
            showSuccessToast('언팔로우했습니다.');
        } catch (error) {
            showErrorToast('언팔로우에 실패했습니다.');
        }
    };
    
    const handleShare = async (uuid) => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/@${cleanMention}/post/${uuid}`);
            showSuccessToast('링크가 복사되었습니다!');
        } catch (error) {
            showErrorToast('링크 복사에 실패했습니다.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!cleanMention) return;
            
            setLoading(true);
            try {
                const [profileData, videosData, postsData] = await Promise.all([
                    getProfileByMention(cleanMention),
                    getProfileVideos(cleanMention),
                    getProfilePosts(cleanMention)
                ]);
                
                setProfile(profileData);
                setVideos(videosData);
                setPosts(postsData);
                
                // 팔로우 상태 확인
                if (user && !isOwnProfile) {
                    const followStatus = await checkFollowStatus(profileData.mention);
                    setIsFollowing(followStatus);
                }
            } catch (error) {
                console.error('Failed to load profile:', error);
                showErrorToast('프로필을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [cleanMention, user, isOwnProfile]);
    
    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center h-screen bg-black text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-gray-400">로딩 중...</p>
                </div>
            </div>
        );
    }
    
    if (!profile) {
        return (
            <div className="flex-1 flex items-center justify-center h-screen bg-black text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">프로필을 찾을 수 없습니다</h2>
                    <button 
                        onClick={() => window.location.href = '/'} 
                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-sky-500 rounded-lg hover:opacity-80"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            </div>
        );
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
                        onClick={() => navigate(ROUTE.PROFILE(mention))}
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 pb-20">
                        {videos.map((video, index) => (
                            <VideoCard key={video.id || index} video={video} index={index} videoRefs={{ current: [] }} />
                        ))}
                    </div>
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