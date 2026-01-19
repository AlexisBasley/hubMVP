package com.smartsolutions.hub.repository;

import com.smartsolutions.hub.model.DashboardConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DashboardConfigRepository extends JpaRepository<DashboardConfig, Long> {
    Optional<DashboardConfig> findByUserId(Long userId);
}
