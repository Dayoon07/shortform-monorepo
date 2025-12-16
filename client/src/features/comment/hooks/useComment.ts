import { useEffect, useState } from "react";
import { insertComment, popularCommentList, recentCommentList } from "../api/commentService";
import { Comment } from "../../../entities/comment/ui/Comment";
import { showErrorToast } from "../../../shared/utils/toast";

export const useComment = (vid: number) => {
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const commentWrite = async (id: number, comment: string) => {
        const formData = new FormData();
        formData.append('commentVideoId', id.toString());
        formData.append('commentText', comment);
        const data = await insertComment(formData);
        
        if (!data.ok || data.data === undefined) {
            setErrorMessage(data.data);
            console.log(data.data);
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