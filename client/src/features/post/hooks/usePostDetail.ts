import { useEffect, useState } from "react";
import { getPostDetail } from "../api/postService";
import { Post } from "../../../entities/post/ui/Post";

export const usePostDetail = (communityUuid: string) => {
    const [post, setPost] = useState<Post | null>(null);    

    useEffect(() => {
        const init = async () => {
            const res = await getPostDetail(communityUuid);
            console.log(`게시글: ${res}`);
            if (!res.ok || res.data === undefined) 
                throw new Error("해당 게시글을 찾을 수 없습니다: " + res);

            console.log("post: " + res.data);
            setPost(res.data);
        }
        init();
    }, [communityUuid]);

    return { post };
}