import { User } from "../../../../entities/user/model/User";
import { useToggleFollow } from "../../hooks/useToggleFollow";
import "./ToggleFollowButton.scss";

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
    const {
        isFollowing,    // 초기값 null
        loading,
        toggleFollow
    } = useToggleFollow(followReqUser, followResUser);

    const handleClick = async (): Promise<void> => {
        try {
            const boolState: boolean = await toggleFollow();
            onFollowChange?.(boolState);
        } catch (error) {
            console.error(error);
        }
    };

    if (!followReqUser || followReqUser.id === followResUser.id) {
        return null;
    }

    // 서버에서 팔로우 상태 아직 못 받았을 때
    if (isFollowing === null) {
        return (
            <div className="inline-block w-[90px] h-[32px] rounded-full bg-neutral-700/50 animate-pulse" />
        );
    }

    return ( 
        followReqUser && <button
            onClick={handleClick}
            disabled={loading}
            className={
                isFollowing ? `${'base-class'} following` : `${'base-class'} follow`
            }
        >
            {isFollowing ? "팔로우 취소" : "팔로우"}
        </button>
    );
}
