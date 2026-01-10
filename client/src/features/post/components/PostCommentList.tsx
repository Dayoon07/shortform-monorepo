import { ROUTE } from "../../../shared/constants/Route";
import { CommentCreateRes } from "../../../entities/comment/ui/CommentCreateRes";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { usePostCommentList } from "../hooks/usePostCommentList";
import { PostComment } from "@/entities/post/ui/PostComment";
import { CommentCreateResItem } from "@/features/comment/components/ui/CommentListItem";
import { showSuccessToast } from "@/shared/utils/toast";
import { PostCommentItem } from "./ui/PostCommentListItem";

interface PostCommentListProps {
    commentList: PostComment[];
    f1: (p: number) => void;
    createdComments?: CommentCreateRes[]; // 배열로 변경
}

export const PostCommentList: React.FC<PostCommentListProps> = ({
    commentList, createdComments = [], f1
}) => {
    const navigate = useNavigate();
    const [actReplyId, setActReplyId] = useState<number | null>(null);
    const handleProfileClick = (mention: string) => navigate(ROUTE.PROFILE(mention));
    const { 
        likeStates, 
        commentLikeToggleHook,
        commentReplySubmitHook,
        onReplyCommentReqHook,
        replyContent
    } = usePostCommentList(commentList); // commentList 전달

    const handleReplyClick = (cid: number) => {
        actReplyId === cid ? setActReplyId(null) : setActReplyId(cid);
    };

    const handleReplyClose = () => {
        setActReplyId(null);
    };

    const commentLikeToggleHandler = (cid: number) => {
        commentLikeToggleHook(cid);
    }

    const commentReplySubmitHandler = async (commentId: number, replyText: string) => {
        await commentReplySubmitHook(commentId, replyText);
        handleReplyClose();
    }

    const onReplyCommentReq = async (commentId: number) => {
        await onReplyCommentReqHook(commentId);
        console.log(replyContent[commentId] || []);
    }
    
    const crwHandler = async (cid: number) => {
        console.log("커뮤니티 게시글의 댓글의 답글 작성 요청");
        const data = await f1(cid);
        console.log(data);
        showSuccessToast(data);
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {createdComments.map((comment, index) => (
                <CommentCreateResItem 
                    key={`created-${index}-${Date.now()}`}
                    comment={comment} 
                    onProfileClick={() => handleProfileClick(comment.userObj.mention)}
                />
            ))}

            {commentList.length > 0 ? (
                commentList.map((comment) => (
                    <PostCommentItem 
                        key={comment.id}
                        comment={comment} 
                        onProfileClick={() => handleProfileClick(comment.mention)} 
                        onLike={commentLikeToggleHandler}
                        onReplySubmit={commentReplySubmitHandler}
                        likeYn={!!likeStates[comment.id]}
                        isReplyOpen={actReplyId === comment.id}
                        onReplyClick={() => handleReplyClick(comment.id)}
                        onReplyClose={handleReplyClose}
                        onReplyCommentReq={() => onReplyCommentReq(comment.id)}
                        replies={replyContent[comment.id] || []}
                    />
                ))
            ) : (
                createdComments.length === 0 && (
                    <p className="text-gray-400 text-center">댓글이 없습니다.</p>
                )
            )}
        </div>
    );
}