package com.smartsolutions.hub.dto;

import java.time.Instant;

public record NotificationDTO(
    Long id,
    String title,
    String message,
    String type,
    String priority,
    Boolean isRead,
    String actionUrl,
    Instant createdAt
) {}
