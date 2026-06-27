import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../entities/notification/model/Notification";
import { getNotifications, markAllRead } from "../../features/notification/api/notificationService";
import { useUser } from "../../shared/context/UserContext";
import { ROUTE } from "../../shared/constants/Route";
import { Image } from "../../shared/components/common/custom/Image";
import { Loading } from "../../shared/components/common/Loading";
import { formatCommentDate } from "../../shared/utils/formatUtil";
import { showErrorToast } from "../../shared/utils/toast";

/** 알림 종류/대상에 따라 이동 경로를 만든다. (대상 콘텐츠는 보통 본인 소유) */
const targetRoute = (n: Notification, myMention?: string): string | null => {
    if (!n.targetType || !n.targetId) return null;
    switch (n.targetType) {
        case "USER":
            return ROUTE.PROFILE(n.targetId);
        case "VIDEO":
            return myMention ? ROUTE.PROFILE_SWIPE_VIDEO(myMention, n.targetId) : null;
        case "COMMUNITY":
            return myMention ? ROUTE.POST_DETAIL(myMention, n.targetId) : null;
        default:
            return null;
    }
};

export default function NotificationPage() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [items, setItems] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const res = await getNotifications();
            setLoading(false);
            if (!res.ok || res.data === undefined) {
                showErrorToast("알림을 불러오지 못했습니다");
                return;
            }
            setItems(res.data);
            // 목록을 열었으니 모두 읽음 처리 (배지 초기화)
            if (res.data.some((n) => !n.isRead)) markAllRead();
        })();
    }, []);

    const onClickItem = (n: Notification) => {
        const to = targetRoute(n, user?.mention);
        if (to) navigate(to);
    };

    if (loading) return <Loading message="알림을 불러오는 중..." />;

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-xl font-bold mb-4">알림</h1>

            {items.length === 0 ? (
                <p className="text-center text-gray-400 py-20">아직 알림이 없습니다</p>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {items.map((n) => (
                        <li
                            key={n.id}
                            onClick={() => onClickItem(n)}
                            className={`flex items-center gap-3 py-3 px-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 ${
                                n.isRead ? "" : "bg-blue-50/60"
                            }`}
                        >
                            {n.actorProfileImgSrc ? (
                                <Image
                                    url={n.actorProfileImgSrc}
                                    alt={(n.actorUsername ?? "사용자") + "님"}
                                    social={false}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                            )}

                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 break-words">{n.message}</p>
                                <span className="text-xs text-gray-400">{formatCommentDate(n.createAt)}</span>
                            </div>

                            {!n.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
