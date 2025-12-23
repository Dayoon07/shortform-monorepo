import { API_LIST } from "../../constants/ApiCollectionList";
import { apiClient } from "../../utils/ApiClient";

export async function validateUsername(u: string): Promise<boolean> {
    const r = await apiClient.get<boolean>(API_LIST.USER.CHECK_USERNAME(u), false);
    if (!r.ok || r.data === undefined) throw new Error("에러: " + r);
    return r.data;
}

export async function validateEmail(e: string): Promise<boolean> {
    const r = await apiClient.get<boolean>(API_LIST.USER.CHECK_EMAIL(e), false);
    if (!r.ok || r.data === undefined) throw new Error("에러: " + r);
    return r.data;
}
