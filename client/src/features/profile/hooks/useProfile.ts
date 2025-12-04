import { useEffect, useState } from "react";
import { getFollowStatus, getFollowerList, getFollowingList } from "../../follow/api/followService";
import { showErrorToast } from "../../../shared/utils/toast";
import { getProfileByMention } from "../api/profileService";
import { getUserPosts } from "../../post/api/postService";
import { User } from "../../../entities/user/model/User";
import { Post } from "../../../entities/post/ui/Post";
import { ProfileInfo } from "../../../entities/profile/ui/ProfileInfo";
import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";

export const useProfile = (mention: string | undefined, currentUser: User | null) => {
    const [profile, setProfile] = useState<ProfileInfo | null>(null);
    const [videos, setVideos] = useState<VideoGridContent[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const cleanMention: string | undefined = mention?.replace('@', '');
    const isOwnProfile: boolean = currentUser?.mention === cleanMention;

    // const handleToggleFollow = async () => {
    //     if (!cleanMention) return;
        
    //     try {
    //         const data = await toggleFollow(cleanMention);
    //         setIsFollowing(prev => !prev);
    //         showSuccessToast(data);
    //         return data;
    //     } catch (error) {
    //         showErrorToast(isFollowing ? '언팔로우에 실패했습니다.' : '팔로우에 실패했습니다.');
    //         console.error(error);
    //     }
    // };

    const getFollowerListHook = async (): Promise<User[]> => {
        try {
            if (!profile) throw new Error("로그인이 필요한 기능입니다");
            return await getFollowerList(profile.id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const getFollowingListHook = async (): Promise<User[]> => {
        try {
            if (!profile) throw new Error("로그인이 필요한 기능입니다");
            return await getFollowingList(profile.id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const fetchProfilePosts = async (): Promise<void> => {
        if (!cleanMention) return;
        
        try {
            const userPosts = await getUserPosts(cleanMention);
            setPosts(userPosts || []);
        } catch (error) {
            console.error('게시글 불러오기 실패:', error);
        }
    };

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            if (!cleanMention) return;
            
            setLoading(true);
            try {
                const [profileData, postData] = await Promise.all([
                    getProfileByMention(cleanMention),
                    getUserPosts(cleanMention)
                ]);
                
                setProfile(profileData.profileInfo);
                setVideos(profileData.profileVideosInfo);
                setPosts(postData);

                // 팔로우 상태 확인 (본인 프로필이 아닐 때만)
                if (currentUser && !isOwnProfile) {
                    const followStatus = await getFollowStatus(currentUser.mention, cleanMention);
                    setIsFollowing(followStatus.isFollowing);
                }
            } catch (error) {
                console.error('프로필 불러오기 실패:', error);
                showErrorToast('프로필을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [cleanMention, currentUser, isOwnProfile, mention]);

    return {
        profile, 
        videos, 
        posts, 
        loading, 
        isFollowing,
        isOwnProfile,
        // handleToggleFollow,
        fetchProfilePosts,
        getFollowerListHook,
        getFollowingListHook
    };
};