import { useEffect, useState } from "react";
import { insertComment, popularCommentList, recentCommentList } from "../api/commentService";
import { Comment } from "../../../entities/comment/ui/Comment";
import { showErrorToast } from "../../../shared/utils/toast";
import { CommentCreateRes } from "../../../entities/comment/ui/CommentCreateRes";

export const useComment = (vid: number) => {
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const commentWrite = async (id: number, comment: string): Promise<CommentCreateRes | undefined> => {
        const data = await insertComment(id, comment);
        
        if (!data.ok || data.data === undefined) {
            setErrorMessage(data?.error || "예상치 못한 에러 발생");
            console.log(data);
            return;
        }

        return data.data;
    }

    const getPopularCommentList = async (): Promise<void> => {
        const data = await popularCommentList(vid);
        if (!data.ok || data.data === undefined) {
            showErrorToast("댓글을 찾거나 가져올 수 없습니다");
            return;
        }
        console.log(data);
        setCommentList(data.data);
    }

    const getRecentCommentList = async (): Promise<void> => {
        const data = await recentCommentList(vid);
        if (!data.ok || data.data === undefined) {
            showErrorToast("댓글을 찾거나 가져올 수 없습니다");
            return;
        }
        console.log(data);
        setCommentList(data.data);
    }

    useEffect(() => {
        const init = async (): Promise<void> => {
            const data = await popularCommentList(vid);
            if (!data.ok || data.data === undefined) {
                showErrorToast("댓글을 찾거나 가져올 수 없습니다");
                return;
            }
            console.log(data);
            setCommentList(data.data);
        }

        init();
    }, [vid]);

    return {
        commentWrite,
        getPopularCommentList,
        getRecentCommentList,
        commentList,
        errorMessage
    }
}