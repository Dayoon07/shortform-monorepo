import { User } from "../model/User";

export interface EditResponse {
    status: boolean,
    message: string,
    profileImgPath: string,
    data: User
}