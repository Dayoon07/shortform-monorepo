import { SearchHistory } from "../../../entities/search/ui/SearchHistory";
import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";
import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";

export async function searchVideoLogic(query: string): Promise<ApiResponse<VideoGridContent[]>> {
    return await apiClient.get<VideoGridContent[]>(API_LIST.SEARCH.SEARCH, false, {
        "q": query});
}

export async function getSearchHistory(i: number): Promise<SearchHistory[]> {
    const res = await apiClient.get<SearchHistory[]>(API_LIST.SEARCH.HISOTRY(i), false);
    return res.data?.slice(0, 30) ?? [];
}

export async function deleteSearchWord(sw: string) {
    const res = await apiClient.get(API_LIST.SEARCH.WORD_DELETE, true, {
        "searchWord": sw
    });
    if (!res.ok) throw new Error(`검색어 삭제 실패: HTTP ${res.status}`);
    return true;
}






