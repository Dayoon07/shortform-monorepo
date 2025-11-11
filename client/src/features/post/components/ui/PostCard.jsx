import { useState } from "react";
import { Link } from "react-router-dom";
import { ThumbsUp, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { REST_API_SERVER } from "../../../../shared/constants/ApiServer";
import { ROUTE } from "../../../../shared/constants/Route";
import { togglePostLike } from "../../api/postService";
import { showSuccessToast, showErrorToast } from "../../../../shared/utils/toast";

export default function PostCard({ post, onLike, onCommentClick, onShare }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likeCnt || 0);
    
    const handleLike = async () => {
        try {
            const data = await togglePostLike(post.communityUuid);
            setIsLiked(data.like);
            showSuccessToast(data);
            setLikeCount(prev => data.like ? prev + 1 : Math.max(0, prev - 1));
            onLike?.(post.communityUuid);
        } catch (error) {
            showErrorToast('좋아요 처리에 실패했습니다.');
        }
    };

    return (
        <div className="border-b border-gray-700 p-4">
            <div className="flex items-center mb-2">
                <Link to={`${ROUTE.PROFILE}/${post.userNickname}`} className="font-bold mr-2">
                    {post.userNickname}
                </Link>
                <span className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</span>
                <MoreVertical className="ml-auto text-gray-500" />
            </div>
            <div className="mb-4">
                <p className="mb-2">{post.content}</p>
                {post.imageUrl && (
                    <img

                        src={`${REST_API_SERVER}/images/${post.imageUrl}`}
                        alt="Post"
                        className="w-full max-h-96 object-cover rounded"
                    />
                )}
            </div>
            <div className="flex items-center space-x-6">
                <button
                    className={`flex items-center space-x-1 ${isLiked ? 'text-blue-500' : 'text-gray-500'}`}
                    onClick={handleLike}
                >
                    <ThumbsUp />
                    <span>{likeCount}</span>
                </button>
                <button

                    className="flex items-center space-x-1 text-gray-500"
                    onClick={() => onCommentClick?.(post.communityUuid)}
                >
                    <MessageCircle />   
                    <span>{post.commentCnt || 0}</span>
                </button>
                <button
                    className="flex items-center space-x-1 text-gray-500"
                    onClick={() => onShare?.(post.communityUuid)}
                >
                    <Share2 />
                </button>
            </div>
        </div>
    );
}
