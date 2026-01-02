import React from "react";
import { Image } from "../../../shared/components/common/custom/Image";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../shared/constants/Route";
import { defaultFormatDate } from "../../../shared/utils/formatUtil";
import { LikePageIcon } from "../../../shared/utils/icon/icon";

const COMMENT_BUTTON_CLASS = "text-md text-gray-400 hover:text-black duration-200";

export const PostCommentList: React.FC<{
    comment: any; onProfileClick: () => void;
}> = ({
    comment, onProfileClick
}) => {
    return (
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
                    <button type="button" className={`${COMMENT_BUTTON_CLASS} flex items-center space-x-1`}>
                        <LikePageIcon className={true ? "bg-red-400" : ""} />
                        <span>{comment.likeCount}</span>
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
}