import { API_LIST } from "../../../shared/constants/ApiList";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";

export async function searchVideoLogic(query) {
    const user = JSON.parse(localStorage.getItem("user"));
    const mention = user?.mention ?? ""; // optional chaining + null 병합 연산자

    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.SEARCH(query, mention)}`);
        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.error(error);
    }
}
