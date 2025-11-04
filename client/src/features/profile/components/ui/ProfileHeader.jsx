import { REST_API_SERVER } from "../../../../shared/constants/ApiServer";

export default function ProfileHeader({ profile, isOwnProfile, onShowInfo }) {
    return (
        <div className="flex flex-col sm:flex-row sm:space-x-6 mb-4 p-6 sm:items-center">
            <div className="max-sm:flex max-sm:justify-center mb-4 sm:mb-0">
                <img 
                    src={`${REST_API_SERVER}${profile.profileImgSrc}`}
                    alt="프로필" 
                    className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover p-1 bg-gradient-to-r from-pink-500 to-sky-500" 
                />
            </div>
            
            <div className="space-y-2 max-sm:text-center flex-1">
                <div>
                    <h1 className="text-3xl font-semibold">{profile.username}</h1>
                    <div className="flex space-x-4 max-sm:justify-center mt-1">
                        <small className="font-semibold">@{profile.mention}</small>
                        <small 
                            className="text-gray-400 hover:underline cursor-pointer" 
                            onClick={onShowInfo}
                        >
                            더보기
                        </small>
                    </div>
                </div>
                
                <div className="flex space-x-4 max-sm:justify-center">
                    <div>
                        <span className="text-lg font-semibold">{profile.followingCount || 0}</span>{' '}
                        <span className="text-gray-500 hover:underline cursor-pointer">팔로잉</span>
                    </div>
                    <div>
                        <span className="text-lg font-semibold">{profile.followerCount || 0}</span>{' '}
                        <span className="text-gray-500 hover:underline cursor-pointer">팔로워</span>
                    </div>
                    <div>
                        <span className="text-lg font-semibold">{profile.videoCount || 0}</span>{' '}
                        <span className="text-gray-500">동영상</span>
                    </div>
                </div>
                
                {profile.bio && (
                    <p className="text-sm text-gray-300">
                        {profile.bio.length > 21 ? profile.bio.substring(0, 20) + '...' : profile.bio}
                    </p>
                )}
            </div>
        </div>
    );
}