import { PostWithProfile } from "../../entities/post/ui/PostWithProfile";
import { togglePostLike } from "../../features/post/api/postService";
import PostCard from "../../features/post/components/PostCard";
import { showSuccessToast, showErrorToast } from "../../shared/utils/toast";
import { cl } from "../../shared/constants/CurrentLocation";

export default function ProfilePostList({ posts }: { posts: PostWithProfile[] }) {
    const handleShare = async (cuuid: string) => {
        const post = posts.find(p => p.communityUuid === cuuid);
        if (!post) return;

        const url = `${cl}/@${post.mention}/post/${cuuid}`;
        
        try {
            await navigator.clipboard.writeText(url);
            showSuccessToast('링크가 복사되었습니다');
        } catch (error) {
            console.error('링크 복사 실패:', error);
            showErrorToast("링크 복사에 실패했습니다");
        }
    };

    const handleLike = async (communityUuid: string) => {
        const res = await togglePostLike(communityUuid);
        if (!res.ok || res.data === undefined) {
            showErrorToast('좋아요 처리에 실패했습니다.');
            throw new Error("에러 남: " + res);
        }
        console.log(res.data);
    };

    if (!posts || posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <svg 
                    className="w-16 h-16 mb-4 text-gray-500"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                <h2 className="text-xl font-semibold mb-2">게시글이 없습니다</h2>
                <p className="text-gray-500 text-sm">아직 작성된 게시글이 없어요</p>
            </div>
        );
    }

    return (
        <div className="md:max-w-6xl md:mx-auto sm:max-w-lg md:pt-20 p-4 space-y-4">
            {posts.map((post) => (
                <PostCard 
                    key={post.communityUuid || post.id}
                    post={post}
                    onLike={() => handleLike(post.communityUuid)}
                    onShare={handleShare}
                />
            ))}
        </div>
    );
}