import { useState } from "react";
import { REST_API_SERVER } from "../../shared/constants/ApiServer";
import { useComment } from "../../features/comment/hooks/useComment";
import { showSuccessToast } from "../../shared/utils/toast";
import { CommentList } from "../../features/comment/components/CommentList";
import { User } from "../../entities/user/model/User";
import { X } from "lucide-react";

interface CommentModalWidgetProps {
    open: boolean,
    onClose: () => void,
    videoCommentSize: number,
    user: User,
    videoId: number
}

export function CommentModal({ 
    open, 
    onClose, 
    videoCommentSize = 0, 
    user, 
    videoId
}: CommentModalWidgetProps) {
    const [commentText, setCommentText] = useState<string>("");
    const [sortType, setSortType] = useState<string>("popular");
    const { 
        commentWrite,
        commentList
    } = useComment(videoId);

    const handleCommentWrite = async () => showSuccessToast(await commentWrite(videoId, commentText, user.mention));

    if (!open) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-75 
            backdrop-blur-sm z-50 flex items-center justify-center p-4" 
        >
            <div onClick={(e) => e.stopPropagation()} className="bg-gray-900 rounded-2xl 
                w-full max-w-2xl h-3/4 flex flex-col shadow-2xl"
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">댓글 {videoCommentSize}개</h2>

                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                            <button onClick={() => setSortType("popular")}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    sortType === "popular"
                                        ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                                        : "bg-gray-700 hover:bg-gray-600 text-white"
                                }`}
                            >
                                인기순
                            </button>

                            <button onClick={() => setSortType("recent")}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    sortType === "recent"
                                        ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                                        : "bg-gray-700 hover:bg-gray-600 text-white"
                                }`}
                            >
                                최신순
                            </button>
                        </div>

                        <button className="text-gray-400 hover:text-white transition-colors duration-200"
                            onClick={onClose}
                        >
                            {/* 
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            */}
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <CommentList commentList={commentList} />

                {user && (
                    <div className="p-4 border-t border-gray-700">
                        <div className="flex space-x-3">
                            <img src={user.social ? user.profileImgSrc : REST_API_SERVER + user.profileImgSrc}
                                alt="profile" className="w-10 h-10 p-0.5 rounded-full object-cover"
                                style={{ background: "linear-gradient(to right, #ec4899, #0ea5e9)" }}
                            />

                            <div className="flex-1 flex space-x-2 items-center">
                                <textarea className="flex-1 bg-gray-800 text-white px-3 py-2 h-[40px] rounded-full text-sm focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 resize-none"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="댓글을 입력하세요..."
                                ></textarea>

                                <button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-4 
                                    py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105"
                                    onClick={() => {
                                        if (commentText.trim() === "") return;
                                        handleCommentWrite()
                                        setCommentText("");
                                    }}
                                >
                                    전송
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
