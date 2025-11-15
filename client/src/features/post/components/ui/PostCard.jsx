import { useState } from "react";
import { Link } from "react-router-dom";
import { ThumbsUp, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { REST_API_SERVER } from "../../../../shared/constants/ApiServer";
import { ROUTE } from "../../../../shared/constants/Route";
import { togglePostLike } from "../../api/postService";
import { showSuccessToast, showErrorToast } from "../../../../shared/utils/toast";
import { formatDate } from "../../../../shared/utils/formatDate";

export default function PostCard({ post, onLike, onCommentClick, onShare }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likeCnt || 0);
    
    /** 이미지 배열 파싱 */
    const images = post.files ? post.files.split(',').filter(Boolean) : [];
    
    const handleLike = async () => {
        try {
            const data = await togglePostLike(post.communityUuid);
            setIsLiked(data.like);
            showSuccessToast(data.message || '좋아요 처리 완료');
            setLikeCount(prev => data.like ? prev + 1 : Math.max(0, prev - 1));
            onLike?.(post.communityUuid);
        } catch (error) {
            showErrorToast('좋아요 처리에 실패했습니다.');
        }
    };

    /** 이미지 그리드 레이아웃 결정 */
    const getGridLayout = () => {
        const count = images.length;
        if (count === 1) return 'grid-cols-1';
        if (count === 2) return 'grid-cols-2';
        if (count === 3) return 'grid-cols-3';
        if (count === 4) return 'grid-cols-2 grid-rows-2';
        if (count >= 5) return 'grid-cols-2';
    };

    return (
        <div className="bg-black border-b border-gray-800">

            <div className="flex items-center justify-between px-4 py-3">
                <Link 
                    to={ROUTE.PROFILE(post.mention)} 
                    className="flex items-center space-x-3"
                >
                    <img
                        src={`${REST_API_SERVER}${post.profileImgSrc}`}
                        alt={post.username}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-800"
                        onError={(e) => {
                            e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24"%3E%3Cpath fill="%23666" d="M12 2C6.48 2 2 6.48 2 12s4.48 
                                10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 
                                1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 
                                6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/%3E%3C/svg%3E`;
                        }}
                    />
                    <div>
                        <p className="text-sm font-semibold text-white">
                            {post.username}
                        </p>
                        <p className="text-xs text-gray-500">
                            {formatDate(post.createAt)}
                        </p>
                    </div>
                </Link>
                <button className="text-gray-400 hover:text-white p-2">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            {post.communityText && (
                <div className="px-4 pb-3">
                    <p className="text-white text-sm whitespace-pre-wrap break-words">
                        {post.communityText.length > 100 
                            ? `${post.communityText.substring(0, 100)}...` 
                            : post.communityText}
                    </p>
                </div>
            )}

            {images.length > 0 && (
                <div className={`grid gap-0.5 ${getGridLayout()}`}>
                    {images.slice(0, 5).map((img, index) => {
                        const showOverlay = images.length > 5 && index === 4;
                        const remainingCount = images.length - 5;
                        
                        return (
                            <div 
                                key={index}
                                className={`relative bg-gray-900 ${
                                    images.length === 1 
                                        ? 'aspect-[4/3]' 
                                        : images.length === 5 && index >= 3
                                        ? 'aspect-square row-span-2'
                                        : 'aspect-square'
                                }`}
                            >
                                <img
                                    src={`${REST_API_SERVER}${img.trim()}`}
                                    alt={`게시글 이미지 ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                                {showOverlay && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
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

            <div className="px-4 py-3">
                <div className="flex items-center space-x-4">
                    <button
                        className={`flex items-center space-x-1.5 ${
                            isLiked ? 'text-red-500' : 'text-gray-300'
                        } hover:text-red-400 transition-colors`}
                        onClick={handleLike}
                    >
                        <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm">좋아요 {likeCount}</span>
                    </button>
                    <button
                        className="flex items-center space-x-1.5 text-gray-300 hover:text-white transition-colors"
                        onClick={() => onCommentClick?.(post.communityUuid)}
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">댓글 {post.commentCnt || 0}</span>
                    </button>
                    <button
                        className="flex items-center space-x-1.5 text-gray-300 hover:text-white transition-colors ml-auto"
                        onClick={() => onShare?.(post.communityUuid)}
                    >
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">공유</span>
                    </button>
                </div>
            </div>

        </div>
    );
}
