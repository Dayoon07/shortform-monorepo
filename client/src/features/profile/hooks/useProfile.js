import { useEffect, useState } from "react";
import { getFollowStatus, getFollowerList, getFollowingList } from "../../follow/api/followService";
import { showErrorToast } from "../../../shared/utils/toast";
import { getProfileByMention } from "../api/profileService";
import { getUserPosts } from "../../post/api/postService";

export const useProfile = (mention, currentUser) => {
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);

    const cleanMention = mention?.replace('@', '');
    const isOwnProfile = currentUser?.mention === cleanMention;

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

    const getFollowerListHook = async () => {
        try {
            const data = await getFollowerList(profile.id);
            setFollowerList(data || []);
            console.log(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const getFollowingListHook = async () => {
        try {
            const data = await getFollowingList(profile.id);
            setFollowingList(data || []);
            console.log(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const fetchProfilePosts = async () => {
        if (!cleanMention) return;
        
        try {
            const userPosts = await getUserPosts(cleanMention);
            setPosts(userPosts || []);
        } catch (error) {
            console.error('게시글 불러오기 실패:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
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
                    setIsFollowing(followStatus);
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
        followerList,
        followingList,
        fetchProfilePosts,
        getFollowerListHook,
        getFollowingListHook
    };
};