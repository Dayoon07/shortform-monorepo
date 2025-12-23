import React, { useEffect } from "react";
import { usePostDetail } from "../hooks/usePostDetail";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../shared/constants/Route";
import { Image } from "../../../shared/components/common/custom/Image";
import { formatDate } from "../../../shared/utils/formatDate";
import ImageGrid from "../../../shared/components/post/ImageGrid";

interface PostDetailProps {
    cuuid: string
}

export const Detail: React.FC<PostDetailProps> = ({ cuuid }) => {
    const {
        post,
        getPostDetailHook
    } = usePostDetail(cuuid);

    useEffect(() => {
        getPostDetailHook();
    }, [getPostDetailHook]);

    return (
        <>
            {post != null ? (
                <>
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
                                            <Link to={ROUTE.PROFILE(post.mention)}
                                                className="font-medium text-white text-sm"
                                            >
                                                {post.username}
                                            </Link>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {formatDate(post.createAt)}
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

                                {post.files && (
                                    <ImageGrid files={post.files} />
                                )}

                                <div class="flex items-center space-x-6 pt-3 border-t border-gray-700">
                                    <button class="post-like-btn flex items-center space-x-1 text-gray-400 hover:text-white transition-colors group"
                                            th:data-community-uuid="${cat.getCommunityUuid()}">
                                        <div class="p-2 rounded-full group-hover:bg-gray-700 transition-colors">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263
                                                    21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                                                </path>
                                            </svg>
                                        </div>
                                        <span class="text-sm max-md:hidden like-cnt" th:text="'좋아요 ' + ${cat.getLikeCnt()}">좋아요</span>
                                    </button>


                                    <button class="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors group">
                                        <div class="p-2 rounded-full group-hover:bg-gray-700 transition-colors">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                            </svg>
                                        </div>
                                        <span class="text-sm max-md:hidden" th:text="${cat.getCommentCnt()}">댓글</span>
                                    </button>

                                    <button class="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors group ml-auto">
                                        <div class="p-2 rounded-full group-hover:bg-gray-700 transition-colors">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                                            </svg>
                                        </div>
                                        <span class="text-sm max-md:hidden">공유</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div th:if="${session.user != null}"
                        class="p-4 md:pl-4 md:pr-20 max-md:pb-40">
                        <div class="flex space-x-4">
                            <div>
                                <img th:src="${session.user.getProfileImgSrc()}" alt="profile" class="w-10 h-10 rounded-full object-cover cursor-pointer" />
                            </div>

                            <div class="flex-1">
                                <div id="community-comment-form" th:data-community-uuid="${cat.getCommunityUuid()}">
                                    <textarea name="commentText" placeholder="댓글을 작성해주세요" id="commentText" class="w-full h-20 px-4 py-2 border-gray-700 border-b bg-black
                                        focus:outline-none focus:border-2 resize-none text-white"></textarea>

                                    <div class="flex justify-end mt-2">
                                        <button type="button" id="comment-submit-btn" class="px-4 py-2 border-gray-700 border rounded
                                            hover:bg-gray-700 hover:text-white transition">
                                            작성
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 space-y-4" id="comment-list">
                            <div th:each="comment : ${comments}" class="border-b border-gray-800 pb-2">
                                <div class="flex items-center space-x-2">
                                    <img th:src="${comment.getUser().getProfileImgSrc()}" alt="profile" class="w-8 h-8 rounded-full object-cover" />
                                    <span class="font-semibold text-sm text-gray-200" th:text="${comment.getUser().getUsername()}"></span>
                                    <span class="text-xs text-gray-500" th:text="${@timestampDateFormat.format(comment.getCreateAt())}"></span>
                                </div>
                                <p class="ml-10 text-gray-300" th:text="${comment.getCommentText()}"></p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div th:if="${cat == null}"
                        class="flex flex-col items-center justify-center py-10 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-12 h-12 mb-3 text-gray-500"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 13h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z"/>
                        </svg>

                        <h1 class="text-lg font-medium">게시글이 없습니다.</h1>
                    </div>
                </>
            )}
        </>
    );
}