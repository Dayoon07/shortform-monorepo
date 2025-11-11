import { useState, useEffect } from "react";
import { upgradeToggleFollow, getFollowStatus } from "../api/followService";

export const useToggleFollow = (followReqUser, followResUser) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [messageData, setMessageData] = useState("");
    const [loading, setLoading] = useState(false);

    // 초기 팔로우 상태 가져오기
    useEffect(() => {
        const fetchFollowStatus = async () => {
            if (!followResUser?.mention) return;
            
            try {
                const result = await getFollowStatus(followResUser.mention);
                if (result && result.data) {
                    setIsFollowing(result.data.isFollowing || false);
                }
            } catch (error) {
                console.error("팔로우 상태 조회 실패:", error);
            }
        };

        fetchFollowStatus();
    }, [followResUser?.mention]);

    const toggleFollow = async () => {
        if (!followReqUser?.mention || !followResUser?.mention) {
            setMessageData("사용자 정보가 올바르지 않습니다.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await upgradeToggleFollow(followReqUser.mention, followResUser.mention);
            console.log(data);
            
            if (data.success) {
                setIsFollowing(prev => !prev);
                setMessageData(data.message);
            } else {
                setMessageData(data.message || "팔로우 처리에 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            setMessageData(`데이터 불러오기 실패: ${error.message}`);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        isFollowing,
        messageData,
        loading,
        toggleFollow
    };
};