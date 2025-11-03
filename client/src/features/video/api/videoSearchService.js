import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { API_LIST } from "../../../shared/constants/ApiList";

export async function searchVideo(query) {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO.SEARCH(query)}`);
        if (res.ok) {
            const data = res.json();
            return {
                data: data
            }
        }
    } catch (error) {
        console.log(error);
    }
}