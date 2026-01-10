import { Link } from "react-router-dom";
import { usePostDetail } from "../../features/post/hooks/usePostDetail";
import { ROUTE } from "../../shared/constants/Route";
import { Image } from "../../shared/components/common/custom/Image";
import { defaultFormatDate } from "../../shared/utils/formatUtil";
import { PostCommentList } from "../../features/post/components/PostCommentList";
import { Clipboard, MessageSquareText, Share2, ThumbsUp } from "lucide-react";
import { useUser } from "../../shared/context/UserContext";
import { useState } from "react";
import { showSuccessToast } from "../../shared/utils/toast";
import { useShare } from "@/shared/hooks/useShare";

export const Post: React.FC<{ cuuid: string | undefined }> = ({ cuuid }) => {
    const [communityCommentText, setCommunityCommentText] = useState<string>("");
    const { user } = useUser();
    const { shareFunc } = useShare();
    const { 
        post, 
        comment,
        commentWriteHandler,
        commentReplyWriteHandler
    } = usePostDetail(cuuid);

    const ccsHandler = async () => {
        console.log("커뮤니티 게시글의 댓글 작성 요청");
        if (post?.communityUuid === undefined) throw new Error("댓글을 작성할 수 없는 게시물입니다");
        const data = await commentWriteHandler(post?.id, communityCommentText);
        console.log(data);
        showSuccessToast(data);
    }

    return (
        <>
            {post != null && post !== undefined ? (
                <div className="mx-auto p-4 md:pl-4 md:pr-20 md:pb-[300px]">
                    <div className="md:min-w-[768px] mx-auto max-md:w-full mb-6">
                        <div className="flex items-start space-x-3 mb-3">
                            <div className="flex-shrink-0">
                                <Link to={ROUTE.PROFILE(post.mention)}>
                                    <Image 
                                        url={post.profileImgSrc}
                                        alt="프로필"
                                        social={post.social}
                                        provider={post.provider}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </Link>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <Link to={ROUTE.PROFILE(post.mention)} className="font-semibold">
                                        {post.username}
                                    </Link>
                                </div>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {defaultFormatDate(post.createAt)}
                                </p>
                            </div>

                            <div className="flex-shrink-0">
                                <button type="button" className="text-gray-400 p-2 rounded-full hover:bg-gray-200 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="leading-relaxed whitespace-pre-wrap">
                                {post.communityText !== null ? post.communityText : ""}
                            </p>
                        </div>

                        {/* {post.files && <ImageGrid files={post.files} />} */}
                        
                        {post.files && post.files.split(",").map((v) => (
                            <Image
                                url={v}
                                alt="..."
                                social={true}
                                className="md:w-[768px] max-md:w-full mb-4"
                                key={v}
                            />
                        ))}

                        <div className="flex items-center space-x-6 pt-3">
                            <button className="flex items-center space-x-1 transition-colors group">
                                <div className="p-2 rounded-full group-hover:bg-gray-200 transition-colors">
                                    <ThumbsUp />
                                </div>
                                <span className="text-sm max-md:hidden">{post.likeCnt}</span>
                            </button>

                            <button className="flex items-center space-x-1 transition-colors group">
                                <div className="p-2 rounded-full group-hover:bg-gray-200 transition-colors">
                                    <MessageSquareText />
                                </div>
                                <span className="text-sm max-md:hidden">{post.commentCnt}</span>
                            </button>

                            <button className="flex items-center space-x-1 transition-colors group" onClick={() => shareFunc}>
                                <div className="p-2 rounded-full group-hover:bg-gray-200 transition-colors">
                                    <Share2 />
                                </div>
                                <span className="text-sm max-md:hidden">공유</span>
                            </button>
                        </div>
                    </div>
                    {user && (
                        <div className="flex space-x-3">
                            <Image 
                                url={user.profileImgSrc}
                                social={user.social}
                                provider={user.provider}
                                alt="profile"
                                style={{ background: "linear-gradient(to right, #ec4899, #0ea5e9)" }}
                                className="w-10 h-10 p-0.5 rounded-full object-cover"
                            />

                            <div className="flex-1 flex space-x-2 items-center">
                                <textarea className="flex-1 bg-gray-200 px-3 py-2 h-[40px] rounded-full text-sm focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 resize-none"
                                    value={communityCommentText}
                                    onChange={(e) => setCommunityCommentText(e.target.value)}
                                    placeholder="댓글을 입력하세요..."
                                ></textarea>

                                <button 
                                    className="px-4 py-2 rounded-full text-sm bg-black text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                                    onClick={ccsHandler}
                                    disabled={!communityCommentText.trim()}
                                >
                                    전송
                                </button>
                            </div>
                        </div>
                    )}
                    <PostCommentList commentList={comment} f1={commentReplyWriteHandler} /> 
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                    <Clipboard />
                    <h1 className="text-lg font-medium">게시글이 없습니다.</h1>
                </div>
            )}
        </>
    );
}