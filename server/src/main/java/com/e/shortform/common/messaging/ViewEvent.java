package com.e.shortform.common.messaging;

/** 영상 조회 이벤트 (RabbitMQ로 전달되어 비동기로 조회수/시청기록 처리). */
public record ViewEvent(String videoLoc, String mention) {}
