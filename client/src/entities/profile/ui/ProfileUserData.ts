import { VideoGridContent } from "../../video/ui/VideoGridContent";
import { ProfileUserInfo } from "./ProfileUserInfo";

export interface ProfileUserData {
    profileVideosInfo: VideoGridContent[],
    profileInfo: ProfileUserInfo | null
}