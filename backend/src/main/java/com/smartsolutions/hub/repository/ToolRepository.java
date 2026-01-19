package com.smartsolutions.hub.repository;

import com.smartsolutions.hub.model.Tool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToolRepository extends JpaRepository<Tool, Long> {
    List<Tool> findByUserIdOrderByDisplayOrder(Long userId);
}
