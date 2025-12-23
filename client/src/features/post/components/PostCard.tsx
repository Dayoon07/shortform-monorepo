import { useState, useEffect } from "react"; // useEffect 추가
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

    const handleLike = () => {

    }

    useEffect(() => {
        setLikeCount(post.likeCnt || 0);
    }, [post]);
    
    /** 이미지 배열 파싱 */
    const images = post.files ? post.files.split(',').filter(Boolean) : [];
    
    /** 이미지 그리드 레이아웃 결정 */
    const getGridLayout = () => {
        const count = images.length;
        if (count === 1) return 'grid-cols-1';
        if (count === 2) return 'grid-cols-2';
        // 3장은 3열 또는 2x1 (큰거) + 2x1 (작은거 2개)
        if (count === 3) return 'grid-cols-2 grid-rows-2 h-96'; // 첫째 칸을 2행으로
        // 4장은 2x2
        if (count === 4) return 'grid-cols-2 grid-rows-2';
        // 5장 이상은 3열 (2x2 + 1)
        if (count >= 5) return 'grid-cols-3'; // 5장부터는 3열로 꽉 채우거나, 인스타그램처럼 2x2 + 1 레이아웃을 구현할 수도 있지만, 간단히 3열로 처리
        return '';
    };

    const getGridItemClass = (index: number, count: number) => {
        if (count === 3)    // 3장일 경우: 첫 번째 이미지를 2x2로 확장
            return index === 0 ? 'col-span-1 row-span-2' : 'aspect-[4/3]';
        if (count === 4)    // 4장일 경우: 2x2 (aspect-square)
            return 'aspect-square';

        // 1, 2, 5장 이상일 경우: 기본 aspect-square
        if (count === 1) 
            return 'aspect-[4/3]'; // 1장은 가로가 긴 이미지로
        return 'aspect-square';
    };


    return (
        <div className="w-full border rounded max-md:w-full md:max-w-xl">
            <div className="flex justify-center p-4">
                <div className="w-16">
                    <Link to={ROUTE.PROFILE(post.mention)}>
                        <Image 
                            url={post.profileImgSrc}
                            alt={post.username}
                            social={post.social}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </Link>
                </div>
                <div className="w-full">
                    <div className="flex items-center">
                        <p className="font-bold mr-4">{post.username}</p>
                        <p className="text-xs text-gray-500">{defaultFormatDate(post.createAt)}</p>
                    </div>
                    <div>
                        {post.communityText && (
                            <p className="pt-2 cursor-pointer whitespace-pre-wrap break-words" 
                                onClick={() => navigate(ROUTE.POST_DETAIL(post.mention, post.communityUuid))}>
                                {post.communityText}
                            </p>
                        )}

                        {images.length > 0 && (
                            <div className={`grid gap-0.5 ${getGridLayout()} ${post.communityText ? 'mt-1' : ''}`}>
                                {images.slice(0, 5).map((img, index) => {
                                    const showOverlay = images.length > 5 && index === 4;
                                    const remainingCount = images.length - 5;
                                    
                                    return (
                                        <div 
                                            key={index}
                                            className={`relative bg-gray-200 overflow-hidden ${getGridItemClass(index, images.length)}`}
                                        >
                                            <img
                                                src={`${REST_API_SERVER}${img.trim()}`}
                                                alt={`게시글 이미지 ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-300 cursor-pointer hover:scale-105"
                                                onClick={() => navigate(ROUTE.POST_DETAIL(post.mention, post.communityUuid))}
                                            />
                                            {showOverlay && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                    <span className="text-white text-3xl font-bold">
                                                        +{remainingCount}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-10">
                    <button className="text-gray-400 hover:text-black p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="px-4 py-3">
                <div className="flex items-center space-x-6">
                    <button
                        className={`flex items-center space-x-1.5 ${
                            isLiked ? 'text-red-500' : 'text-gray-500'
                        } hover:text-red-400 transition-colors`}
                        onClick={handleLike}
                    >
                        <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                        <span className="text-sm font-medium">{likeCount}</span>
                    </button>

                    {/* 댓글 버튼 */}
                    <button className="flex items-center space-x-1.5 text-gray-500 hover:text-gray-800 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.commentCnt || 0}</span>
                    </button>

                    {/* 공유 버튼 */}
                    <button
                        className="flex items-center space-x-1.5 text-gray-500 hover:text-gray-800 transition-colors ml-auto"
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