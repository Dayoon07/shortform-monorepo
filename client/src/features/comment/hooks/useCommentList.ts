import { useState } from "react";
import { showErrorToast } from "../../../shared/utils/toast";
import { commentLikeToggle } from "../api/commentService";

export const useCommentList = () => {
    const [commentLikeYn, setCommentLikeYn] = useState<boolean | null>(null);

    const commentLikeToggleHook = async (commentId: number) => {
        const res = await commentLikeToggle(commentId);
        if (!res.ok || res.data === undefined) {
            showErrorToast(res);
            throw new Error(res?.error);
        }
        setCommentLikeYn(res.data);
    }

    return {
        commentLikeYn,
        commentLikeToggleHook
    }
}