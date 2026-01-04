import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThumbsUp, Share2, MoreVertical, MessageSquareText } from "lucide-react";
import { ROUTE } from "../../../shared/constants/Route";
import { PostWithProfile } from "../../../entities/post/ui/PostWithProfile";
import { Image } from "../../../shared/components/common/custom/Image";
import { defaultFormatDate } from "../../../shared/utils/formatUtil";
import ImageGrid from "../../../shared/components/post/ImageGrid";

interface PostCardProps {
    post: PostWithProfile,
    onLike: (communityUuid: string) => void,
    onShare: (uuid: string) => void
}

export default function PostCard({ post, onLike, onShare }: PostCardProps) {
    const navigate = useNavigate();
    const isLiked = false;
    const [likeCount, setLikeCount] = useState<number>(post.likeCnt || 0);

    const handleLike = () => { /* 좋아요 로직 */ };

    /** 이미지 클릭 핸들러 (상세 페이지 이동) */
    const handleImageClick = () => navigate(ROUTE.POST_DETAIL(post.mention, post.communityUuid));

    useEffect(() => {
        setLikeCount(post.likeCnt || 0);
    }, [post]);

    return (
        <div className="border rounded overflow-hidden">
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
                        <p className="text-xs text-gray-500">{defaultFormatDate(post.createAt)}</p>
                    </div>
                    <div className="mt-1">
                        <p className="mb-2 cursor-pointer whitespace-pre-wrap break-words text-sm md:text-base" 
                            onClick={handleImageClick}>
                            {post.communityText !== null ? (
                                post.communityText
                            ) : (
                                <span className="text-sm text-gray-400">게시글 보기</span>
                            )}
                        </p>

                        <ImageGrid files={post.files} gridType="inline" />
                    </div>
                </div>
                <div className="w-10">
                    <button className="text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* 하단 인터액션 영역 */}
            <div className="px-4 py-3">
                <div className="flex items-center space-x-6">
                    <button
                        className={`flex items-center space-x-1.5 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-400`}
                        onClick={handleLike}
                    >
                        <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                        <span className="text-sm font-medium">{likeCount}</span>
                    </button>
                    <button className="flex items-center space-x-1.5 text-gray-500 hover:text-gray-800">
                        <MessageSquareText className="w-5 h-5" />
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