package com.smartsolutions.hub.service;

import com.smartsolutions.hub.dto.DashboardConfigDTO;
import com.smartsolutions.hub.model.DashboardConfig;
import com.smartsolutions.hub.repository.DashboardConfigRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    
    private final DashboardConfigRepository dashboardConfigRepository;
    
    // Available dashboards for all users
    private static final List<String> AVAILABLE_DASHBOARDS = List.of(
        "kpi-overview",
        "safety-metrics",
        "project-timeline",
        "resource-allocation",
        "budget-tracking",
        "quality-control"
    );
    
    public List<String> getAvailableDashboards() {
        return AVAILABLE_DASHBOARDS;
    }
    
    public DashboardConfigDTO getUserDashboardConfig(Long userId) {
        DashboardConfig config = dashboardConfigRepository.findByUserId(userId)
            .orElseGet(() -> {
                DashboardConfig newConfig = new DashboardConfig();
                newConfig.setUserId(userId);
                newConfig.setDashboardIds(new ArrayList<>(List.of("kpi-overview", "safety-metrics")));
                return dashboardConfigRepository.save(newConfig);
            });
        
        return toDTO(config);
    }
    
    @Transactional
    public DashboardConfigDTO saveDashboardConfig(Long userId, List<String> dashboardIds) {
        DashboardConfig config = dashboardConfigRepository.findByUserId(userId)
            .orElseGet(() -> {
                DashboardConfig newConfig = new DashboardConfig();
                newConfig.setUserId(userId);
                return newConfig;
            });
        
        config.setDashboardIds(new ArrayList<>(dashboardIds));
        DashboardConfig saved = dashboardConfigRepository.save(config);
        return toDTO(saved);
    }
    
    private DashboardConfigDTO toDTO(DashboardConfig config) {
        return new DashboardConfigDTO(
            config.getId(),
            config.getUserId(),
            config.getDashboardIds()
        );
    }
}
