import { User } from "../../user/model/User";

export interface CommentCreateRes {
    commentText: string,
    userObj: User
}