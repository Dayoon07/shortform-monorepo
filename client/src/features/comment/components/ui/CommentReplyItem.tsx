import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Image } from "../../../../shared/components/common/custom/Image";
import { ROUTE } from "../../../../shared/constants/Route";
import { defaultFormatDate } from "../../../../shared/utils/formatUtil";
import { useUser } from "../../../../shared/context/UserContext";
import { CommentReply } from "../../../../entities/comment/ui/CommentReply";
import { updateCommentReply, deleteCommentReply } from "../../api/commentService";
import { showSuccessToast, showErrorToast } from "../../../../shared/utils/toast";

export const CommentReplyItem: React.FC<{ reply: CommentReply }> = ({ reply }) => {
    const { user } = useUser();
    const isOwner = user != null && user.id === reply.commentReplyUserId;
    const [displayText, setDisplayText] = useState<string>(reply.commentReplyText);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(reply.commentReplyText);
    const [isMutating, setIsMutating] = useState<boolean>(false);

    const handleUpdate = async () => {
        const text = editText.trim();
        if (!text) return;
        setIsMutating(true);
        try {
            const res = await updateCommentReply(reply.id, text);
            if (!res.ok) throw new Error(res.error || "답글 수정 실패");
            setDisplayText(text);
            setIsEditing(false);
            showSuccessToast("답글이 수정되었습니다");
        } catch (e) {
            showErrorToast("답글 수정 실패");
        } finally {
            setIsMutating(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("답글을 삭제하시겠습니까?")) return;
        setIsMutating(true);
        try {
            const res = await deleteCommentReply(reply.id);
            if (!res.ok) throw new Error(res.error || "답글 삭제 실패");
            setIsDeleted(true);
            showSuccessToast("답글이 삭제되었습니다");
        } catch (e) {
            showErrorToast("답글 삭제 실패");
        } finally {
            setIsMutating(false);
        }
    };

    if (isDeleted) return null;

    return (
        <div className="flex mt-3">
            <Image
                url={reply.profileImgSrc}
                alt={`${reply.username}님의 프로필`}
                social={reply.social}
                provider={reply.provider}
                className="w-8 h-8 rounded-full object-cover mt-1"
            />
            <div className="ml-3 flex-1">
                <div className="flex items-center space-x-2 mb-1">
                    <Link to={ROUTE.PROFILE(reply.mention)} className="font-bold text-[13px]">
                        {reply.username}
                    </Link>
                    <span className="text-[11px] text-gray-500">{defaultFormatDate(reply.createAt)}</span>
                </div>
                {isEditing ? (
                    <div>
                        <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            disabled={isMutating}
                            rows={2}
                            className="w-full text-sm border border-gray-300 focus:border-black outline-none rounded-lg p-2 resize-none"
                            autoFocus
                        />
                        <div className="flex justify-end gap-2 mt-1">
                            <button type="button" className="px-3 py-1 text-sm font-bold hover:bg-gray-200 rounded-full"
                                onClick={() => { setIsEditing(false); setEditText(displayText); }} disabled={isMutating}>
                                취소
                            </button>
                            <button type="button" onClick={handleUpdate} disabled={!editText.trim() || isMutating}
                                className={`px-3 py-1 text-sm font-bold rounded-full ${editText.trim() && !isMutating
                                    ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-400"}`}>
                                {isMutating ? "저장 중..." : "저장"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-[13px] leading-relaxed">{displayText}</div>
                )}
                {isOwner && !isEditing && (
                    <div className="flex items-center space-x-2 mt-1">
                        <button type="button" disabled={isMutating}
                            className="text-[11px] text-gray-600 font-bold hover:bg-gray-100 px-2 py-1 rounded-full"
                            onClick={() => { setIsEditing(true); setEditText(displayText); }}>
                            수정
                        </button>
                        <button type="button" disabled={isMutating}
                            className="text-[11px] text-red-500 font-bold hover:bg-red-50 px-2 py-1 rounded-full"
                            onClick={handleDelete}>
                            삭제
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
