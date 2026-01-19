package com.smartsolutions.hub.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateToolRequest(
    @NotBlank String name,
    String description,
    @NotBlank String url,
    @NotBlank String icon
) {}
