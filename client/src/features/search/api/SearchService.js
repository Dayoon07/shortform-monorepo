import { API_LIST } from "../../../shared/constants/ApiList";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";

export async function searchVideoLogic(query, mention) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.SEARCH.SEARCH(query, mention)}`);
        if (!res.ok) throw new Error("에러남!!!");

        const data = await res.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getSearchHistory(userId) {
    const res = await fetch(`${REST_API_SERVER}${API_LIST.SEARCH.SEARCH_LIST(userId)}`);
    if (!res.ok) {
        throw new Error(`검색 기록 불러오기 실패: HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.slice(0, 30);
}

export async function deleteSearchWord(userId, searchWord) {
    const res = await fetch(`${REST_API_SERVER}${API_LIST.SEARCH.SEARCH_WORD_DELETE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: userId,
            searchWord: searchWord
        }),
    });
    
    if (!res.ok) {
        throw new Error(`검색어 삭제 실패: HTTP ${res.status}`);
    }

    return true;
}
