import { REST_API_SERVER } from "../constrants/ApiServer";
import { API_LIST } from "../constrants/ApiList";

export async function validateUsername(username) {
    const response = await fetch(`${REST_API_SERVER}${API_LIST.USER.CHK_USERNAME(username)}`);
    return await response.json();
}

export async function validateEmail(email) {
    const response = await fetch(`/api/user/chk/mail?mail=${email}`);
    return await response.json();
}
