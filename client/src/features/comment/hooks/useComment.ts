import { useEffect, useState } from "react";
import { insertComment, popularCommentList, recentCommentList } from "../api/commentService";
import { Comment } from "../../../entities/comment/ui/Comment";
import { showErrorToast } from "../../../shared/utils/toast";

export const useComment = (videoId: number) => {
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    /**
     * @param id 댓글을 작성할 영상의 id
     * @param comment 댓글
     * @param m 댓글을 작성할 사용자의 멘션
     */
    const commentWrite = async (id: number, comment: string, m: string) => {
        try {
            const formData = new FormData();
            formData.append('commentVideoId', id.toString());
            formData.append('commentText', comment);
            formData.append('resUserMention', m);

            const data = await insertComment(formData);
            return data;
        } catch (error) {
            setErrorMessage(error as string);
            console.error(error);
            throw error;
        }
    }

    const getPopularCommentList = async (): Promise<void> => {
        try {
            const data = await popularCommentList(videoId);
            if (data.data === undefined) {
                showErrorToast("댓글을 찾거나 가져올 수 없습니다");
                return;
            }
            console.log(data);
            setCommentList(data.data);
        } catch (error) {
            setErrorMessage(error as string);
            console.error(error);
            throw error;
        }
    }

    const getRecentCommentList = async (): Promise<void> => {
        try {
            const data = await recentCommentList(videoId);
            if (data.data === undefined) {
                showErrorToast("댓글을 찾거나 가져올 수 없습니다");
                return;
            }
            console.log(data);
            setCommentList(data.data);
        } catch (error) {
            setErrorMessage(error as string);
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        const getPopularCommentListBootLoaderVer = async (): Promise<void> => {
            try {
                const data = await popularCommentList(videoId);
                if (data.data === undefined) {
                    showErrorToast("댓글을 찾거나 가져올 수 없습니다");
                    return;
                }
                console.log(data);
                setCommentList(data.data);
            } catch (error) {
                setErrorMessage(error as string);
                console.error(error);
                throw error;
            }
        }

        getPopularCommentListBootLoaderVer();
    }, [videoId]);

    return {
        commentWrite,
        getPopularCommentList,
        getRecentCommentList,
        commentList,
        errorMessage
    }
}