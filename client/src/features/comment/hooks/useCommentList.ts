import { useState } from "react";
import { showErrorToast } from "../../../shared/utils/toast";
import { commentLikeToggle } from "../api/commentService";

export const useCommentList = () => {
    const [likeStates, setLikeStates] = useState<Record<number, boolean>>({});

    const commentLikeToggleHook = async (commentId: number): Promise<void> => {
        const res = await commentLikeToggle(commentId);
        if (!res.ok || res.data === undefined) {
            showErrorToast(res);
            throw new Error(res?.error);
        }
        console.log(res);
        setLikeStates((prev) => ({
            ...prev,
            [commentId]: !prev[commentId], // 해당 ID의 상태만 반전
        }));
    }

    return {
        likeStates,
        commentLikeToggleHook
    }
}