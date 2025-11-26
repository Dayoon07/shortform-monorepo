import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../shared/context/UserContext";
import { useProfile } from "../../features/profile/hooks/useProfile";
import ProfileHeader from "../../widgets/profile/ProfileHeader";
import ProfileInfoModal from "../../widgets/profile/ProfileInfoModal";
// import { ROUTE } from "../../shared/constants/Route";
import { Loading } from "../../shared/components/common/Loading";
import NotFoundProfile from "../../widgets/profile/NotFoundProfile";
import { CommonVideoGrid } from "../../shared/components/video/CommonVideoGrid";
import ProfilePostList from "../../widgets/profile/ProfilePostList";

export default function ProfilePage() {
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [tab, setTab] = useState("videos");
    // const navigate = useNavigate();
    const { mention } = useParams();
    const { user } = useUser();
    // const profileUserCleanMention = mention?.replace('@', '');

    const {
        profile,
        posts,
        videos,
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

            <div className="border-b border-gray-800 sticky top-0 bg-black z-10">
                <div className="flex md:max-w-6xl md:mx-auto">
                    <button 
                        className={`
                            ${tab === "videos" ? "border-white" : "border-transparent"} 
                            px-12 py-3 font-semibold border-b-2 transition max-md:w-full
                        `}
                        onClick={() => {
                            // navigate(ROUTE.PROFILE(profileUserCleanMention))
                            setTab("videos");
                        }}
                    >
                        동영상
                    </button>
                    <button 
                        className={`
                            ${tab === "posts" ? "border-white" : "border-transparent"} 
                            px-12 py-3 font-semibold border-b-2 transition max-md:w-full
                        `}
                        onClick={() => {
                            // navigate(ROUTE.PROFILE_POST(profileUserCleanMention))
                            setTab("posts");
                        }}
                    >
                        게시글
                    </button>
                </div>
            </div>

            {(tab === "videos" && videos.length > 0) ? (
                <CommonVideoGrid videos={videos} />
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-400">동영상이 없습니다</p>
                </div>
            )}

            {(tab === "posts" && posts.length > 0) ? (
                <ProfilePostList posts={posts} />
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-400">게시물이 없습니다</p>
                </div>
            )}

            <ProfileInfoModal 
                profile={profile}
                videoCount={videos.length}
                isOpen={showInfoModal}
                onClose={() => setShowInfoModal(false)}
            />
        </main>
    );
}