import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/Route';
import { REST_API_SERVER } from '../../../shared/constants/ApiServer';
import ToggleFollowButton from '../../follow/components/ui/ToggleFollowButton';

export function VideoInfoOverlay({ video, user, isFollowing, onFollowChange }) {
    const truncate = (str, maxLen) => {
        return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
    };

    return (
        <div className="absolute left-2 md:left-6 bottom-20 md:bottom-32 space-y-2 md:space-y-3 w-2/3 md:w-1/2 z-20">
            <div className="flex items-center space-x-2 md:space-x-3">
                <Link to={ROUTE.PROFILE(video.uploader.mention)}>
                    <img
                        src={`${REST_API_SERVER}${video.uploader.profileImgSrc}`}
                        alt="프로필"
                        className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-white border-opacity-30 transition-transform hover:scale-110"
                    />
                </Link>
                
                <div style={{ maxWidth: '128px' }}>
                    <Link to={ROUTE.PROFILE(video.uploader.mention)} className="block truncate">
                        <span className="text-sm md:text-lg font-semibold hover:text-blue-300 transition-colors">
                            {truncate(video.uploader.username, 10)}
                        </span>
                    </Link>
                    <Link to={ROUTE.PROFILE(video.uploader.mention)} className="block">
                        <span className="text-xs text-gray-300 hover:text-gray-100 transition-colors">
                            {truncate(`@${video.uploader.mention}`, 10)}
                        </span>
                    </Link>
                </div>

                {user && user.id !== video.uploader.id && (
                    <ToggleFollowButton 
                        followReqUser={user} 
                        followResUser={video.uploader}
                    />
                )}
            </div>

            <h1 className="text-sm md:text-base font-medium text-white line-clamp-2">
                {video.title}
            </h1>

            {video.videoTag && (
                <div className="flex flex-wrap gap-1 md:gap-2">
                    {video.videoTag.split(' ').map((tag, index) => (
                        <Link
                            key={index}
                            to={ROUTE.HASHTAG(tag.trim())}
                            className="text-xs bg-white bg-opacity-10 text-blue-300 px-2 py-1 rounded-full cursor-pointer hover:bg-opacity-20 transition-all duration-200"
                        >
                            {tag.trim()}
                        </Link>
                    ))}
                </div>
            )}

            <p className="text-xs md:text-sm text-gray-300 line-clamp-2">
                {video.description}
            </p>
        </div>
    );
}