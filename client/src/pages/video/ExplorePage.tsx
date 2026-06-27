import { useEffect, useState } from "react";
import { getExploreVideos } from "../../features/video/api/videoService";
import { VideoGridContent } from "../../entities/video/ui/VideoGridContent";
import { CommonVideoGrid } from "../../shared/components/video/CommonVideoGrid";
import { Loading } from "../../shared/components/common/Loading";
import { showErrorToast } from "../../shared/utils/toast";

export default function ExplorePage() {
    const [videos, setVideos] = useState<VideoGridContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const res = await getExploreVideos();
            setLoading(false);
            if (!res.ok || res.data === undefined) {
                showErrorToast("추천 영상을 불러오지 못했습니다");
                return;
            }
            setVideos(res.data);
        })();
    }, []);

    if (loading) return <Loading message="추천 영상을 불러오는 중..." />;

    return (
        <main className="flex-1">
            <h1 className="text-xl font-bold px-4 pt-4">추천</h1>
            <CommonVideoGrid videos={videos} message="추천할 영상이 없습니다" />
        </main>
    );
}
