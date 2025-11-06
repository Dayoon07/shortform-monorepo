import { useCallback, useEffect, useState } from "react";
import { toggleFollow, getFollowerList } from "../api/followService";
import { showToast } from "../../../shared/utils/FollowShowToast";

export const useFollow = (userId) => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadFollowers = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getFollowerList(userId);
            setFollowers(data || []);
            setError(null);
        } catch (err) {
            setError(err.message);
            showToast('팔로워 목록을 불러오는데 실패했습니다', 'error');
        } finally {
            setLoading(false);
        }
    });

    const handleToggleFollow = async (mention) => {
        try {
            const result = await toggleFollow(mention);
            
            if (result.success) {
            // 팔로우 상태가 변경되면 목록 새로고침
            await loadFollowers();
            showToast(result.message || '팔로우 상태가 변경되었습니다');
            } else {
            showToast(result.message || '작업에 실패했습니다', 'error');
            }
        } catch (err) {
            showToast('팔로우 변경에 실패했습니다', 'error');
        }
    };

    useEffect(() => {
        if (userId) loadFollowers();
    }, [loadFollowers, userId]);

    return { followers, loading, error, handleToggleFollow };
};