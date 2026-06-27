package com.e.shortform.domain.notification.service;

import com.e.shortform.domain.notification.entity.NotificationEntity;
import com.e.shortform.domain.notification.repository.NotificationRepo;
import com.e.shortform.domain.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepo notificationRepo;

    /**
     * 알림 생성. 다른 도메인 서비스에서 호출한다.
     * 알림 실패가 본래 동작(좋아요/댓글 등)을 깨뜨리지 않도록 예외를 삼킨다.
     *
     * @param recipientId 수신자 id
     * @param actor       행위자(시스템 알림이면 null)
     * @param type        알림 유형
     * @param targetType  이동 대상 종류
     * @param targetId    이동 대상 식별자
     * @param message     표시 문구
     */
    @Transactional
    public void notify(Long recipientId, UserEntity actor, String type,
                       String targetType, String targetId, String message) {
        if (recipientId == null) return;
        // 자기 자신이 한 행동은 알리지 않음
        if (actor != null && recipientId.equals(actor.getId())) return;

        try {
            NotificationEntity n = NotificationEntity.builder()
                    .recipientUserId(recipientId)
                    .actorUserId(actor != null ? actor.getId() : null)
                    .actorUsername(actor != null ? actor.getUsername() : null)
                    .actorMention(actor != null ? actor.getMention() : null)
                    .actorProfileImgSrc(actor != null ? actor.getProfileImgSrc() : null)
                    .type(type)
                    .targetType(targetType)
                    .targetId(targetId)
                    .message(message)
                    .isRead(false)
                    .build();
            notificationRepo.save(n);
        } catch (Exception e) {
            log.warn("알림 생성 실패 - recipient: {}, type: {}, msg: {}", recipientId, type, e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public List<NotificationEntity> list(Long userId) {
        return notificationRepo.findTop50ByRecipientUserIdOrderByIdDesc(userId);
    }

    @Transactional(readOnly = true)
    public long unreadCount(Long userId) {
        return notificationRepo.countByRecipientUserIdAndIsReadFalse(userId);
    }

    @Transactional
    public void markAllRead(Long userId) {
        notificationRepo.markAllRead(userId);
    }
}
