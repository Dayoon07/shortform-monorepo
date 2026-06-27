package com.e.shortform.domain.notification.controller;

import com.e.shortform.common.annotation.RequireAuth;
import com.e.shortform.domain.notification.service.NotificationService;
import com.e.shortform.domain.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/notifications", produces = "application/json;charset=utf-8")
@RestController
public class RestNotificationController {

    private final NotificationService notificationService;

    /** 내 알림 목록(최근 50개) */
    @RequireAuth
    @GetMapping
    public ResponseEntity<?> list(@AuthenticationPrincipal UserEntity user) {
        return ResponseEntity.ok(notificationService.list(user.getId()));
    }

    /** 안 읽은 알림 개수(벨 배지용) */
    @RequireAuth
    @GetMapping("/unread-count")
    public ResponseEntity<?> unreadCount(@AuthenticationPrincipal UserEntity user) {
        return ResponseEntity.ok(Map.of("count", notificationService.unreadCount(user.getId())));
    }

    /** 모두 읽음 처리 */
    @RequireAuth
    @PostMapping("/read-all")
    public ResponseEntity<?> readAll(@AuthenticationPrincipal UserEntity user) {
        notificationService.markAllRead(user.getId());
        return ResponseEntity.ok(Map.of("success", true));
    }
}
