package com.e.shortform.common.messaging;

import com.e.shortform.domain.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

/**
 * 조회 이벤트를 비동기로 소비해 조회수 증가 + 시청기록 저장을 처리한다.
 * 핫패스(요청 스레드)에서 DB 쓰기를 빼내 인기 영상의 핫로우 락 경합을 제거한다.
 */
@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.rabbitmq.enabled", havingValue = "true")
public class ViewEventConsumer {

    private final VideoService videoService;

    @RabbitListener(queues = RabbitConfig.VIEW_QUEUE)
    public void onViewEvent(ViewEvent event) {
        try {
            videoService.processView(event.videoLoc(), event.mention());
        } catch (Exception e) {
            log.warn("조회 이벤트 처리 실패: videoLoc={}, {}", event.videoLoc(), e.getMessage());
        }
    }
}
