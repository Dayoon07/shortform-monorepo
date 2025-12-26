import { Link } from "react-router-dom";
import { Comment } from "../../../../entities/comment/ui/Comment";
import { Image } from "../../../../shared/components/common/custom/Image";
import { ROUTE } from "../../../../shared/constants/Route";
import { defaultFormatDate } from "../../../../shared/utils/formatUtil";
import { LikePageIcon } from "../../../../shared/utils/icon/icon";
import React, { useState } from "react";
import { CommentCreateRes } from "../../../../entities/comment/ui/CommentCreateRes";

interface CommentItemProps {
    comment: Comment;
    onProfileClick: () => void;
    onLike: () => void;
    likeYn: boolean | null
}

interface CommentCreateResItemProps {
    comment: CommentCreateRes;
    onProfileClick: () => void;
}

const COMMENT_BUTTON_CLASS = "text-md text-gray-400 hover:text-black duration-200";

export const CommentItem: React.FC<CommentItemProps> = ({ 
    comment, onProfileClick, onLike, likeYn
}) => {
    const [commentReply, setCommentReply] = useState<boolean>(false);
    return (
        <>
            <div className="flex">
                <Image
                    url={comment.profileImgSrc}
                    alt={`${comment.username}님의 프로필`}
                    social={comment.social}
                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                    onClick={onProfileClick}
                />
                <div className="ml-4">
                    <div className="flex items-center space-x-2">
                        <Link to={ROUTE.PROFILE(comment.mention)} className="font-semibold text-md">
                            {comment.username}
                        </Link>
                        <span className="text-sm text-gray-400">
                            {defaultFormatDate(comment.createAt)}
                        </span>
                    </div>
                    <pre className="whitespace-pre-wrap [font-family:inherit]">
                        {comment.commentText}
                    </pre>
                    <div className="flex items-center space-x-4 mt-2">
                        <button type="button" className={`${COMMENT_BUTTON_CLASS} flex items-center space-x-1`} 
                            onClick={onLike}
                        >
                            <LikePageIcon className={likeYn ? "bg-red-400" : ""} />
                            <span>{comment.likeCount}</span>
                        </button>
                        <button type="button" className={COMMENT_BUTTON_CLASS} onClick={() => setCommentReply(true)}>
                            답글
                        </button>
                        <button type="button" className={COMMENT_BUTTON_CLASS}>
                            답글 보기 {/* TODO: 답글 개수 표시 */}
                        </button>
                    </div>
                </div>
            </div>
            {commentReply && (
                <>
                    <input type="text" placeholder="답글 입력" />
                    <div className="flex">
                        <button type="reset" onClick={() => setCommentReply(false)}>취소</button>
                        <button type="button">작성</button>
                    </div>
                </>
            )}
        </>
    );
};

export const CommentCreateResItem: React.FC<CommentCreateResItemProps> = ({ 
    comment, onProfileClick
}) => {
    return (
        <div className="flex">
            <Image
                url={comment.userObj.profileImgSrc}
                alt={`${comment.userObj.username}님의 프로필`}
                social={comment.userObj.social}
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                onClick={onProfileClick}
            />
            <div className="ml-4">
                <div className="flex items-center space-x-2">
                    <Link to={ROUTE.PROFILE(comment.userObj.mention)} className="font-semibold text-md">
                        {comment.userObj.username}
                    </Link>
                    <span className="text-sm text-gray-400">방금 전</span>
                </div>
                <pre className="whitespace-pre-wrap [font-family:inherit]">
                    {comment.commentText}
                </pre>
                <div className="flex items-center space-x-4 mt-2">
                    <button type="button" className={`${COMMENT_BUTTON_CLASS} flex items-center space-x-1`}>
                        <LikePageIcon />
                        <span>0</span>
                    </button>
                    <button type="button" className={COMMENT_BUTTON_CLASS}>
                        답글
                    </button>
                    <button type="button" className={COMMENT_BUTTON_CLASS}>
                        답글 보기 {/* TODO: 답글 개수 표시 */}
                    </button>
                </div>
            </div>
        </div>
    );
};