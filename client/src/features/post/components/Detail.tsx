import React from "react";
import { usePostDetail } from "../hooks/usePostDetail";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../shared/constants/Route";
import { Image } from "../../../shared/components/common/custom/Image";
import ImageGrid from "../../../shared/components/post/ImageGrid";
import { defaultFormatDate } from "../../../shared/utils/formatUtil";
import { Clipboard } from "lucide-react";
import { DetailPostCommentList } from "./ui/DetailPostCommentList";

interface PostDetailProps {
    cuuid: string
}

export const Detail: React.FC<PostDetailProps> = ({ cuuid }) => {
    const { post } = usePostDetail(cuuid);

    return (
        <>
            {post != null ? (
                <div className="p-4 md:pl-4 md:pr-20">
                    <div className="md:max-w-[800px] mx-auto max-md:w-full mb-6">
                        <div className="border-gray-700 border rounded-lg p-4 hover:bg-gray-750 transition-colors duration-200">
                            <div className="flex items-start space-x-3 mb-3">
                                <div className="flex-shrink-0">
                                    <Link to={ROUTE.PROFILE(post.mention)}>
                                        <Image 
                                            url={post.profileImgSrc}
                                            alt="프로필"
                                            social={post.social}
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
                                    <button type="button" className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {post.communityText && (
                                <div className="mb-4">
                                    <Link to={ROUTE.PROFILE(post.mention)}>
                                        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                                            {post.communityText}
                                        </p>
                                    </Link>
                                </div>
                            )}

                            {post.files && ( <ImageGrid files={post.files} /> )}

                            <div className="flex items-center space-x-6 pt-3 border-t border-gray-700">
                                <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors group">
                                    <div className="p-2 rounded-full group-hover:bg-gray-700 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263
                                                21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                                            </path>
                                        </svg>
                                    </div>
                                    <span className="text-sm max-md:hidden">{post.likeCnt}</span>
                                </button>

                                <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors group">
                                    <div className="p-2 rounded-full group-hover:bg-gray-700 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                        </svg>
                                    </div>
                                    <span className="text-sm max-md:hidden">{post.commentCnt}</span>
                                </button>

                                <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors group ml-auto">
                                    <div className="p-2 rounded-full group-hover:bg-gray-700 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                                        </svg>
                                    </div>
                                    <span className="text-sm max-md:hidden">공유</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <DetailPostCommentList
                        comment={0}
                        onProfileClick={() => console.log("")}
                    />
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