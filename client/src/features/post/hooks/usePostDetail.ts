import { useState } from "react";
import { getPostDetail } from "../api/postService";
import { Post } from "../../../entities/post/ui/Post";

export const usePostDetail = (communityUuid: string) => {
    const [post, setPost] = useState<any | null>(null);    

    const getPostDetailHook = async () => {
        const res = await getPostDetail(communityUuid);
        console.log(`게시글: ${res}`);
        if (!res.ok || res.data === undefined) 
            throw new Error("해당 게시글을 찾을 수 없습니다: " + res);

        setPost(res.data);
    }

    return {
        post,
        getPostDetailHook
    };
}