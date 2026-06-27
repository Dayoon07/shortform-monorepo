package com.e.shortform.common.messaging;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

/** 영상 조회 이벤트를 RabbitMQ로 발행. app.rabbitmq.enabled=true 일 때만 빈으로 등록된다. */
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.rabbitmq.enabled", havingValue = "true")
public class ViewEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publish(ViewEvent event) {
        rabbitTemplate.convertAndSend(RabbitConfig.VIEW_QUEUE, event);
    }
}
