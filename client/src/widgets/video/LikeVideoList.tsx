import { useEffect, useState } from "react";
import { CommonVideoGrid } from "../../shared/components/video/CommonVideoGrid";
import { myLikeVideoList } from "../../features/video/api/videoLikeService";
import { useUser } from "../../shared/context/UserContext";
import ToGoPage from "../../shared/components/common/ToGoPage";
import { VideoGridContent } from "../../entities/video/ui/VideoGridContent";

export default function LikeVideoList() {
    const [videos, setVideos] = useState<VideoGridContent[]>([]);
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;
        const likeVideo = async (mention: string) => {
            try {
                const data: VideoGridContent[] = await myLikeVideoList(mention);
                console.log(data);
                setVideos(data || []);
            } catch (error) {
                console.error(error);
            }
        }
        likeVideo(user.mention);
    }, [user]);

    if (!user || user == null) return <ToGoPage errorMessage="로그인이 필요합니다" />

    return <CommonVideoGrid videos={videos} message="좋아요를 누른 영상이 없습니다" />
}