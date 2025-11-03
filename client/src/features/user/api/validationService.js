import { API_LIST } from "../../../shared/constants/ApiList";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";

export async function validateUsername(username) {
    const response = await fetch(`${REST_API_SERVER}${API_LIST.USER.CHK_USERNAME(username)}`);
    return await response.json();
}

export async function validateEmail(email) {
    const response = await fetch(`${REST_API_SERVER}${API_LIST.USER.CHK_EMAIL(email)}`);
    return await response.json();
}
