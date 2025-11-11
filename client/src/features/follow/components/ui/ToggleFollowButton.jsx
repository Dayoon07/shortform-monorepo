import { Plus, X } from "lucide-react";
import { useToggleFollow } from "../../hooks/useToggleFollow";

let logCnt = 1;
export default function ToggleFollowButton({ followReqUser, followResUser }) {
    const {
        isFollowing, 
        messageData, 
        loading, 
        toggleFollow 
    } = useToggleFollow(followReqUser, followResUser);

    console.log(messageData);
    console.log(`랜더링이 몇번 일어나는지 확인하는 로그: ${++logCnt}`);

    const handleClick = async () => {
        try {
            await toggleFollow();
        } catch (error) {
            console.error(error);
        }
    };

    return isFollowing ? (
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
                transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 mx-auto"
        >
            <span>팔로우</span>
            <Plus size={16} />
        </button>
    );
}