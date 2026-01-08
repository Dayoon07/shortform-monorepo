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
            if (communityUuid === undefined) {
                showErrorToast("해당 게시글을 찾을 수 없습니다");
                return;
            }
            
            const res1 = await getPostDetail(communityUuid);

            if (!res1.ok || res1.data === undefined) 
                throw new Error("해당 게시글을 찾을 수 없습니다: " + res1.data);

            const res2 = await getPostDetailComments(res1.data?.id);

            if (!res2 || res2.data === undefined) 
                throw new Error("게시글에 대한 댓글을 찾을 수 없습니다: " + res2.data);

            setPost(res1.data);
            setComment(res2.data);
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