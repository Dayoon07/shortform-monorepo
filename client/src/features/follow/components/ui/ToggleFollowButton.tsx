import { User } from "../../../../entities/user/model/User";
import { useToggleFollow } from "../../hooks/useToggleFollow";

interface ToggleFollowButtonProps {
    followReqUser: User | null,
    followResUser: User,
    onFollowChange?: (param: boolean) => void
}

export default function ToggleFollowButton({
    followReqUser,
    followResUser,
    onFollowChange
}: ToggleFollowButtonProps) {
    const baseClass = `inline-block rounded-full px-6 py-2 text-xs font-medium 
        font-semibold transition duration-200 disabled:opacity-50`;
    const following = `bg-red-500 hover:bg-red-600 active:bg-red-600 
        dark:bg-neutral-700 text-white dark:hover:bg-red-500`;
    const follow = `bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300 
        dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700`;
    const {
        isFollowing, 
        loading,
        upgradeToggleFollowHook
    } = useToggleFollow(followReqUser, followResUser);

    const handleClick = async (): Promise<void> => {
        const boolState: boolean = await upgradeToggleFollowHook();
        onFollowChange?.(boolState);
    };

    if (!followReqUser || followReqUser.id === followResUser.id) 
        return null;
    if (isFollowing === null) 
        return null; // <--- 이 부분이 핵심 수정입니다.

    return followReqUser && 
        <button 
            onClick={handleClick} 
            disabled={loading} 
            className={`${baseClass} ${
                isFollowing ? following : follow
            }`}>
                {isFollowing ? "팔로우 취소" : "팔로우"}
        </button>
}