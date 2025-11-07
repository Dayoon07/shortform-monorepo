import { useCallback, useEffect, useState } from "react";
import { toggleFollow, getFollowerList, getFollowingList } from "../api/followService";
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

    // 팔로우 토글
    const handleToggleFollow = useCallback(async (mention) => {
        try {
            const result = await toggleFollow(mention);
            if (result.success) {
                await loadFollowers(); // 목록 새로고침
                showToast(result.message || "팔로우 상태가 변경되었습니다.");
            } else {
                showToast(result.message || "작업에 실패했습니다.", "error");
            }
        } catch (err) {
            showToast("팔로우 변경에 실패했습니다.", "error");
        }
    }, [loadFollowers]);

    // userId 바뀔 때마다 자동 로드
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
        handleToggleFollow,
        reloadFollowers: loadFollowers,
        reloadFollowings: loadFollowings,
    };
};
