import { useEffect, useState } from "react";
import { CommonVideoGrid } from "../../shared/components/CommonVideoGrid";
import { myLikeVideoList } from "../../features/video/api/videoLikeService";
import { useUser } from "../../shared/context/UserContext";

export default function LikeVideoList() {
    const [videos, setVideos] = useState([]);
    const { user } = useUser();
    
    useEffect(() => {
        const likeVideo = async () => {
            try {
                const data = await myLikeVideoList(user.mention);
                console.log(data);
                setVideos(data || []);
            } catch (error) {
                console.error(error);
            }
        }
        likeVideo();
    }, [user?.mention]);
    
    return <CommonVideoGrid videos={videos} message="좋아요를 누른 영상이 없습니다" />
}