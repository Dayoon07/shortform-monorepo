import { ThumbsUp } from 'lucide-react';

interface VideoLikeButtonProps {
    onClick: () => void,
    disabled?: boolean,
    likeCount: number,
    isAnimating: boolean,
    isLiked: boolean,
    ariaLabel: string,
}

/** 좋아요 버튼을 위한 컴포넌트 (애니메이션 및 상태 관리 포함) */
export const VideoLikeButton = ({
    onClick, disabled = false, likeCount,
    isAnimating, isLiked, ariaLabel
}: VideoLikeButtonProps) => {
    return (
        <div className="flex flex-col items-center group">
            <button
                onClick={onClick}
                disabled={disabled}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all"
                aria-label={ariaLabel}
            >
                <ThumbsUp
                    className={`h-7 w-7 transition-colors duration-200 ${isAnimating ? 'heart-animation' : ''}`}
                    fill={isLiked ? '#ef4444' : 'none'}
                    stroke={isLiked ? '#ef4444' : 'currentColor'}
                />
            </button>
            <span className="text-xs md:text-sm mt-1">{likeCount}</span>
        </div>
    );
};