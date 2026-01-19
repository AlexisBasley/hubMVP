package com.smartsolutions.hub.dto;

import java.util.List;

public record UserDTO(
    Long id,
    String email,
    String name,
    String role,
    List<Long> siteIds,
    String preferredLanguage,
    Boolean notificationEnabled
) {}
