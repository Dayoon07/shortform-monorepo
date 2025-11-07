import { useState } from "react";
import { X, Plus } from "lucide-react";

export default function FollowButton({ isFollowing: initialFollowing, onFollow, onUnfollow, mention }) {
    const [following, setFollowing] = useState(initialFollowing);
    const [loading, setLoading] = useState(false);
    
    const handleClick = async () => {
        setLoading(true);
        try {
            if (following) {
                await onUnfollow?.(mention);
                setFollowing(false);
            } else {
                await onFollow?.(mention);
                setFollowing(true);
            }
        } catch (error) {
            console.error('팔로우 실패:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return following ? (
        <button
            onClick={handleClick}
            disabled={loading}
            className="bg-gray-600 hover:bg-red-600 px-8 py-2 rounded-md transition-colors duration-200 flex items-center 
                space-x-2 disabled:opacity-50"
        >
            <span>팔로잉</span>
            <X size={16} />
        </button>
    ) : (
        <button
            onClick={handleClick}
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-sky-500 hover:from-pink-600 hover:to-sky-600 px-8 py-2 rounded-md 
                transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
        >
            <span>팔로우</span>
            <Plus size={16} />
        </button>
    );
}