import { useEffect, useState } from "react";
import { 
    getPostDetail, 
    getPostDetailComments, 
    insertPostComment, 
    insertPostCommentReply
} from "../api/postService";
import { showErrorToast } from "../../../shared/utils/toast";
import { DetailPostWithProfile } from "../../../entities/post/ui/DetailPostWithProfile";
import { PostComment } from "@/entities/post/ui/PostComment";

export const usePostDetail = (communityUuid: string | undefined) => {
    const [post, setPost] = useState<DetailPostWithProfile | null>(null);
    const [comment, setComment] = useState<PostComment[]>([]);

    const commentWriteHandler = async (communityId: number, commentText: string) => {
        const res = await insertPostComment(communityId, commentText);
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
            if (!communityUuid) {
                showErrorToast("해당 게시글을 찾을 수 없습니다");
                return;
            }

            const [postRes, commentRes] = await Promise.all([
                getPostDetail(communityUuid),
                getPostDetailComments(communityUuid)
            ]);

            if (!postRes.ok || !postRes.data) {
                showErrorToast("해당 게시글을 찾을 수 없습니다");
                throw new Error("해당 게시글을 찾을 수 없습니다");
            }
            
            if (!commentRes.ok || !commentRes.data) {
                showErrorToast("게시글에 대한 댓글을 찾을 수 없습니다");
                throw new Error("게시글에 대한 댓글을 찾을 수 없습니다");
            }

            console.log(postRes.data);
            console.log(commentRes.data);

            setPost(postRes.data);
            setComment(commentRes.data);
        };

        init();
    }, [communityUuid]);

    return { 
        post,
        comment,
        commentWriteHandler,
        commentReplyWriteHandler
    };
}