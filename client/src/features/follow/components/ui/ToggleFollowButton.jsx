import { useToggleFollow } from "../../hooks/useToggleFollow";

export default function ToggleFollowButton({
    followReqUser,
    followResUser,
    onFollowChange
}) {
    const baseClass = `inline-block rounded-full px-6 py-2 text-xs font-medium font-semibold 
        transition duration-200 disabled:opacity-50 flex items-center space-x-2
    `;

    const {
        isFollowing,    // 초기값 null
        loading,
        toggleFollow
    } = useToggleFollow(followReqUser, followResUser);

    const handleClick = async () => {
        try {
            const boolState = await toggleFollow();
            onFollowChange?.(boolState);
        } catch (error) {
            console.error(error);
        }
    };

    // 👉 서버에서 팔로우 상태 아직 못 받았을 때
    if (isFollowing === null) {
        return (
            <div className="inline-block w-[90px] h-[32px] rounded-full bg-neutral-700/50 animate-pulse" />
        );
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={
                isFollowing
                    ? `${baseClass} bg-gray-600 hover:bg-red-500 active:bg-red-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-red-500`
                    : `${baseClass} bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700`
            }
        >
            {isFollowing ? "팔로우 취소" : "팔로우"}
        </button>
    );
}
