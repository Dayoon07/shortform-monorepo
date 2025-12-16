import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { Post } from "../../../entities/post/ui/Post";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";
import { WritePostRes } from "../../../entities/post/ui/WritePostRes";

export async function getUserPosts(mention: string): Promise<Post[]> {
    const res = await apiClient.get<Post[]>(API_LIST.POST.USER_POST(mention), false);
    if (!res.ok || res.data === undefined) throw new Error("해당 게시글을 찾을 수 없습니다: " + res);
    return res.data;
}

export async function createPost(formData: FormData): Promise<ApiResponse<WritePostRes>> {
    return await apiClient.post<WritePostRes>(
        API_LIST.POST.WRITE, true, formData);
}

export async function togglePostLike(communityUuid: string) {
    const res = await apiClient.post<any>(API_LIST.POST.TOGGLE_LIKE(communityUuid), true);
    if (!res.ok || res.data === undefined) throw new Error("에러 남: " + res);
    return res.data;
}

