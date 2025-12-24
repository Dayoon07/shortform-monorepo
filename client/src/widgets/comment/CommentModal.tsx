import { useState } from "react";
import { useComment } from "../../features/comment/hooks/useComment";
import { showSuccessToast } from "../../shared/utils/toast";
import { CommentList } from "../../features/comment/components/CommentList";
import { User } from "../../entities/user/model/User";
import { X } from "lucide-react";
import { Image } from "../../shared/components/common/custom/Image";
import { CommentCreateRes } from "../../entities/comment/ui/CommentCreateRes";

interface CommentModalWidgetProps {
    open: boolean,
    onClose: () => void,
    videoCommentSize: number,
    user: User | null,
    videoId: number
}

enum SortType {
    POPULAR = "popular",
    RECENT = "recent"
}

export function CommentModal({ 
    open, 
    onClose, 
    videoCommentSize = 0, 
    user, 
    videoId
}: CommentModalWidgetProps) {
    const [commentWriteText, setCommentWriteText] = useState<CommentCreateRes | null>(null);
    const [commentText, setCommentText] = useState<string>("");
    const [sortType, setSortType] = useState<string>(SortType.POPULAR);
    const [vdoCommentSize, setVdoCommentSize] = useState<number>(videoCommentSize);
    const { 
        commentWrite,
        commentList
    } = useComment(videoId);

    const c = async () => {
        if (user !== null) {
            const res = await commentWrite(videoId, commentText);
            showSuccessToast(res);
            setVdoCommentSize(videoCommentSize += 1);
            setCommentWriteText(res);
        }
    };

    if (!open) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-75 
            backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl 
                w-full max-w-2xl h-3/4 flex flex-col shadow-2xl">
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-xl font-bold">댓글 {vdoCommentSize}개</h2>

                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                            <button type="button" onClick={() => setSortType(SortType.POPULAR)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    sortType === SortType.POPULAR ? "text-white bg-black" : "text-black bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                인기순
                            </button>

                            <button type="button" onClick={() => setSortType(SortType.RECENT)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    sortType === SortType.RECENT ? "text-white bg-black" : "text-black bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                최신순
                            </button>
                        </div>

                        <button type="button" onClick={onClose} className="text-gray-400 hover:text-black duration-200">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <CommentList 
                    cList={commentList} 
                    cc={commentWriteText} 
                />

                {user && (
                    <div className="p-4">
                        <div className="flex space-x-3">
                            <Image 
                                url={user.profileImgSrc}
                                social={user.social}
                                alt="profile"
                                style={{ background: "linear-gradient(to right, #ec4899, #0ea5e9)" }}
                                className="w-10 h-10 p-0.5 rounded-full object-cover"
                            />

                            <div className="flex-1 flex space-x-2 items-center">
                                <textarea className="flex-1 bg-gray-200 px-3 py-2 h-[40px] rounded-full text-sm focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 resize-none"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="댓글을 입력하세요..."
                                ></textarea>

                                <button className="px-4 py-2 rounded-full text-sm bg-black text-white transition-all duration-200 transform hover:scale-105"
                                    onClick={() => {
                                        if (commentText.trim() === "") return;
                                        c()
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
