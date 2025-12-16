import { Link } from "react-router-dom";
import ToggleFollowButton from "./ui/ToggleFollowButton";
import { useUser } from "../../../shared/context/UserContext";
import { ROUTE } from "../../../shared/constants/Route";
import { User } from "../../../entities/user/model/User";
import { Image } from "../../../shared/components/common/custom/Image";

interface FollowingRowProps {
    followingUser: User,
    onToggleFollow?: (pm: string) => void
}

export const FollowingRow = ({ followingUser, onToggleFollow }: FollowingRowProps) => {
    const { user } = useUser();
    
    return (
        <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-gray-200 
            hover:bg-gray-100 transition-colors duration-200"
        >
            <Link to={ROUTE.PROFILE(followingUser.mention)} className="flex items-center flex-grow min-w-0">
                <Image
                    url={followingUser.profileImgSrc}
                    alt={followingUser.username}
                    social={followingUser.social}
                    className="w-12 h-12 border-gray-300 border rounded-full object-cover mr-4 flex-shrink-0"
                />
                <div className="flex flex-col overflow-hidden">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {followingUser.username}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                        @{followingUser.mention}
                    </p>
                </div>
            </Link>

            {/* 팔로우 버튼 */}
            <div className="ml-4 flex-shrink-0">
                <ToggleFollowButton 
                    followReqUser={user}
                    followResUser={followingUser}
                    onFollowChange={(isFollowing) => {
                        if (!isFollowing) onToggleFollow?.(followingUser.mention);
                    }}
                />
            </div>
        </div>
    );
};