import { useState } from "react";
import { Link } from "react-router-dom";
import { ThumbsUp, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { REST_API_SERVER } from "../../../../shared/constants/ApiServer";
import { ROUTE } from "../../../../shared/constants/Route";

export default function PostCard({ post, onLike, onCommentClick, onShare }) {
    const [isLiked, setIsLiked] = useState(false);
    
    const handleLike = () => {
        setIsLiked(!isLiked);
        onLike?.(post.id || post.communityUuid);
    };
    
    return (
        <div className="border-gray-700 border rounded-lg p-4 hover:bg-gray-800/50 transition-colors">
            {/* 작성자 정보 */}
            <div className="flex items-start space-x-3 mb-3">
                <Link to={ROUTE.PROFILE(post.mention)}>
                    <img 
                        src={`${REST_API_SERVER}${post.profileImgSrc}`}
                        alt="프로필" 
                        className="w-10 h-10 rounded-full object-cover p-0.5 bg-gradient-to-r from-pink-500 to-sky-500" 
                    />
                </Link>
                <div className="flex-1">
                    <Link to={ROUTE.PROFILE(post.mention)} className="font-medium text-white hover:underline">
                        {post.username}
                    </Link>
                    <p className="text-xs text-gray-400">{post.createAt}</p>
                </div>
                <div className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 cursor-pointer">
                    <MoreVertical size={20} />
                </div>
            </div>
            
            {/* 게시글 내용 */}
            <div className="mb-4">
                <Link to={ROUTE.PROFILE_POST_DETAIL(post.mention, post.communityUuid)}>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                        {post.communityText || post.text}
                    </p>
                </Link>
            </div>
            
            {/* 이미지 그리드 */}
            {post.files && (
                <PostImages images={post.files.split(',')} mention={post.mention} uuid={post.communityUuid} />
            )}
            
            {/* 액션 버튼 */}
            <div className="flex items-center space-x-6 pt-3 border-t border-gray-700">
                <button onClick={handleLike} className="flex items-center space-x-1 text-gray-400 hover:text-white group">
                    <div className="p-2 rounded-full group-hover:bg-gray-700">
                        <ThumbsUp size={20} className={isLiked ? 'text-blue-500 fill-blue-500' : ''} />
                    </div>
                    <span className="text-sm max-md:hidden">좋아요 {post.likeCnt || 0}</span>
                </button>
                
                <button onClick={() => onCommentClick?.(post.id)} className="flex items-center space-x-1 text-gray-400 hover:text-white group">
                    <div className="p-2 rounded-full group-hover:bg-gray-700">
                        <MessageCircle size={20} />
                    </div>
                    <span className="text-sm max-md:hidden">댓글 {post.commentCnt || 0}</span>
                </button>
                
                <button onClick={() => onShare?.(post.communityUuid)} className="flex items-center space-x-1 text-gray-400 hover:text-white group ml-auto">
                    <div className="p-2 rounded-full group-hover:bg-gray-700">
                        <Share2 size={20} />
                    </div>
                    <span className="text-sm max-md:hidden">공유</span>
                </button>
            </div>
        </div>
    );
}

function PostImages({ images, mention, uuid }) {
    if (!images || images.length === 0) return null;
    
    const imageCount = images.length;
    
    // 1개 이미지
    if (imageCount === 1) {
        return (
            <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                    src={images[0]} 
                    alt="게시글" 
                    className="w-full rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.location.href = `/@${mention}/post/${uuid}`}
                />
            </div>
        );
    }
    
    // 2개 이미지
    if (imageCount === 2) {
        return (
            <div className="mb-4 grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
                {images.map((img, i) => (
                    <img 
                        key={i}
                        src={img} 
                        alt="게시글" 
                        className="aspect-square object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.location.href = `/@${mention}/post/${uuid}`}
                    />
                ))}
            </div>
        );
    }
    
    // 3개 이상 이미지
    return (
        <div className="mb-4 grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
            {images.slice(0, 4).map((img, i) => (
                <div key={i} className="relative aspect-square">
                    <img 
                        src={img} 
                        alt="게시글" 
                        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.location.href = `/@${mention}/post/${uuid}`}
                    />
                    {i === 3 && imageCount > 4 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">+{imageCount - 4}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}