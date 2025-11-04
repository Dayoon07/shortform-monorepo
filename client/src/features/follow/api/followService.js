import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { API_LIST } from "../../../shared/constants/ApiList";

export async function followToggle(mention) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.FOLLOW.FOLLOW_TOGGLE}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mention })
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data);
        } else {
            console.log(await res.json());
        }
    } catch (error) {
        console.log(error);
    }
}

// 설명: 토글 방식의 팔로우 기능 만들어 놓은 거 잊어먹어서
//       밑에 있는 팔로우/언팔 각각 따로 함수 만들어 놓고 주석 처리 한겁니다. 
//       toggleFollow 함수 쓰세요
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

export async function checkFollowStatus(mention) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.FOLLOW.FOLLOW_STATUS}`, {
            method: "GET",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ mention })
        });
        if (!res.ok) return false;
        const data = await res.json();
        console.log(data);
        return data.isFollowing;
    } catch (error) {
        console.error('Check follow status error:', error);
        return false;
    }
}







