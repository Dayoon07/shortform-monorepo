import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThumbsUp, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { REST_API_SERVER } from "../../../shared/constants/ApiCollectionList";
import { ROUTE } from "../../../shared/constants/Route";
import { defaultFormatDate } from "../../../shared/utils/formatUtil";
import { Post } from "../../../entities/post/ui/Post";
import { Image } from "../../../shared/components/common/custom/Image";

interface PostCardProps {
    post: Post,
    onLike: (communityUuid: string) => void,
    onShare: (uuid: string) => void
}

export default function PostCard({ post, onLike, onShare }: PostCardProps) {
    const navigate = useNavigate();
    const isLiked = false;
    const [likeCount, setLikeCount] = useState<number>(post.likeCnt || 0);

    const handleLike = () => { /* 좋아요 로직 */ };

    useEffect(() => {
        setLikeCount(post.likeCnt || 0);
    }, [post]);

    /** 이미지 배열 파싱 */
    const images = post.files ? post.files.split(',').filter(Boolean) : [];
    const imageCount = images.length;

    /** 이미지 클릭 핸들러 (상세 페이지 이동) */
    const handleImageClick = () => {
        navigate(ROUTE.POST_DETAIL(post.mention, post.communityUuid));
    };

    return (
        <div className="w-full border rounded max-md:w-full md:max-w-xl bg-white overflow-hidden">
            <div className="flex p-4">
                <div className="w-12 flex-shrink-0">
                    <Link to={ROUTE.PROFILE(post.mention)}>
                        <Image 
                            url={post.profileImgSrc}
                            alt={post.username}
                            social={post.social}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </Link>
                </div>
                <div className="flex-grow">
                    <div className="flex items-center">
                        <p className="font-bold mr-4">{post.username}</p>
                        <p className="text-xs text-gray-500">{formatDate(post.createAt)}</p>
                    </div>
                    <div className="mt-1">
                        {post.communityText && (
                            <p className="mb-2 cursor-pointer whitespace-pre-wrap break-words text-sm md:text-base" 
                                onClick={handleImageClick}>
                                {post.communityText}
                            </p>
                        )}

                        {/* --- Thymeleaf 로직 기반 이미지 그리드 시작 --- */}
                        {imageCount > 0 && (
                            <div className="rounded-lg overflow-hidden border border-gray-100">
                                {/* 1개: 단일 이미지 */}
                                {imageCount === 1 && (
                                    <div className="w-full">
                                        <img src={`${REST_API_SERVER}${images[0].trim()}`} alt="게시글"
                                            className="w-full h-auto max-h-[500px] object-cover cursor-pointer hover:opacity-95 transition-opacity"
                                            onClick={handleImageClick} />
                                    </div>
                                )}

                                {/* 2개: 좌우 50/50 */}
                                {imageCount === 2 && (
                                    <div className="grid grid-cols-2 gap-1 h-64 md:h-80">
                                        {images.map((img, i) => (
                                            <img key={i} src={`${REST_API_SERVER}${img.trim()}`} alt="게시글"
                                                className="w-full h-full object-cover cursor-pointer hover:opacity-95"
                                                onClick={handleImageClick} />
                                        ))}
                                    </div>
                                )}

                                {/* 3개: 왼쪽 큰거 1개, 오른쪽 작은거 2개(위아래) */}
                                {imageCount === 3 && (
                                    <div className="grid grid-cols-2 gap-1 h-64 md:h-80">
                                        <img src={`${REST_API_SERVER}${images[0].trim()}`} alt="게시글"
                                            className="w-full h-full object-cover cursor-pointer hover:opacity-95"
                                            onClick={handleImageClick} />
                                        <div className="grid grid-rows-2 gap-1 h-full">
                                            <img src={`${REST_API_SERVER}${images[1].trim()}`} alt="게시글"
                                                className="w-full h-full object-cover cursor-pointer hover:opacity-95"
                                                onClick={handleImageClick} />
                                            <img src={`${REST_API_SERVER}${images[2].trim()}`} alt="게시글"
                                                className="w-full h-full object-cover cursor-pointer hover:opacity-95"
                                                onClick={handleImageClick} />
                                        </div>
                                    </div>
                                )}

                                {/* 4개 이상: 2x2 그리드, 마지막 이미지에 오버레이 */}
                                {imageCount >= 4 && (
                                    <div className="grid grid-cols-2 gap-1 h-64 md:h-80">
                                        {images.slice(0, 3).map((img, i) => (
                                            <img key={i} src={`${REST_API_SERVER}${img.trim()}`} alt="게시글"
                                                className="w-full h-full object-cover cursor-pointer hover:opacity-95"
                                                onClick={handleImageClick} />
                                        ))}
                                        <div className="relative h-full">
                                            <img src={`${REST_API_SERVER}${images[3].trim()}`} alt="게시글"
                                                className="w-full h-full object-cover cursor-pointer hover:opacity-95"
                                                onClick={handleImageClick} />
                                            {imageCount > 4 && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer pointer-events-none">
                                                    <span className="text-white text-xl font-bold">+{imageCount - 4}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* --- Thymeleaf 로직 기반 이미지 그리드 끝 --- */}
                    </div>
                </div>
                <div className="w-10 flex justify-end">
                    <button className="text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* 하단 인터액션 영역 */}
            <div className="px-4 py-3 border-t">
                <div className="flex items-center space-x-6">
                    <button
                        className={`flex items-center space-x-1.5 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-400`}
                        onClick={handleLike}
                    >
                        <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                        <span className="text-sm font-medium">{likeCount}</span>
                    </button>
                    <button className="flex items-center space-x-1.5 text-gray-500 hover:text-gray-800">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.commentCnt || 0}</span>
                    </button>
                    <button
                        className="flex items-center space-x-1.5 text-gray-500 hover:text-gray-800 ml-auto"
                        onClick={() => onShare?.(post.communityUuid)}
                    >
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">공유</span>
                    </button>
                </div>
            </div>
        </div>
    );
}