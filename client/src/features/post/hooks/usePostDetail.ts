import { useEffect, useState } from "react";
import { getPostDetail } from "../api/postService";
import { showErrorToast } from "../../../shared/utils/toast";
import { DetailPostWithProfile } from "../../../entities/post/ui/DetailPostWithProfile";

export const usePostDetail = (communityUuid: string | undefined) => {
    const [post, setPost] = useState<DetailPostWithProfile | null>(null);    

    useEffect(() => {
        const init = async () => {
            if (communityUuid === undefined) {
                showErrorToast("해당 게시글을 찾을 수 없습니다");
                return;
            }
            
            const res = await getPostDetail(communityUuid);

            if (!res.ok || res.data === undefined) {
                throw new Error("해당 게시글을 찾을 수 없습니다: " + res);
            }

            setPost(res.data);
        }
        init();
    }, [communityUuid]);

    return { post };
}