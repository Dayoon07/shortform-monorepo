import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../shared/context/UserContext";
import { useProfile } from "../../features/profile/hooks/useProfile";
import ProfileHeader from "../../widgets/profile/ProfileHeader";
import ProfileInfoModal from "../../widgets/profile/ProfileInfoModal";
import { Loading } from "../../shared/components/common/Loading";
import NotFoundProfile from "../../widgets/profile/NotFoundProfile";
import { CommonVideoGrid } from "../../shared/components/video/CommonVideoGrid";
import ProfilePostList from "../../widgets/profile/ProfilePostList";

enum TabTitle { VIDEO = "video", POST = "post" }

export default function ProfilePage() {
    const btcl = "px-12 py-3 font-semibold border-b-2 transition max-md:w-full";    // buttonTabClassName = btcl
    const activeTabStyle = "border-black text-black"; // 활성화 시
    const inactiveTabStyle = "border-transparent text-gray-500 hover:border-gray-300"; // 비활성화 시
    const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
    const [tab, setTab] = useState<TabTitle>(TabTitle.VIDEO); 
    const { mention } = useParams();
    const { user } = useUser();
    const {
        profile,
        posts,
        videos,
        loading,
    } = useProfile(mention, user);

    if (loading) return <Loading />;
    if (!profile) return <NotFoundProfile />;

    return (
        <main className="flex-1 overflow-y-auto">
            <ProfileHeader 
                profile={profile}
                videoCount={videos.length}
                onShowInfo={() => setShowInfoModal(true)}
            />

            <div className="border-b sticky top-0 z-10 bg-white">
                <div className="flex md:max-w-6xl md:mx-auto">
                    <button onClick={() => setTab(TabTitle.VIDEO)}
                        className={`${btcl} ${tab === TabTitle.VIDEO ? activeTabStyle : inactiveTabStyle}`}
                    >
                        동영상
                    </button>
                    <button onClick={() => setTab(TabTitle.POST)}
                        className={`${btcl} ${tab === TabTitle.POST ? activeTabStyle : inactiveTabStyle}`}
                    >
                        게시글
                    </button>
                </div>
            </div>

            {tab === TabTitle.VIDEO && (videos.length > 0 ? (
                    <CommonVideoGrid 
                        cardUploaderPublic={false}
                        videos={videos} 
                    />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400">동영상이 없습니다</p>
                    </div>
                )
            )}

            {tab === TabTitle.POST && (
                posts.length > 0 ? (
                    <ProfilePostList posts={posts} />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400">게시물이 없습니다</p>
                    </div>
                )
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