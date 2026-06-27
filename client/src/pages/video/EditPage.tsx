import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoEditInfo, editVideo } from "../../features/video/api/videoService";
import { Loading } from "../../shared/components/common/Loading";
import { showErrorToast, showSuccessToast } from "../../shared/utils/toast";
import { AvailabilityStatus } from "../../shared/constants/enums/AvailabilityStatus";
import { mediaUrl } from "../../shared/utils/mediaUrl";
import { extractThumbnail } from "../../shared/utils/thumbnailExtractor";

const inputCn = `w-full px-3 py-2 border border-gray-300 rounded-md
    focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed`;

export default function EditPage() {
    const { videoLoc } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [videoSrc, setVideoSrc] = useState<string>("");
    const [newVideo, setNewVideo] = useState<File | null>(null);
    const [newThumbnail, setNewThumbnail] = useState<File | Blob | null>(null);
    const [thumbnailAuto, setThumbnailAuto] = useState<boolean>(false);
    const [newVideoUrl, setNewVideoUrl] = useState<string>("");
    const [form, setForm] = useState({
        title: "", description: "", hashtags: "",
        visibility: AvailabilityStatus.PUBLIC as string,
        commentsAllowed: AvailabilityStatus.PUBLIC as string,
    });

    useEffect(() => {
        (async () => {
            if (!videoLoc) { setLoading(false); return; }
            const res = await getVideoEditInfo(videoLoc);
            setLoading(false);
            if (!res.ok || !res.data) {
                showErrorToast("영상 정보를 불러오지 못했습니다");
                return;
            }
            const d = res.data;
            setVideoSrc(mediaUrl(d.videoSrc));
            setForm({
                title: d.videoTitle ?? "",
                description: d.videoDescription ?? "",
                hashtags: d.videoTag ?? "",
                visibility: d.videoWatchAvailability ?? AvailabilityStatus.PUBLIC,
                commentsAllowed: d.commentAvailability ?? AvailabilityStatus.PUBLIC,
            });
        })();
    }, [videoLoc]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoLoc || !form.title.trim()) {
            showErrorToast("제목을 입력해주세요");
            return;
        }
        setSaving(true);
        const res = await editVideo({
            videoLoc,
            title: form.title,
            description: form.description,
            tag: form.hashtags,
            watchAvailability: form.visibility,
            commentAvailability: form.commentsAllowed,
            video: newVideo,
            thumbnail: newThumbnail,
        });
        setSaving(false);
        if (!res.ok) {
            showErrorToast("수정에 실패했습니다");
            return;
        }
        showSuccessToast("영상이 수정되었습니다");
        navigate(-1);
    };

    if (loading) return <Loading message="영상 정보를 불러오는 중..." />;

    return (
        <main className="flex-1 md:min-h-screen px-4 py-6 max-md:mt-24">
            <div className="w-full max-w-xl mx-auto">
                <h1 className="text-xl font-bold mb-6">영상 수정</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center gap-3">
                        {(newVideoUrl || videoSrc) && (
                            <video key={newVideoUrl || videoSrc} src={newVideoUrl || videoSrc}
                                className="w-full max-w-sm rounded-lg" controls />
                        )}
                        <div className="flex gap-2">
                            <label className="px-4 py-2 text-sm border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100">
                                영상 변경
                                <input type="file" accept="video/*" className="hidden" disabled={saving}
                                    onChange={async (e) => {
                                        const f = e.target.files?.[0] ?? null;
                                        setNewVideo(f);
                                        setNewVideoUrl(f ? URL.createObjectURL(f) : "");
                                        // 업로드와 동일하게 새 영상에서 썸네일 자동 추출 (1초 지점)
                                        if (f) {
                                            try {
                                                const thumb = (await extractThumbnail(f, 1)) as Blob | null;
                                                if (thumb) { setNewThumbnail(thumb); setThumbnailAuto(true); }
                                            } catch { /* 자동 추출 실패 시 무시 */ }
                                        }
                                    }} />
                            </label>
                            <label className="px-4 py-2 text-sm border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100">
                                썸네일 직접 선택
                                <input type="file" accept="image/*" className="hidden" disabled={saving}
                                    onChange={(e) => { setNewThumbnail(e.target.files?.[0] ?? null); setThumbnailAuto(false); }} />
                            </label>
                        </div>
                        {newVideo && <p className="text-xs text-gray-500">새 영상: {newVideo.name}</p>}
                        {newThumbnail && (
                            <p className="text-xs text-gray-500">
                                새 썸네일: {thumbnailAuto ? "영상에서 자동 추출됨" : (newThumbnail instanceof File ? newThumbnail.name : "선택됨")}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="video-title" className="block text-sm font-medium text-gray-700 mb-2">
                            동영상 제목 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text" id="video-title" name="title"
                            value={form.title} onChange={handleChange}
                            placeholder="동영상 제목을 입력하세요" maxLength={100}
                            required disabled={saving} className={inputCn}
                        />
                        <p className="text-xs text-gray-500 mt-1">최대 100자까지 입력 가능합니다.</p>
                    </div>

                    <div>
                        <label htmlFor="video-description" className="block text-sm font-medium text-gray-700 mb-2">
                            동영상 설명
                        </label>
                        <textarea
                            id="video-description" name="description"
                            value={form.description} onChange={handleChange} rows={4}
                            placeholder="동영상에 대한 설명을 입력하세요" maxLength={2000}
                            disabled={saving} className={inputCn}
                        />
                        <p className="text-xs text-gray-500 mt-1">최대 2000자까지 입력 가능합니다.</p>
                    </div>

                    <div>
                        <label htmlFor="video-hashtags" className="block text-sm font-medium text-gray-700 mb-2">
                            해시태그
                        </label>
                        <input
                            type="text" id="video-hashtags" name="hashtags"
                            value={form.hashtags} onChange={handleChange}
                            placeholder="해시태그1 해시태그2 해시태그3"
                            disabled={saving} className={inputCn}
                        />
                        <p className="text-xs text-gray-500 mt-1">해시태그는 공백으로 구분합니다.</p>
                    </div>

                    <div>
                        <label htmlFor="video-visibility" className="block text-sm font-medium text-gray-700 mb-2">
                            동영상 시청 권한 <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="video-visibility" name="visibility"
                            value={form.visibility} onChange={handleChange}
                            disabled={saving} className={inputCn}
                        >
                            <option value={AvailabilityStatus.PUBLIC}>전체 공개</option>
                            <option value={AvailabilityStatus.FOLLOWERS}>팔로워만</option>
                            <option value={AvailabilityStatus.PRIVATE}>나만 보기</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            댓글 작성 허용 <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            {[
                                { v: AvailabilityStatus.PUBLIC, l: "모든 사용자" },
                                { v: AvailabilityStatus.FOLLOWERS, l: "팔로워만" },
                                { v: AvailabilityStatus.PRIVATE, l: "댓글 허용 안함" },
                            ].map((o) => (
                                <label key={o.v} className="flex items-center">
                                    <input
                                        type="radio" name="commentsAllowed" value={o.v}
                                        checked={form.commentsAllowed === o.v}
                                        onChange={handleChange} disabled={saving}
                                        className="w-4 h-4 text-[#FE2C55] border-gray-300 focus:ring-[#FE2C55]"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{o.l}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button" onClick={() => navigate(-1)} disabled={saving}
                            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:cursor-not-allowed"
                        >
                            취소
                        </button>
                        <button
                            type="submit" disabled={saving || !form.title.trim()}
                            className="flex-1 px-6 py-2 bg-[#FE2C55] text-white rounded-md
                                hover:bg-[#e71b45] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {saving ? "저장 중..." : "수정 완료"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
