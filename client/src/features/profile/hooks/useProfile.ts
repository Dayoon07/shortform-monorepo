import { useCallback, useEffect, useState } from "react";
import { getFollowStatus, getFollowerList, getFollowingList } from "../../follow/api/followService";
import { getProfileByMention } from "../api/profileService";
import { getUserPosts } from "../../post/api/postService";
import { User } from "../../../entities/user/model/User";
import { Post } from "../../../entities/post/ui/Post";
import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";
import { Profile } from "../../../entities/profile/model/Profile";
import { FollowStatusRes } from "../../../entities/follow/ui/FollowStatusRes";

export const useProfile = (mention: string | undefined, currentUser: User | null) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [videos, setVideos] = useState<VideoGridContent[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFollowing, setIsFollowing] = useState<FollowStatusRes | boolean | undefined>(false);
    const cleanMention: string | undefined = mention?.replace('@', '');
    const isOwnProfile: boolean = currentUser?.mention === cleanMention;

    const getFollowerListHook = async (): Promise<User[]> => {
        if (!profile) throw new Error("로그인이 필요한 기능입니다");
        const res = await getFollowerList(profile.id);
        if (res.data === undefined) throw new Error("팔로워 데이터를 찾을 수 없습니다");
        return res.data;
    }

    const getFollowingListHook = async (): Promise<User[]> => {
        if (!profile) throw new Error("로그인이 필요한 기능입니다");
        const r = await getFollowingList(profile.id);
        if (r.data === undefined) throw new Error("팔로잉 데이터를 찾을 수 없습니다");
        return r.data;
    }

    const fetchProfilePosts = async (): Promise<void> => {
        if (!cleanMention) return;
        const userPosts = await getUserPosts(cleanMention);
        setPosts(userPosts || []);
    };

    const setupLoadData = useCallback(async (): Promise<void> => {
        if (!cleanMention) return;
        setLoading(true);

        const [profileData, postData] = await Promise.all([
            getProfileByMention(cleanMention),
            getUserPosts(cleanMention)
        ]);
        
        if (!profileData) throw new Error("프로필 데이터를 불러올 수 없습니다.");
        
        setProfile(profileData.profileInfo);
        setVideos(profileData.profileVideosInfo);
        setPosts(postData);

        if (currentUser != null && !isOwnProfile) {
            const a = await getFollowStatus(currentUser.mention, `@${cleanMention}`);
            setIsFollowing(a.data);
        }
        setLoading(false);
    }, [cleanMention, currentUser, isOwnProfile]);

    useEffect(() => {
        setupLoadData();
    }, [setupLoadData]);

    return {
        profile, 
        videos, 
        posts, 
        loading, 
        isFollowing,
        isOwnProfile,
        fetchProfilePosts,
        getFollowerListHook,
        getFollowingListHook
    };
};