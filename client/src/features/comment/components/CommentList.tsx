import { Link } from "react-router-dom";
import { ROUTE } from "../../../shared/constants/Route";
import { LikePageIcon } from "../../../shared/utils/icon/icon";
import { Comment } from "../../../entities/comment/ui/Comment";
import { Image } from "../../../shared/components/common/custom/Image";
import { CommentCreateRes } from "../../../entities/comment/ui/CommentCreateRes";

// cc = createdComment
interface CommentListProps {
    cList: Comment[],
    cc: CommentCreateRes | (undefined | null)
}

export function CommentList({ cList, cc }: CommentListProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cc !== null && cc !== undefined && (
                <CommentCreateResItem c={cc} />
            )}

            {cList !== null ? (
                cList.map((c) => <CommentItem c={c} />)
            ) : (
                <p className="text-gray-400 text-center">댓글이 없습니다.</p>
            )}
        </div>
    );
}

const CommentItem = ({ c }: { c: Comment }) => {
    return (
        <div className="flex" key={c.mention}>
            <Image
                url={c.profileImgSrc}
                alt={`${c.username}님의 프로필`}
                social={c.social}
                className="w-8 h-8 rounded-full"
            />
            <div className="ml-4">
                <div className="flex items-center space-x-2">
                    <Link to={ROUTE.PROFILE(c.mention)} className="font-semibold text-md">
                        {c.username}
                    </Link>
                    <span className="text-sm text-gray-400">{c.createAt}</span>
                </div>
                <pre className="whitespace-pre-wrap [font-family:inherit]">
                    {c.commentText}
                </pre>
                <div className="flex items-center space-x-4 mt-2">
                    <button className="text-md text-gray-400 hover:text-white flex items-center space-x-1">
                        <LikePageIcon />
                        <span>{c.likeCount}</span>
                    </button>
                    <button className="text-md text-gray-400 hover:text-white">답글</button>
                    <button className="text-md text-gray-400 hover:text-white">보기 {'답글 개수'}</button>
                </div>
            </div>
        </div>
    );
}

const CommentCreateResItem = ({ c }: { c: CommentCreateRes }) => {
    return (
        <div className="flex" key={c.userObj.mention}>
            <Image
                url={c.userObj.profileImgSrc}
                alt={`${c.userObj.username}님의 프로필`}
                social={c.userObj.social}
                className="w-8 h-8 rounded-full"
            />
            <div className="ml-4">
                <div className="flex items-center space-x-2">
                    <Link to={ROUTE.PROFILE(c.userObj.mention)} className="font-semibold text-md">
                        {c.userObj.username}
                    </Link>
                    <span className="text-sm text-gray-400">{c.userObj.createAt || '방금 전'}</span>
                </div>
                <pre className="whitespace-pre-wrap [font-family:inherit]">
                    {c.commentText}
                </pre>
                <div className="flex items-center space-x-4 mt-2">
                    <button className="text-md text-gray-400 flex items-center space-x-1">
                        <LikePageIcon />
                        <span>0</span>
                    </button>
                    <button className="text-md text-gray-400 ">답글</button>
                    <button className="text-md text-gray-400 ">보기 {'답글 개수'}</button>
                </div>
            </div>
        </div>
    );
}
