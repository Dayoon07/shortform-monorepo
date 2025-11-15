import { EmptyState } from "../../features/follow/components/EmptyState";
import { FollowingCard } from "../../features/follow/components/FollowingCard";

const FollowingList = ({ followings }) => {
    if (!(followings instanceof Array)) return <EmptyState />;
    if (followings.length === 0) return <EmptyState />;
    
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">팔로잉</h1>
                <p className="text-gray-400 text-sm md:text-base">
                    현재 <span className="text-blue-400 font-semibold">{followings.length}</span>명을 팔로잉하고 있습니다
                </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                {followings.map((follower) => (
                    <FollowingCard
                        key={follower.id || follower.mention}
                        followingUser={follower}
                    />
                ))}
            </div>
        </div>
    );
};

export default FollowingList;