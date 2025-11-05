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
