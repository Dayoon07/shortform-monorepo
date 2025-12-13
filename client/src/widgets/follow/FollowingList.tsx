import { User } from "../../entities/user/model/User";
import { EmptyState } from "../../features/follow/components/EmptyState";
import { FollowingRow } from "../../features/follow/components/FollowingRow";

const FollowingList = ({ followings }: { followings: User[] }) => {
    if (!(followings instanceof Array) || followings.length === 0) return <EmptyState />;
    
    return (
        <div className="md:max-w-4xl md:mx-auto p-4"> {/* Row 형식은 최대 너비를 줄여 중앙 정렬 */}
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">팔로잉</h1>
                <p className="text-gray-500 text-base">
                    현재 <span className="text-blue-600 font-bold">{followings.length}</span>명을 팔로잉하고 있습니다
                </p>
            </div>
            
            <div className="flex flex-col gap-3"> {/* 행 간의 간격 */}
                {followings.map((follower) => (
                    <FollowingRow
                        key={follower.id || follower.mention}
                        followingUser={follower}
                    />
                ))}
            </div>
        </div>
    );
};

export default FollowingList;