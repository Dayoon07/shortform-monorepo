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
const navi = useNavigate();
    const [actReplyId, setActReplyId] = useState<number | null>(null); // 현재 열린 답글 입력창의 댓글 ID
    const handleProfileClick = (mention: string) => navi(ROUTE.PROFILE(mention));
    const { 
        likeStates, 
        commentLikeToggleHook
    } = useCommentList();

    // 답글 버튼 클릭 핸들러
    const handleReplyClick = (cid: number) => {
        actReplyId === cid ? setActReplyId(null) : setActReplyId(cid);
    };

    // 답글 닫기 핸들러
    const handleReplyClose = () => {
        setActReplyId(null);
    };

    const commentLikeToggleHookHandler = (cid: number) => {
        commentLikeToggleHook(cid);
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
                        onLike={commentLikeToggleHookHandler}
                        likeYn={!!likeStates[comment.id]}
                        isReplyOpen={actReplyId === comment.id}             // 답글 열림 상태 전달
                        onReplyClick={() => handleReplyClick(comment.id)}   // 답글 버튼 클릭 핸들러
                        onReplyClose={handleReplyClose}                     // 답글 닫기 핸들러
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