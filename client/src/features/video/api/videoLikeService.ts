import { VideoGridContent } from "../../../entities/video/ui/VideoGridContent";
import { API_LIST } from "../../../shared/constants/ApiList";
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";

export async function myLikeVideoList(mention: string): Promise<VideoGridContent[]> {
    try {
        const res = await fetch(`${REST_API_SERVER}${API_LIST.VIDEO_LIKE.MY_LIKE_VIDEOS(mention)}`);
        if (!res.ok) throw new Error("에러남!!!");
        const data: VideoGridContent[] = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}