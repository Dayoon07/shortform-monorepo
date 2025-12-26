import { ROUTE } from "../../../shared/constants/Route";
import { Comment } from "../../../entities/comment/ui/Comment";
import { CommentCreateRes } from "../../../entities/comment/ui/CommentCreateRes";
import { useNavigate } from "react-router-dom";
import { useCommentList } from "../hooks/useCommentList";
import { CommentCreateResItem, CommentItem } from "./ui/CommentListItem";

interface CommentListProps {
    commentList: Comment[];
    createdComment?: CommentCreateRes | null;
}

export function CommentList({ commentList, createdComment }: CommentListProps) {
    const navi = useNavigate();
    const handleProfileClick = (mention: string) => navi(ROUTE.PROFILE(mention));
    const { 
        commentLikeYn, 
        commentLikeToggleHook
    } = useCommentList();

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {createdComment && (
                <CommentCreateResItem 
                    comment={createdComment} 
                    onProfileClick={() => handleProfileClick(createdComment.userObj.mention)}
                />
            )}

            {commentList.length > 0 ? (
                commentList.map((comment) => (
                    <CommentItem 
                        key={comment.mention}
                        comment={comment} 
                        onProfileClick={() => handleProfileClick(comment.mention)} 
                        onLike={() => commentLikeToggleHook}
                        likeYn={commentLikeYn}
                    />
                ))
            ) : (
                <p className="text-gray-400 text-center">댓글이 없습니다.</p>
            )}
        </div>
    );
}
