import { Link } from "react-router-dom";
import { ROUTE } from "../../../shared/constants/Route";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { LikePageIcon } from "../../../widgets/icon/icon";
import { Comment } from "../../../entities/comment/ui/Comment";

interface CommentListProps {
    commentList: Comment[]
}

export function CommentList({ commentList }: CommentListProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {commentList !== null ? (
                commentList.map((c, i) => (
                    <div className="flex" key={i}>
                        <img src={REST_API_SERVER + c.profileImgSrc} alt={`${c.username}님의 프로필`} className="w-8 h-8 rounded-full" />
                        <div className="ml-4">
                            <div className="flex items-center space-x-2">
                                <Link to={ROUTE.PROFILE(c.mention)} className="font-semibold text-md text-white">
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
                                <button className="text-md text-gray-400 hover:text-white">보기</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-400 text-center">댓글이 없습니다.</p>
            )}
        </div>
    );
}