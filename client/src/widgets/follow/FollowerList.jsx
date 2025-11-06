import { EmptyState } from "../../features/follow/components/EmptyState";
import { FollowerCard } from "../../features/follow/components/FollowerCard";

const FollowerList = ({ followers, onToggleFollow }) => {
    // followers를 배열로 안전하게 변환
    const followerArray = Array.isArray(followers) ? followers : [];
    
    if (followerArray.length === 0) return <EmptyState />;
    
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">팔로워</h1>
                <p className="text-gray-400 text-sm md:text-base">
                    현재 <span className="text-blue-400 font-semibold">{followerArray.length}</span>명의 팔로워가 있습니다.
                </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                {followerArray.map((follower) => (
                    <FollowerCard
                        key={follower.id || follower.mention}
                        follower={follower}
                        onToggleFollow={onToggleFollow}
                    />
                ))}
            </div>
        </div>
    );
};

export default FollowerList;