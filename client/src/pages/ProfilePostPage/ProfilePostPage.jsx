import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../shared/context/UserContext";
import { useProfile } from "../../features/profile/hooks/useProfile";
import ProfileHeader from "../../features/profile/components/ui/ProfileHeader";
import ProfileInfoModal from "../../widgets/profile/ProfileInfoModal";
import { ROUTE } from "../../shared/constants/Route";
import { Loading } from "../../shared/components/Loading";
import NotFoundProfile from "../../widgets/profile/NotFoundProfile";
import ProfilePostList from "../../widgets/profile/ProfilePostList";

export default function ProfilePostPage() {
    const { mention } = useParams();
    const { user } = useUser();
    const [showInfoModal, setShowInfoModal] = useState(false);
    const navigate = useNavigate();
    const cleanMention = mention?.replace('@', '');

    const {
        profile,
        videos,
        posts,
        loading,
    } = useProfile(mention, user);

    if (loading) return <Loading />;
    if (!profile) return <NotFoundProfile />;

    return (
        <main className="flex-1 overflow-y-auto bg-black text-white">
            <ProfileHeader 
                profile={profile}
                videoCount={videos.length}
                onShowInfo={() => setShowInfoModal(true)}
            />

            <div className="flex border-b border-gray-800 sticky top-0 bg-black z-10 sm:max-w-6xl sm:mx-auto">
                <button 
                    onClick={() => navigate(ROUTE.PROFILE(cleanMention))}
                    className="px-12 py-3 font-semibold border-b-2 transition border-transparent text-gray-400 hover:text-white max-sm:w-full"
                >
                    동영상
                </button>
                <button 
                    onClick={() => navigate(ROUTE.PROFILE_POST(cleanMention))}
                    className="px-12 py-3 font-semibold border-b-2 transition border-white text-white max-sm:w-full"
                >
                    게시글
                </button>
            </div>

            <div className="sm:max-w-6xl sm:mx-auto">
                {posts && posts.length > 0 ? (
                    <ProfilePostList posts={posts} />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400">게시물이 없습니다</p>
                    </div>
                )}
            </div>
            
            <ProfileInfoModal 
                profile={profile}
                videoCount={videos.length}
                isOpen={showInfoModal}
                onClose={() => setShowInfoModal(false)}
            />
        </main>
    );
}