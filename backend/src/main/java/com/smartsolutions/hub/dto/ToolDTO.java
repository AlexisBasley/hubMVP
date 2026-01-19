package com.smartsolutions.hub.dto;

public record ToolDTO(
    Long id,
    String name,
    String description,
    String url,
    String icon,
    Integer displayOrder
) {}
