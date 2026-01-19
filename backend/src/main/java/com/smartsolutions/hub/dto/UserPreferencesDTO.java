package com.smartsolutions.hub.dto;

import java.util.Map;

public record UserPreferencesDTO(
    Long userId,
    Map<String, Object> preferences
) {
}
