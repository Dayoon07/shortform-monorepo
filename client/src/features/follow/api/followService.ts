import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";
import { ToggleFollowRes } from "../../../entities/follow/ui/ToggleFollowRes";
import { FollowStatusRes } from "../../../entities/follow/ui/FollowStatusRes";
import { showErrorToast } from "../../../shared/utils/toast";
import { FollowingData } from "../../../entities/follow/ui/FollowingData";

export async function upgradeToggleFollow(
    reqUserMention: string,
    resUserMention: string
): Promise<ToggleFollowRes> {
    const res = await apiClient.post<ToggleFollowRes>(API_LIST.FOLLOW.TOGGLE_UPG_VER, true, {
        "reqMention": reqUserMention,
        "resMention": resUserMention
    });

    if (!res.ok) {
        console.error(res);
        throw new Error("너무 많은 요청으로 요청이 취소 되었습니다");
    }

    if (res.data === undefined){
        showErrorToast(res.data);
        throw new Error(res.data);
    }

    console.log(res);
    return res.data;
}

export async function getFollowStatus(
    reqUserMention: string,
    resUserMention: string
): Promise<ApiResponse<FollowStatusRes>> {
    return await apiClient.get<FollowStatusRes>(
        API_LIST.FOLLOW.STATUS(reqUserMention, resUserMention), 
        false);
}

export async function getFollowerList(id: number): Promise<ApiResponse<FollowingData[]>> {
    return await apiClient.get<FollowingData[]>(API_LIST.FOLLOW.USER_FOLLOWER_LIST(id), false);
}

export async function getFollowingList(id: number): Promise<ApiResponse<FollowingData[]>> {
    return await apiClient.get<FollowingData[]>(API_LIST.FOLLOW.USER_FOLLOWING_LIST(id), false);
}



