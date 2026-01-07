import { useEffect, useState } from "react";
import { 
    getPostDetail, 
    getPostDetailComments, 
    insertPostComment, 
    insertPostCommentReply
} from "../api/postService";
import { showErrorToast } from "../../../shared/utils/toast";
import { DetailPostWithProfile } from "../../../entities/post/ui/DetailPostWithProfile";

export const usePostDetail = (communityUuid: string | undefined) => {
    const [post, setPost] = useState<DetailPostWithProfile | null>(null);
    const [comment, setComment] = useState<any[]>([]);

    const commentWriteHandler = async (cuuid: string | undefined) => {
        const res = await insertPostComment(cuuid);
        if (!res.ok || res.data === undefined) throw new Error("에러: " + res.data);
        return res.data;
    }

    const commentReplyWriteHandler = async (commentId: number) => {
        const res = await insertPostCommentReply(commentId);
        if (!res.ok || res.data === undefined) throw new Error("에러: " + res.data);
        return res.data;
    }

    useEffect(() => {
        const init = async () => {
            if (communityUuid === undefined) {
                showErrorToast("해당 게시글을 찾을 수 없습니다");
                return;
            }
            
            const [post, comment] = await Promise.all([
                getPostDetail(communityUuid),
                getPostDetailComments(communityUuid)
            ]);

            if (!post.ok || post.data === undefined) 
                throw new Error("해당 게시글을 찾을 수 없습니다: " + post.data);
            if (!comment || comment.data === undefined) 
                throw new Error("게시글에 대한 댓글을 찾을 수 없습니다: " + comment.data);

            setPost(post.data);
            setComment(comment.data);
        }
        init();
    }, [communityUuid]);

    return { 
        post,
        comment,
        commentWriteHandler,
        commentReplyWriteHandler
    };
}