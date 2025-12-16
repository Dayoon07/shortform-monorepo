import Modal from "../../shared/components/common/Modal";
import { Link } from "react-router-dom";
import { ROUTE } from "../../shared/constants/Route";
import { RandomVideoSwipe } from "../../entities/video/ui/RandomVideoSwipe";

interface ShowModalProps {
    open: boolean,
    onClose: () => void,
    v: RandomVideoSwipe
}

export function VideoInfoModal({ open, onClose, v }: ShowModalProps) {
    if (!open) return null;

    return (
        <Modal onClose={onClose} title="설명" titleAlign="left">
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
        </Modal>
    );
}
