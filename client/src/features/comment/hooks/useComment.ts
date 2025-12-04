import { useEffect, useState } from "react";
import { insertComment, popularCommentList, recentCommentList } from "../api/commentService";
import { Comment } from "../../../entities/comment/ui/Comment";

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
            console.log(data);
            setCommentList(data);
        } catch (error) {
            setErrorMessage(error as string);
            console.error(error);
            throw error;
        }
    }

    const getRecentCommentList = async (): Promise<void> => {
        try {
            const data = await recentCommentList(videoId);
            console.log(data);
            setCommentList(data);
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
                console.log(data);
                setCommentList(data);
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