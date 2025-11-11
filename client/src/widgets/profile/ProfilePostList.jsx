import PostCard from "../../features/post/components/ui/PostCard";
import { showSuccessToast, showErrorToast } from "../../shared/utils/toast";

export default function ProfilePostList({ posts }) {
    const handleShare = async (communityUuid) => {
        const post = posts.find(p => p.communityUuid === communityUuid);
        if (!post) return;

        const url = `${window.location.origin}/@${post.mention}/post/${communityUuid}`;
        
        try {
            await navigator.clipboard.writeText(url);
            showSuccessToast('링크가 복사되었습니다');
        } catch (error) {
            console.error('링크 복사 실패:', error);
            showErrorToast("링크 복사에 실패했습니다");
        }
    };

    if (!posts || posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <svg 
                    className="w-12 h-12 mb-3 text-gray-500"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2"
                        d="M9 13h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z"
                    />
                </svg>
                <h1 className="text-lg font-medium">게시글이 없습니다.</h1>
            </div>
        );
    }

    return (
        <div className="p-4 md:pl-4 md:pr-20 max-md:pb-40">
            <div className="space-y-6">
                {posts.map((post) => (
                    <div key={post.communityUuid || post.id} className="md:max-w-[600px]">
                        <PostCard 
                            post={post}
                            onShare={handleShare}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}