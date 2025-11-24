import { useState, useEffect } from "react";
import { upgradeToggleFollow, getFollowStatus } from "../api/followService";
import { showErrorToast, showSuccessToast } from "../../../shared/utils/toast";
import { User } from "../../../entities/user/model/User";

export const useToggleFollow = (followReqUser: User, followResUser: User) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [messageData, setMessageData] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // 초기 팔로우 상태 가져오기
    useEffect(() => {
        const fetchFollowStatus = async (): Promise<void> => {
            if (!followResUser?.mention) return;
            
            try {
                const result = await getFollowStatus(followReqUser.mention, followResUser.mention);
                if (result && result.data) {
                    setIsFollowing(result.data.isFollowing || false);
                }
            } catch (error) {
                console.error("팔로우 상태 조회 실패:", error);
            }
        };

        fetchFollowStatus();
    }, [followReqUser?.mention, followResUser?.mention]);

    const toggleFollow = async (): Promise<boolean> => {
        if (!followReqUser?.mention || !followResUser?.mention) {
            setMessageData("사용자 정보가 올바르지 않습니다.");
            showErrorToast("사용자 정보가<br className='md:hidden'/>올바르지 않습니다");
            return false;
        }

        setLoading(true);
        try {
            const { data } = await upgradeToggleFollow(followReqUser.mention, followResUser.mention);
            console.log(data);
            
            if (data.success) {
                setIsFollowing(prev => !prev);
                setMessageData(data.message);
                showSuccessToast(data.message);
                return data.isFollowing;
            } else {
                setMessageData(data.message || "팔로우 처리에 실패했습니다.");
                return data.isFollowing;
            }
        } catch (error) {
            console.error(error);
            setMessageData(`데이터 불러오기 실패: ${(error as Error).message}`);
            showErrorToast(`데이터 불러오기 실패: ${(error as Error).message}`);
            throw error;
        } finally {
            setLoading(false);
            console.log(messageData);
        }
    };

    return {
        isFollowing,
        messageData,
        loading,
        toggleFollow
    };
};