package com.smartsolutions.hub.dto;

import java.util.List;

public record DashboardConfigDTO(
    Long id,
    Long userId,
    List<String> dashboardIds
) {}
