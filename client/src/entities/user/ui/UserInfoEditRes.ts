import { User } from "../model/User";

export interface UserInfoEditResponse {
    status: boolean,
    message: string,
    profileImgPath: string,
    data: User
}