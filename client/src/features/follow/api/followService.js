import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { API_LIST } from "../../../shared/constants/ApiList";

export async function toggleFollow(mention) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.FOLLOW.TOGGLE_FOLLOW}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mention })
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            console.log(data.message);
        } else {
            console.log(await res.json());
        }
    } catch (error) {
        console.error(error);
        console.log(error);
    }
}

export async function upgradeToggleFollow(reqUserMention, resUserMention) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.FOLLOW.UPGRADE_TOGGLE_FOLLOW(reqUserMention, resUserMention)}`, {
            method: "POST"
        });
        if (!res.ok) {
            console.error(await res.json());
            throw new Error("너무 많은 요청으로 요청이 취소 되었습니다");
        }
        const data = await res.json();
        console.log(data);
        return { data: data };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 설명: 토글 방식의 팔로우 기능 만들어 놓은 거 잊어먹어서
//       밑에 있는 팔로우/언팔 각각 따로 함수 만들어 놓고 주석 처리 한겁니다. 
//       주석 처리 한 거 사용하지 말고 toggleFollow 함수 사용하세요
// export async function followUser(mention) {
//     try {
//         const res = await fetch(`${REST_API_SERVER}${API_LIST.FOLLOW.FOLLOW}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ mention })
//         });
//         if (!res.ok) throw new Error('Follow failed');
//         return await res.json();
//     } catch (error) {
//         console.error('Follow error:', error);
//         throw error;
//     }
// }

// export async function unfollowUser(userId) {
//     try {
//         const res = await fetch(`${REST_API_SERVER}/api/follow/${userId}`, {
//             method: 'DELETE'
//         });
//         if (!res.ok) throw new Error('Unfollow failed');
//         return await res.json();
//     } catch (error) {
//         console.error('Unfollow error:', error);
//         throw error;
//     }
// }

// 이거 만들어 이것도 만들어 놓고 나중에 새로 함수 만들어서 버렸습니다.
// 아래에 있는 getFollowStatus() 함수 사용
// export async function checkFollowStatus(mention) {
//     try {
//         const res = await fetch(`${REST_API_SERVER}${API_LIST.FOLLOW.FOLLOW_STATUS(mention)}`);
//         if (!res.ok) return false;
//         const data = await res.json();
//         console.log(data);
//         return data.isFollowing;
//     } catch (error) {
//         console.error('Check follow status error:', error);
//         return false;
//     }
// }

export async function getFollowStatus(reqUserMention, resUserMention) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.FOLLOW.FOLLOW_STATUS(reqUserMention, resUserMention)}`);
        if (!res.ok) throw new Error("에러남!!! " + await res.json());

        const data = await res.json();
        // console.log(data.isFollowing);
        return { data }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getFollowerList(id) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.FOLLOW.USER_FOLLOWER_LIST(id)}`);
        if (!res.ok) throw new Error("에러남!!!");
        const data = await res.json();
        console.log(data);
        return { data };
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getFollowingList(id) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.FOLLOW.USER_FOLLOWING_LIST(id)}`);
        if (!res.ok) throw new Error("에러남!!!");
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return false;
    }
}



