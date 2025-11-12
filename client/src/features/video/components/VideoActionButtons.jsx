import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { toggleVideoLike } from '../api/swipeVideoService';

export function VideoActionButtons({ video, user, onCommentClick }) {
    const [isLiked, setIsLiked] = useState(video.isLiked);
    const [likeCount, setLikeCount] = useState(video.likeCount);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleLike = async () => {
        if (!user) {
            alert('로그인이 필요한 기능입니다.');
            return;
        }

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 600);

        try {
            const data = await toggleVideoLike(video.id);
            
            if (data) {
                setIsLiked(data.isLiked);
                if (data.totalLikes !== undefined) {
                    setLikeCount(data.likeCnt);
                }
            }
        } catch (error) {
            console.error('좋아요 처리 실패:', error);
            alert('요청 처리 중 오류가 발생했습니다.');
        }
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('링크가 복사되었습니다!');
        } catch (err) {
            console.error('클립보드 복사 실패:', err);
            alert('링크 복사에 실패했습니다.');
        }
    };

    return (
        <div className="absolute right-2 md:right-6 bottom-20 md:bottom-32 flex flex-col items-center space-y-4 md:space-y-6 z-20">
            <div className="flex flex-col items-center group">
                <button
                    onClick={handleLike}
                    disabled={!user}
                    className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all"
                    aria-label="좋아요"
                >
                    <Heart
                        className={`h-7 w-7 transition-colors duration-200 ${isAnimating ? 'heart-animation' : ''}`}
                        fill={isLiked ? '#ef4444' : 'none'}
                        stroke={isLiked ? '#ef4444' : 'currentColor'}
                    />
                </button>
                <span className="text-xs md:text-sm mt-1 text-white">{likeCount}</span>
            </div>

            <div className="flex flex-col items-center group">
                <button
                    onClick={onCommentClick}
                    className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all"
                    aria-label="댓글"
                >
                    <MessageCircle className="h-7 w-7 text-white" />
                </button>
                <span className="text-xs md:text-sm mt-1 text-white">{video.commentCnt}</span>
            </div>

            <div className="flex flex-col items-center group">
                <button
                    onClick={handleShare}
                    className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all"
                    aria-label="공유"
                >
                    <Share2 className="h-7 w-7 text-white" />
                </button>
                <span className="text-xs md:text-sm mt-1 text-white">공유</span>
            </div>
        </div>
    );
}