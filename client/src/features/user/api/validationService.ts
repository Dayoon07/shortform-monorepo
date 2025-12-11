import { API_LIST, REST_API_SERVER } from "../../../shared/constants/ApiCollectionList";

export async function validateUsername(username: string): Promise<boolean> {
    const response = await fetch(`${REST_API_SERVER}${API_LIST.USER.CHECK_USERNAME(username)}`);
    return await response.json();
}

export async function validateEmail(email: string): Promise<boolean> {
    const response = await fetch(`${REST_API_SERVER}${API_LIST.USER.CHECK_EMAIL(email)}`);
    return await response.json();
}
