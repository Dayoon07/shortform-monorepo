import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/Route';
import ToggleFollowButton from '../../follow/components/ui/ToggleFollowButton';
import { Image } from '../../../shared/components/common/custom/Image';
import { RandomVideoSwipe } from '../../../entities/video/ui/RandomVideoSwipe';
import { User } from '../../../entities/user/model/User';

interface VideoInfoOverlayProps {
    video: RandomVideoSwipe,
    user: User | null,
    isFollowing: boolean,
    onFollowChange: Dispatch<SetStateAction<boolean>>
}

export function VideoInfoOverlay({ 
    video, user, isFollowing, onFollowChange
}: VideoInfoOverlayProps) {
    const truncate = (t: string, l: number) => 
        t.length > l ? t.substring(0, l) + "..." : t;

    return (
        <div className="absolute left-2 md:left-6 bottom-20 md:bottom-32 space-y-2 md:space-y-3 w-2/3 md:w-1/2 z-20">
            <div className="flex items-center space-x-2 md:space-x-3">
                <Link to={ROUTE.PROFILE(video.video.uploader.mention)}>
                    <Image 
                        url={video.video.uploader.profileImgSrc} 
                        alt='프로필'
                        className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-white 
                            border-opacity-30 transition-transform hover:scale-110"
                        social={video.video.uploader.social}
                    />
                </Link>
                
                <div style={{ maxWidth: '128px' }}>
                    <Link to={ROUTE.PROFILE(video.video.uploader.mention)} className="block truncate">
                        <span className="text-sm md:text-lg font-semibold hover:underline transition-colors">
                            {truncate(video.video.uploader.username, 10)}
                        </span>
                    </Link>
                    <Link to={ROUTE.PROFILE(video.video.uploader.mention)} className="block">
                        <span className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                            {truncate(`@${video.video.uploader.mention}`, 10)}
                        </span>
                    </Link>
                </div>

                {user && user.id !== video.video.uploader.id && (
                    <ToggleFollowButton 
                        followReqUser={user} 
                        followResUser={video.video.uploader}
                    />
                )}
            </div>

            <h1 className="text-sm md:text-base font-medium line-clamp-2">
                {video.video.videoTitle}
            </h1>

            {video.video.videoTag && (
                <div className="flex flex-wrap gap-1 md:gap-2">
                    {video.video.videoTag.split(' ').map((tag, index) => (
                        <Link
                            key={index}
                            to={ROUTE.HASHTAG(tag.trim())}
                            className="text-xs bg-gray-200 text-blue-400 py-1 px-3 rounded-full 
                                cursor-pointer hover:bg-opacity-20 transition-all duration-200"
                        >
                            {tag.trim()}
                        </Link>
                    ))}
                </div>
            )}

            <p className="text-xs md:text-sm text-gray-400 line-clamp-2">
                {video.video.videoDescription}
            </p>
        </div>
    );
}