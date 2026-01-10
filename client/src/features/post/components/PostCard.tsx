import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThumbsUp, Share2, MoreVertical, MessageSquareText } from "lucide-react";
import { ROUTE } from "../../../shared/constants/Route";
import { PostWithProfile } from "../../../entities/post/ui/PostWithProfile";
import { Image } from "../../../shared/components/common/custom/Image";
import { defaultFormatDate } from "../../../shared/utils/formatUtil";
import ImageGrid from "../../../shared/components/post/ImageGrid";
import { cl } from "@/shared/constants/CurrentLocation";
import { showErrorToast } from "@/shared/utils/toast";
import { togglePostLike } from "../api/postService";
import { ApiResponse } from "@/shared/utils/ApiClient";
import { PostLikeReq } from "@/entities/post/ui/PostLikeReq";
import { useShare } from "@/shared/hooks/useShare";

export default function PostCard({ post }: { post: PostWithProfile }) {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(post.likeCnt || 0);
    const { shareFunc } = useShare();
    const navigate = useNavigate();
    const imageClickHandler = () => navigate(ROUTE.POST_DETAIL(post.mention, post.communityUuid));
    const shareHandler = async (cuuid: string) => shareFunc(`${cl}/@${post.mention}/post/${cuuid}`);

    const likeHandler = async (communityUuid: string) => {
        const res: ApiResponse<PostLikeReq> = await togglePostLike(communityUuid);
        if (!res.ok || res.data === undefined) {
            showErrorToast('좋아요 처리에 실패했습니다.');
            throw new Error("에러 남: " + res);
        }

        if (res.data.like === true) {
            setIsLiked(res.data.like);
            setLikeCount(res.data.count);
        } else {
            setIsLiked(res.data.like);
            setLikeCount(res.data.count);
        }
    };

    useEffect(() => {
        setLikeCount(post.likeCnt || 0);
    }, [post]);

    return (
        <div className="border rounded overflow-hidden">
            <div className="flex p-4">
                <div className="w-12 flex-shrink-0">
                    <Link to={ROUTE.PROFILE(post.mention)}>
                        <Image 
                            url={post.profileImgSrc}
                            alt={post.username}
                            social={post.social}
                            provider={post.provider}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </Link>
                </div>
                <div className="flex-grow">
                    <div className="flex items-center">
                        <p className="font-bold mr-4">{post.username}</p>
                        <p className="text-xs text-gray-500">{defaultFormatDate(post.createAt)}</p>
                    </div>
                    <div className="mt-1">
                        <p className="mb-2 cursor-pointer whitespace-pre-wrap break-words text-sm md:text-base" 
                            onClick={imageClickHandler}>
                            {post.communityText !== null 
                                ? post.communityText 
                                : <span className="text-sm text-gray-400">게시글 보기</span>}
                        </p>

                        <ImageGrid files={post.files} gridType="inline" />
                    </div>
                </div>
                <div className="w-10">
                    <button className="text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="px-4 pb-2">
                <div className="flex space-x-6 items-center">
                    <button
                        onClick={() => likeHandler(post.communityUuid)}
                        className="flex items-center gap-1 text-gray-700 hover:text-black active:scale-95 transition"
                    >
                        <div className="p-2 rounded-full hover:bg-gray-200 transition">
                            <ThumbsUp
                                className={`w-6 h-6 ${
                                    isLiked ? "fill-red-500 text-red-500" : ""
                                }`}
                            />
                        </div>
                        <span className="text-xs font-medium">
                            {likeCount}
                        </span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-gray-700 hover:text-black active:scale-95 transition">
                        <div className="p-2 rounded-full hover:bg-gray-200 transition">
                            <MessageSquareText className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium">
                            {post.commentCnt || 0}
                        </span>
                    </button>

                    <button
                        onClick={() => shareHandler(post.communityUuid)}
                        className="flex items-center gap-1 text-gray-700 hover:text-black active:scale-95 transition"
                    >
                        <div className="p-2 rounded-full hover:bg-gray-200 transition">
                            <Share2 className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium">
                            공유
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}