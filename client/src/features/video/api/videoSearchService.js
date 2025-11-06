import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { API_LIST } from "../../../shared/constants/ApiList";

export async function searchVideo(query) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO.SEARCH(query)}`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            return { data: data }
        } else {
            return { data: [] }
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}