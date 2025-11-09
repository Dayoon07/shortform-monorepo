import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/Route';
import { REST_API_SERVER } from '../../../shared/constants/ApiServer';
import { toggleFollow } from '../../follow/api/followService';

export function VideoInfoOverlay({ video, user, isFollowing, onFollowChange }) {
    const [following, setFollowing] = React.useState(isFollowing);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const handleFollow = async () => {
        if (!user) {
            alert('로그인이 필요한 기능입니다.');
            return;
        }

        if (isProcessing) return;

        setIsProcessing(true);
        try {
            await toggleFollow(video.uploader.mention);
            setFollowing(!following);
            onFollowChange?.(!following);
        } catch (error) {
            console.error('팔로우 처리 실패:', error);
        } finally {
            setIsProcessing(false);
        }
    };

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
                    <button
                        onClick={handleFollow}
                        disabled={isProcessing}
                        className={`px-4 md:px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 text-xs md:text-sm ${
                            following
                                ? 'bg-gray-600 hover:bg-red-600'
                                : 'bg-gradient-to-r from-pink-500 to-sky-500 hover:from-pink-600 hover:to-sky-600'
                        }`}
                    >
                        <span>{following ? '팔로잉' : '팔로우'}</span>
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {following ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            )}
                        </svg>
                    </button>
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