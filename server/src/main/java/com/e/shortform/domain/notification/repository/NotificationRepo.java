package com.e.shortform.domain.notification.repository;

import com.e.shortform.domain.notification.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepo extends JpaRepository<NotificationEntity, Long> {

    List<NotificationEntity> findTop50ByRecipientUserIdOrderByIdDesc(Long recipientUserId);

    long countByRecipientUserIdAndIsReadFalse(Long recipientUserId);

    @Modifying
    @Query("update NotificationEntity n set n.isRead = true " +
            "where n.recipientUserId = :userId and n.isRead = false")
    int markAllRead(@Param("userId") Long userId);
}
