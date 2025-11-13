import { Link } from "react-router-dom";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import ToggleFollowButton from "./ui/ToggleFollowButton";
import { useUser } from "../../../shared/context/UserContext";
import { ROUTE } from "../../../shared/constants/Route";

export const FollowingCard = ({ followingUser, onToggleFollow }) => {
    const { user } = useUser();
    return (
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center
            hover:bg-gray-700/60 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50
            min-h-[280px] max-w-[300px] mx-auto w-full hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
        >
            <Link to={ROUTE.PROFILE(followingUser.mention)} className="mb-4 group">
                <div className="relative">
                    <img src={`${REST_API_SERVER}${followingUser.profileImgSrc}`} alt={followingUser.username} className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 
                        cursor-pointer bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500 p-1 rounded-full object-cover 
                        group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl"
                    />
                </div>
            </Link>

            <Link to={ROUTE.PROFILE(followingUser.mention)} className="mb-4 group text-center">
                <h2 className="text-lg md:text-xl font-semibold cursor-pointer text-white group-hover:text-blue-400 transition-colors 
                    duration-200 truncate max-w-[180px]"
                >
                    {followingUser.username}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                    @{followingUser.mention.length > 10 ? followingUser.mention.substring(0, 10) + '...' : followingUser.mention}
                </p>
            </Link>

            <ToggleFollowButton 
                followReqUser={user}
                followResUser={followingUser}
                onFollowChange={(isFollowing) => {
                    if (!isFollowing) onToggleFollow?.(followingUser.mention);
                }}
            />
        </div>
    );
};
