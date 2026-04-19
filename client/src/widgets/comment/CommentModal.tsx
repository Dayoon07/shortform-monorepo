import { useState } from "react";
import { useComment } from "../../features/comment/hooks/useComment";
import { showSuccessToast } from "../../shared/utils/toast";
import { CommentList } from "../../features/comment/components/CommentList";
import { User } from "../../entities/user/model/User";
import { ChevronDown, X } from "lucide-react";
import { Image } from "../../shared/components/common/custom/Image";
import { CommentCreateRes } from "../../entities/comment/ui/CommentCreateRes";

interface CommentModalWidgetProps {
    open: boolean,
    onClose: () => void,
    videoCommentSize: number,
    user: User | null,
    videoId: number
}

enum SortType { POPULAR = "popular", RECENT = "recent" }

export function CommentModal({ 
    open, 
    onClose, 
    videoCommentSize = 0, 
    user, 
    videoId
}: CommentModalWidgetProps) {
    const [createdComments, setCreatedComments] = useState<CommentCreateRes[]>([]);
    const [commentText, setCommentText] = useState<string>("");
    const [sortType, setSortType] = useState<string>(SortType.POPULAR);
    const [vdoCommentSize, setVdoCommentSize] = useState<number>(videoCommentSize);
    const { 
        commentWrite,
        commentList
    } = useComment(videoId);

    const handleCommentSubmit = async () => {
        if (user !== null && commentText.trim()) {
            const res = await commentWrite(videoId, commentText);
            showSuccessToast("댓글이 작성되었습니다");
            setVdoCommentSize(prev => prev + 1);
            setCreatedComments(prev => [res, ...prev]); // 새 댓글을 맨 앞에 추가
            setCommentText(""); // 입력창 초기화
        }
    };

    if (!open) return null;

    return (
        <div 
            onClick={onClose} 
            className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                onWheel={(e) => e.stopPropagation()} // 휠 이벤트 전파 차단 - 문제 1 해결
                className="bg-white rounded-2xl w-full max-w-2xl h-3/4 flex flex-col shadow-2xl"
            >
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-xl font-bold">댓글 {vdoCommentSize}개</h2>

                    <div className="flex items-center space-x-3">
                        <div className="relative group">
                            <select value={sortType} onChange={(e) => setSortType(e.target.value)}
                                className="appearance-none focus:outline-none bg-gray-100 hover:bg-gray-200 text-sm font-medium 
                                    pl-4 pr-10 py-2 rounded-lg cursor-pointer transition-colors duration-200"
                            >
                                <option value={SortType.POPULAR}>인기순</option>
                                <option value={SortType.RECENT}>최신순</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                        </div>

                        <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                </div>

                <CommentList 
                    commentList={commentList} 
                    createdComments={createdComments}
                />

                {user && (
                    <div className="p-4">
                        <div className="flex space-x-3">
                            <Image 
                                url={user.profileImgSrc}
                                social={user.social}
                                provider={user.provider}
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

                                <button 
                                    className="px-4 py-2 rounded-full text-sm bg-black text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                                    onClick={handleCommentSubmit}
                                    disabled={!commentText.trim()}
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