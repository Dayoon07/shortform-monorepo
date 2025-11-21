import { useEffect, useState } from "react";
import { insertComment, popularCommentList } from "../api/commentService";

export const useComment = (videoId) => {
    const [commentSuccessMessage, setCommentSuccessMessage] = useState(null);
    const [commentList, setCommentList] = useState([]);

    const commentWrite = async (commentVideoId, commentText, resUserMention) => {
        try {
            const formData = new FormData();
            formData.append('commentVideoId', commentVideoId);
            formData.append('commentText', commentText);
            formData.append('resUserMention', resUserMention);

            const data = await insertComment(formData);
            console.log(data);
            setCommentSuccessMessage(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        const getPopularCommentList = async () => {
            try {
                const data = await popularCommentList(videoId);
                console.log(data);
                setCommentList(data);
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        getPopularCommentList();
    }, [videoId]);

    return {
        commentWrite,
        commentSuccessMessage,
        commentList
    }
}