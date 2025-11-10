export default function ProfilePostList({ posts }) {
    return (
        <div className="sm:max-w-6xl sm:mx-auto flex flex-col divide-y divide-gray-800">
            {posts.map((post) => (
                <div key={post.id} className="p-4">
                    <div className="flex items-center mb-2">
                        <img
                            src={post.profileImgSrc}
                            alt={post.username}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <p className="font-semibold">{post.username}</p>
                            <p className="text-gray-400 text-sm">@{post.mention}</p>
                        </div>
                    </div>

                    <p className="text-white mb-3">{post.communityText}</p>

                    {post.files && (
                        <img
                            src={post.files}
                            alt="post content"
                            className="rounded-2xl w-full object-cover"
                        />
                    )}

                    <div className="flex justify-between mt-3 text-gray-400 text-sm">
                        <span>❤️ {post.likeCnt}</span>
                        <span>💬 {post.commentCnt}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
