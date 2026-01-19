package com.smartsolutions.hub.controller;

import com.smartsolutions.hub.dto.DashboardConfigDTO;
import com.smartsolutions.hub.model.User;
import com.smartsolutions.hub.security.UserPrincipal;
import com.smartsolutions.hub.service.DashboardService;
import com.smartsolutions.hub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboards")
@RequiredArgsConstructor
public class DashboardController {
    
    private final DashboardService dashboardService;
    private final UserService userService;
    
    @GetMapping("/available")
    public List<String> getAvailableDashboards() {
        return dashboardService.getAvailableDashboards();
    }
    
    @GetMapping("/me")
    public DashboardConfigDTO getUserDashboardConfig(@AuthenticationPrincipal UserPrincipal principal) {
        User user = userService.getOrCreateUser(
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds()
        );
        return dashboardService.getUserDashboardConfig(user.getId());
    }
    
    @PutMapping("/me")
    public DashboardConfigDTO saveDashboardConfig(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody List<String> dashboardIds) {
        User user = userService.getOrCreateUser(
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds()
        );
        return dashboardService.saveDashboardConfig(user.getId(), dashboardIds);
    }
}
