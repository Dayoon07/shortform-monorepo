import { useEffect, useState } from "react";
import { insertComment, popularCommentList, recentCommentList } from "../api/commentService";
import { Comment } from "../../../entities/comment/ui/Comment";

export const useComment = (videoId: number) => {
    const [commentSuccessMessage, setCommentSuccessMessage] = useState<string>("");
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const commentWrite = async (commentVideoId: number, commentText: string, resUserMention: string) => {
        try {
            const formData = new FormData();
            formData.append('commentVideoId', commentVideoId.toString());
            formData.append('commentText', commentText);
            formData.append('resUserMention', resUserMention);

            const data = await insertComment(formData);
            console.log(data);
            setCommentSuccessMessage(data);
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
        commentSuccessMessage,
        commentList,
        errorMessage
    }
}