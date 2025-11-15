import { useCallback, useEffect, useState } from "react";
import { getFollowerList, getFollowingList } from "../api/followService";
import { showToast } from "../../../shared/utils/FollowShowToast";

export const useFollow = (userId) => {
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 팔로워 목록 로드
    const loadFollowers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getFollowerList(userId);
            setFollowers(data || []);
            setError(null);
        } catch (err) {
            setError(err.message);
            showToast("팔로워 목록을 불러오는데 실패했습니다.", "error");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    // 팔로잉 목록 로드
    const loadFollowings = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getFollowingList(userId);
            setFollowings(data || []);
            setError(null);
        } catch (err) {
            setError(err.message);
            showToast("팔로잉 목록을 불러오는데 실패했습니다.", "error");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            loadFollowers();
            loadFollowings();
        }
    }, [userId, loadFollowers, loadFollowings]);

    return {
        followers,
        followings,
        loading,
        error,
        reloadFollowers: loadFollowers,
        reloadFollowings: loadFollowings,
    };
};
