import { useState } from "react";
import { commentLikeToggle, insertCommentReply, replyCommentReq } from "../api/commentService";
import { showErrorToast, showSuccessToast } from "../../../shared/utils/toast";
import { CommentReplyCreateReq } from "../../../entities/comment/ui/CommentReplyCreateReq";
import { Comment } from "../../../entities/comment/ui/Comment";

export const useCommentList = (initialComments: Comment[]) => {
    const [likeStates, setLikeStates] = useState<Record<number, boolean>>(() => {
        const initial: Record<number, boolean> = {};
        initialComments.forEach(comment => {
            initial[comment.id] = false;
        });
        return initial;
    });
    const [replyContent, setReplyContent] = useState<Record<number, Comment[]>>({});

    const commentLikeToggleHook = async (commentId: number): Promise<void> => {
        const res = await commentLikeToggle(commentId);
        if (!res.ok || res.data === undefined) {
            showErrorToast("좋아요 처리 실패");
            throw new Error(res?.error as string || "좋아요 처리 실패");
        }
        
        setLikeStates((prev) => ({
            ...prev,
            [commentId]: res.data!.status === true ? true : false
        }));
    }

    const commentReplySubmitHook = async (
        commentId: number, replyText: string
    ): Promise<void> => {
        if (!replyText.trim()) {
            showErrorToast("답글 내용을 입력해주세요");
            return;
        }

        const req: CommentReplyCreateReq = {
            commentReplyId: commentId,
            commentReplyText: replyText.trim()
        };

        const res = await insertCommentReply(req);
        if (!res.ok || res.data === undefined) {
            showErrorToast("답글 작성 실패");
            throw new Error(res?.error || "답글 작성 실패");
        }

        showSuccessToast("답글이 작성되었습니다");
    }
    const onReplyCommentReqHook = async (commentId: number) => {
        const res = await replyCommentReq(commentId);

        if (!res.ok || res.data === undefined) {
            showErrorToast(res.error);
            throw new Error(res.error || "답글 데이터를 가져올 수 없습니다");
        }

        // 각 댓글별로 답글 저장
        setReplyContent(prev => ({
            ...prev,
            [commentId]: res.data!
        }));
    }

    return {
        likeStates,
        commentLikeToggleHook,
        commentReplySubmitHook,
        onReplyCommentReqHook,
        replyContent
    }
}