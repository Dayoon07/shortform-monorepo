package com.e.shortform.domain.notification.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * 사용자 알림.
 * 표시/이동에 필요한 행위자(actor) 정보는 비정규화하여 스냅샷으로 저장한다.
 * (조회 시 조인/지연로딩 없이 피드를 그릴 수 있게 함)
 */
@Entity
@Table(name = "SHORTFORM_NOTIFICATIONS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 알림 수신자 */
    @Column(name = "RECIPIENT_USER_ID", nullable = false)
    private Long recipientUserId;

    /** 알림을 발생시킨 사용자(시스템 알림이면 null) */
    @Column(name = "ACTOR_USER_ID")
    private Long actorUserId;

    @Column(name = "ACTOR_USERNAME")
    private String actorUsername;

    @Column(name = "ACTOR_MENTION")
    private String actorMention;

    @Column(name = "ACTOR_PROFILE_IMG_SRC", length = 1000)
    private String actorProfileImgSrc;

    /** FOLLOW, VIDEO_LIKE, VIDEO_COMMENT, COMMUNITY_COMMENT, REPORT_PROCESSED ... */
    @Column(name = "TYPE", nullable = false, length = 50)
    private String type;

    /** 이동 대상 종류: VIDEO / COMMUNITY / USER ... */
    @Column(name = "TARGET_TYPE", length = 50)
    private String targetType;

    /** 이동 대상 식별자 (영상 mention, 게시글 id 등) */
    @Column(name = "TARGET_ID", length = 300)
    private String targetId;

    @Lob
    @Column(name = "MESSAGE")
    private String message;

    @Column(name = "IS_READ", nullable = false)
    private Boolean isRead;

    @CreationTimestamp
    @Column(name = "CREATE_AT", updatable = false)
    private LocalDateTime createAt;
}
