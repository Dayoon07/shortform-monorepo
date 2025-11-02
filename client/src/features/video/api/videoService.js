import { data } from "react-router-dom";
import { API_LIST } from "../../../shared/constants/ApiList";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer"; 

export async function getVideoAll() {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO.ALL}`)
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            return data;
        } else if (res.ok && data.length) {
            console.log("데이터 없음");
        } else {
            console.log(res);
        }
    } catch (error) {
        console.log(error);
    }
}