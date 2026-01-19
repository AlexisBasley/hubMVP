package com.smartsolutions.hub.dto;

import java.util.List;

public record UpdateToolsOrderRequest(
    List<Long> toolIds
) {}
