import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { API_LIST } from "../../../shared/constants/ApiList";

export async function getPosts(mention) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.POST.USER_POST(mention)}`);
        if (!res.ok) throw new Error('해당 게시물을 찾을 수 없습니다.');
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('게시물 수신 실패:', error);
        return [];
    }
}