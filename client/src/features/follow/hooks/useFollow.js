import { useCallback, useEffect, useState } from "react";
import { getFollowerList, getFollowingList } from "../api/followService";
import { showToast } from "../../../shared/utils/FollowShowToast";

export const useFollow = (user) => {
    const userId = user?.id ?? null;

    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadFollowers = useCallback(async () => {
        if (!userId) return;  // 🚨 user 없으면 실행 안 함

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

    const loadFollowings = useCallback(async () => {
        if (!userId) return; // 🚨 user 없으면 실행 안 함

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
        if (!userId) return; // 🚨 로그인 안 되었으면 API 불러오지 않음
        loadFollowers();
        loadFollowings();
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
