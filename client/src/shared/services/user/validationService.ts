import { API_LIST } from "../../constants/ApiCollectionList";
import { apiClient } from "../../utils/ApiClient";

export async function validateUsername(username: string): Promise<boolean> {
    const r = await apiClient.get<boolean>(API_LIST.USER.CHECK_USERNAME(username), false);
    if (!r.ok || r.data === undefined) throw new Error("에러: " + r);
    return r.data;
}

export async function validateEmail(email: string): Promise<boolean> {
    const r = await apiClient.get<boolean>(API_LIST.USER.CHECK_EMAIL(email), false);
    if (!r.ok || r.data === undefined) throw new Error("에러: " + r);
    return r.data;
}
