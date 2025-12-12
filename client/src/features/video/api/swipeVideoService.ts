import { RandomVideoSwipe } from "../../../entities/video/ui/RandomVideoSwipe";
import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";

export async function getRandomVideo(
    mention: string | null, excludeIds: number[] = []
): Promise<ApiResponse<RandomVideoSwipe>> {
    const res = await apiClient.post<RandomVideoSwipe>(API_LIST.VIDEO.RANDOM(excludeIds, mention), false);
    console.log(res.data);
    return res;
}

export async function getFirstSwipeVideo(
    videoLoc: string, mention: string | null
): Promise<ApiResponse<RandomVideoSwipe>> {
    return await apiClient.post<RandomVideoSwipe>(
        API_LIST.VIDEO.FIRST_SWIPE_VIDEO(videoLoc, mention), false);
}

export async function toggleVideoLike(videoId: number): Promise<ApiResponse<any>> {
    const res = await apiClient.post<any>(API_LIST.VIDEO_LIKE.TOGGLE, true, {
        "videoId": videoId
    });
    console.log(res.data);
    return res.data;
}