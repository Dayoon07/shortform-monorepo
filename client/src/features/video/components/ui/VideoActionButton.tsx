import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface VideoActionButtonProps {
    onClick: () => void,
    disabled: boolean,
    className?: string,
    ariaLabel: string,
    children: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export const VideoActionButton = () => {
    return (
        <div className="flex flex-col items-center group">
            <button
                onClick={handleLike}
                disabled={!user}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all"
                aria-label="좋아요"
            >
                <ThumbsUp
                    className={`h-7 w-7 transition-colors duration-200 ${isAnimating ? 'heart-animation' : ''}`}
                    fill={isLiked ? '#ef4444' : 'none'}
                    stroke={isLiked ? '#ef4444' : 'currentColor'}
                />
            </button>
            <span className="text-xs md:text-sm mt-1 text-white">{likeCount}</span>
        </div>       
    );
}