import { SearchHistory } from "../../../entities/search/ui/SearchHistory";
import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";
import { API_LIST } from "../../../shared/constants/ApiList";
import { apiClient } from "../../../shared/utils/ApiClient";

export async function searchVideoLogic(query: string): Promise<VideoGridContent[]> {
    const res = await apiClient.get<VideoGridContent[]>(
        API_LIST.SEARCH.SEARCH, false, { "q": query });
    if (!res.ok) throw new Error("뭐 때문인지는 모르겠으나 에러: " + res);
    if (res.data === undefined) throw new Error("검색어에 해당하는 데이터가 없습니다: " + res);
    return res.data;
}

export async function getSearchHistory(i: number): Promise<SearchHistory[]> {
    const res = await apiClient.get<SearchHistory[]>(API_LIST.SEARCH.HISOTRY(i), false);
    if (!res.ok) throw new Error("검색어를 가져오지 못 했습니다: " + res);
    if (!res.data === undefined) throw new Error("검색어를 찾을 수 없습니다: " + res);
    return res.data?.slice(0, 30) ?? [];
}

export async function deleteSearchWord(sw: string) {
    const res = await apiClient.get(API_LIST.SEARCH.WORD_DELETE, true, {
        "searchWord": sw
    });
    if (!res.ok) throw new Error(`검색어 삭제 실패: HTTP ${res.status}`);
    return true;
}






