import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../shared/constants/Route";
import { RandomVideoSwipe } from "../../entities/video/ui/RandomVideoSwipe";

interface ShowModalProps {
    open: boolean,
    onClose: () => void,
    v: RandomVideoSwipe
}

export function VideoInfoModal({ open, onClose, v }: ShowModalProps) {
    const modalBackground = `
        fixed inset-0 bg-black bg-opacity-75 z-50 flex 
        items-center justify-center p-4 text-black
    `;
    const modal = `bg-white rounded-2xl w-full max-w-lg h-3/4 flex flex-col shadow-2xl`;
    
    if (!open) return null;

    return (
        <div onClick={onClose} className={modalBackground}>
            <div onClick={(e) => e.stopPropagation()} className={modal}>

                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <h2 className="text-xl font-bold">설명</h2>
                    <X onClick={onClose} className="cursor-pointer" />
                </div>

                <div className="p-4">
                    <div className="border-b border-gray-300 pb-4">{v.video.videoTitle}</div>

                    <div className="flex justify-center items-center text-center py-4">
                        <div>
                            <span className="font-semibold text-xl">{v.likeCnt || '없음'}</span><br />
                            <span className="font-light text-sm text-gray-400">좋아요</span>
                        </div>
                        <div className="mx-20">
                            <span className="font-semibold text-xl">{v.video.videoViews || '없음'}</span><br />
                            <span className="font-light text-sm text-gray-400">조회수</span>
                        </div>
                        <div>
                            <span className="font-semibold text-xl">
                                {v.video.uploadAt.split("T")[0].substring(5, 7) + '월'} {' '}
                                {v.video.uploadAt.split("T")[0].substring(8, 10) + '일'}
                            </span><br />
                            <span className="font-light text-sm text-gray-400">
                                {v.video.uploadAt.split("T")[0].substring(0, 4)}년
                            </span>
                        </div>
                    </div>

                    {(v.video.videoDescription || v.video.videoTag) && 
                        <div className="p-2 m-2 bg-gray-100 rounded-md">
                            <pre className="whitespace-pre-wrap [font-family:inherit] text-[14px]">
                                {v.video.videoDescription != null ? v.video.videoDescription : ""}
                            </pre>
                            {(v.video.videoDescription && v.video.videoTag) && <br/>}
                            {v.video.videoTag && v.video.videoTag.split(' ').map((tag, index) => (
                                <Link key={index} to={ROUTE.HASHTAG(tag.trim())} className="text-blue-400 text-[14px] mr-2 hover:underline">
                                    {'#' + tag.trim()}
                                </Link>
                            ))}
                        </div>
                    }
                </div>

            </div>
        </div>
    );
}
