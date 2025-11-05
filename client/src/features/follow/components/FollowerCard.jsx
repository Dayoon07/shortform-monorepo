import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../..//shared/constants/Route";

export const FollowerCard = ({ follower, onToggleFollow }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center
            hover:bg-gray-700/60 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50
            min-h-[280px] max-w-[300px] mx-auto w-full hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={ROUTE.PROFILE(follower.mention)} className="mb-4 group">
                <div className="relative">
                    <img src={follower.profileImgSrc} alt={follower.username} className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 
                        cursor-pointer bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500 p-1 rounded-full object-cover 
                        group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl"
                    />
                </div>
            </Link>

            <a href={ROUTE.PROFILE(follower.mention)} className="mb-4 group text-center">
                <h2 className="text-lg md:text-xl font-semibold cursor-pointer text-white group-hover:text-blue-400 transition-colors 
                    duration-200 truncate max-w-[180px]"
                >
                    {follower.username}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                    @{follower.mention.length > 10 ? follower.mention.substring(0, 10) + '...' : follower.mention}
                </p>
            </a>

            <button type="button" onClick={() => onToggleFollow(follower.mention)} className="bg-gray-600/80 hover:bg-red-500 px-4 md:px-6 
                py-2 md:py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 w-full 
                    max-w-[160px] hover:shadow-lg hover:scale-105 text-sm md:text-base border border-gray-500/30 hover:border-red-400/50"
            >
                <span className="whitespace-nowrap">팔로우 취소</span>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};
