/** 서버 SHORTFORM_NOTIFICATIONS 행에 대응하는 알림 모델 */
export interface Notification {
    id: number;
    recipientUserId: number;
    actorUserId: number | null;
    actorUsername: string | null;
    actorMention: string | null;
    actorProfileImgSrc: string | null;
    /** FOLLOW | VIDEO_LIKE | VIDEO_COMMENT | COMMUNITY_COMMENT | ... */
    type: string;
    /** VIDEO | COMMUNITY | USER */
    targetType: string | null;
    /** 영상 videoLoc, 게시글 uuid, 사용자 mention 등 이동 식별자 */
    targetId: string | null;
    message: string;
    isRead: boolean;
    createAt: string;
}
