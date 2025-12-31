import { Link } from "react-router-dom";
import { Comment } from "../../../../entities/comment/ui/Comment";
import { Image } from "../../../../shared/components/common/custom/Image";
import { ROUTE } from "../../../../shared/constants/Route";
import { defaultFormatDate } from "../../../../shared/utils/formatUtil";
import { LikePageIcon } from "../../../../shared/utils/icon/icon";
import React, { useState } from "react";
import { CommentCreateRes } from "../../../../entities/comment/ui/CommentCreateRes";
import { useUser } from "../../../../shared/context/UserContext";

interface CommentItemProps {
    comment: Comment;
    onProfileClick: () => void;
    onLike: (cid: number) => void;
    onReplySubmit: (commentId: number, replyText: string) => Promise<void>;
    likeYn: boolean | null;
    isReplyOpen: boolean;
    onReplyClick: () => void;
    onReplyClose: () => void;
    onReplyCommentReq: (id: number) => void;
}

interface CommentCreateResItemProps {
    comment: CommentCreateRes;
    onProfileClick: () => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({ 
    comment, 
    onProfileClick, 
    onLike, 
    onReplySubmit,
    likeYn,
    isReplyOpen, 
    onReplyClick, 
    onReplyClose,
    onReplyCommentReq
}) => {
    const [replyText, setReplyText] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { user } = useUser();
    const btnCn = "flex items-center gap-1 hover:bg-gray-100 p-1.5 rounded-full duration-200";

    const handleReplySubmit = async () => {
        if (!replyText.trim()) return;
        
        setIsSubmitting(true);
        try {
            await onReplySubmit(comment.id, replyText);
            setReplyText("");
            onReplyClose();
        } catch (error) {
            console.error("답글 작성 실패:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col w-full mb-4">
            <div className="flex">
                <Image
                    url={comment.profileImgSrc}
                    alt={`${comment.username}님의 프로필`}
                    social={comment.social}
                    className="w-10 h-10 rounded-full object-cover cursor-pointer mt-1"
                    onClick={onProfileClick}
                />
                <div className="ml-4 flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                        <Link to={ROUTE.PROFILE(comment.mention)} className="font-bold">
                            {comment.username}
                        </Link>
                        <span className="text-[12px] text-gray-500">
                            {defaultFormatDate(comment.createAt)}
                        </span>
                    </div>
                    <div className="text-[14px] leading-relaxed mb-2">
                        {comment.commentText}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <button type="button" className={btnCn} onClick={() => onLike(comment.id)}>
                            <LikePageIcon className={likeYn ? "fill-red-500 stroke-red-500" : "stroke-gray-600"} />
                            <span className={`text-xs ${likeYn ? "text-red-500 font-medium" : "text-gray-600"}`}>
                                {likeYn ? comment.likeCount + 1 : comment.likeCount} 
                            </span>
                        </button>
                        {user != null && (
                            <button type="button" onClick={onReplyClick}
                                className="text-[12px] font-bold hover:bg-gray-100 px-3 py-1.5 rounded-full"
                            >
                                답글
                            </button>
                        )}
                        {comment.replyCount !== null && comment.replyCount !== 0 && (
                            <button type="button" className={btnCn} onClick={() => onReplyCommentReq(comment.id)}>
                                <span className="text-xs font-medium">답글 {comment.replyCount}개</span>
                            </button>
                        )}
                    </div>

                    {user != null && isReplyOpen && (
                        <div className="mt-3 flex gap-3">
                            <Image 
                                url={user.profileImgSrc}
                                alt={user.username}
                                social={user.social}
                                className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1 group">
                                <textarea 
                                    placeholder="답글 추가..." 
                                    value={replyText} 
                                    onChange={(e) => setReplyText(e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full text-sm border-b border-gray-300 focus:border-black outline-none transition-all 
                                        duration-300 resize-none py-1 bg-transparent overflow-hidden"
                                    autoFocus
                                    rows={1}
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = 'auto';
                                        target.style.height = `${target.scrollHeight}px`;
                                    }}
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button 
                                        className="px-4 py-2 text-sm font-bold hover:bg-gray-200 rounded-full"
                                        onClick={() => { 
                                            setReplyText(""); 
                                            onReplyClose(); 
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        취소
                                    </button>
                                    <button 
                                        onClick={handleReplySubmit}
                                        disabled={!replyText.trim() || isSubmitting}
                                        className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${
                                            replyText.trim() && !isSubmitting
                                                ? "bg-blue-600 text-white hover:bg-blue-700" 
                                                : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        {isSubmitting ? "전송 중..." : "답글"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const CommentCreateResItem: React.FC<CommentCreateResItemProps> = ({ 
    comment, onProfileClick
}) => {
    return (
        <div className="flex w-full mb-4">
            <Image
                url={comment.userObj.profileImgSrc}
                alt={`${comment.userObj.username}님의 프로필`}
                social={comment.userObj.social}
                className="w-10 h-10 rounded-full object-cover cursor-pointer mt-1"
                onClick={onProfileClick}
            />
            <div className="ml-4 flex-1">
                <div className="flex items-center space-x-2 mb-1">
                    <Link to={ROUTE.PROFILE(comment.userObj.mention)} className="font-bold text-[13px] hover:underline">
                        @{comment.userObj.username}
                    </Link>
                    <span className="text-[12px] text-gray-500">방금 전</span>
                </div>
                <div className="text-[14px] leading-relaxed mb-2">
                    {comment.commentText}
                </div>
                <div className="flex items-center space-x-3">
                    <button type="button" className="flex items-center gap-1 hover:bg-gray-100 p-1.5 rounded-full duration-200">
                        <LikePageIcon className="stroke-gray-600" />
                        <span className="text-xs text-gray-600">0</span>
                    </button>
                    <button type="button" className="text-[12px] font-bold hover:bg-gray-100 px-3 py-1.5 rounded-full">
                        답글
                    </button>
                </div>
            </div>
        </div>
    );
};