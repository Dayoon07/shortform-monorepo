import { useCallback, useEffect, useState } from "react";
import { CommonVideoGrid } from "../../shared/components/video/CommonVideoGrid";
import { myLikeVideoList } from "../../features/video/api/videoService";
import { useUser } from "../../shared/context/UserContext";
import ToGoPage from "../../shared/components/common/ToGoPage";
import { VideoGridContent } from "../../entities/video/ui/VideoGridContent";
import { showErrorToast } from "../../shared/utils/toast";

export default function LikeVideoList() {
    const [videos, setVideos] = useState<VideoGridContent[]>([]);
    const { user } = useUser();

    const initDataReq = useCallback(async () => {
        if (user == null || user === undefined || !user) return;
        const res = await myLikeVideoList(user.id);
        if (!res.ok || res.data === undefined) {
            setVideos([]);
            showErrorToast(res);
            throw new Error("에러남: " + res);
        }
        setVideos(res.data);
    }, [user]);

    useEffect(() => {
        initDataReq();
    }, [initDataReq]);

    if (!user || user == null) return <ToGoPage errorMessage="로그인이 필요합니다" />

    return <CommonVideoGrid 
        videos={videos} 
        message="좋아요를 누른 영상이 없습니다" />
}