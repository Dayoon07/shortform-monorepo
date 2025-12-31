import { ROUTE } from "../../../shared/constants/Route";
import { Comment } from "../../../entities/comment/ui/Comment";
import { CommentCreateRes } from "../../../entities/comment/ui/CommentCreateRes";
import { useNavigate } from "react-router-dom";
import { useCommentList } from "../hooks/useCommentList";
import { CommentCreateResItem, CommentItem } from "./ui/CommentListItem";
import { useState } from "react";

interface CommentListProps {
    commentList: Comment[];
    createdComments?: CommentCreateRes[]; // 배열로 변경
}

export function CommentList({ commentList, createdComments = [] }: CommentListProps) {
    const navigate = useNavigate();
    const [actReplyId, setActReplyId] = useState<number | null>(null);
    const handleProfileClick = (mention: string) => navigate(ROUTE.PROFILE(mention));
    
    const { 
        likeStates, 
        commentLikeToggleHook,
        commentReplySubmitHook,
        onReplyCommentReqHook,
        replyContent
    } = useCommentList(commentList); // commentList 전달

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

    const onReplyCommentReq = async (id: number) => {
        await onReplyCommentReqHook(id);
        console.log(replyContent);
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
                    <CommentItem 
                        key={comment.id}
                        comment={comment} 
                        onProfileClick={() => handleProfileClick(comment.mention)} 
                        onLike={commentLikeToggleHandler}
                        onReplySubmit={commentReplySubmitHandler}
                        likeYn={!!likeStates[comment.id]}
                        isReplyOpen={actReplyId === comment.id}
                        onReplyClick={() => handleReplyClick(comment.id)}
                        onReplyClose={handleReplyClose}
                        onReplyCommentReq={(id: number) => onReplyCommentReq(comment.id)}
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