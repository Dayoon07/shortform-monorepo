import { useCallback, useEffect, useState } from "react";
import { getFollowerList, getFollowingList } from "../api/followService";
import { showErrorToast } from "../../../shared/utils/toast";
import { User } from "../../../entities/user/model/User";

export const useFollow = (user: User | null) => {
    const userId = user?.id ?? null;

    const [followers, setFollowers] = useState<User[]>([]);
    const [followings, setFollowings] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<(string | any) | null>(null);

    const loadFollowers = useCallback(async () => {
        if (!userId) return;  // user 없으면 실행 안 함

        setLoading(true);
        try {
            const data = await getFollowerList(userId);
            if (data.data === undefined) {
                setFollowers([]);
                setError("팔로워 데이터를 찾을 수 없습니다");
            }                
            setFollowers(data.data || []);
            setError(null);
        } catch (error) {
            setError(error);
            showErrorToast(`팔로워 목록을 불러오는데 실패했습니다<br />${error}`);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const loadFollowings = useCallback(async () => {
        if (!userId) return; // user 없으면 실행 안 함

        setLoading(true);
        try {
            const data = await getFollowingList(userId);
            if (data === undefined) {
                setFollowings([]);
                setError("팔로잉 데이터를 찾을 수 없습니다");
            }
            setFollowings(data.data || []);
            setError(null);
        } catch (error) {
            setError(error);
            showErrorToast(`팔로잉 목록을 불러오는데 실패했습니다<br />${error}`);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) return; // 로그인 안 되었으면 API 불러오지 않음
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
