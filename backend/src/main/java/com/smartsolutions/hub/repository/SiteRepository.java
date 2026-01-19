package com.smartsolutions.hub.repository;

import com.smartsolutions.hub.model.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {
    
    /**
     * Find all active sites
     */
    List<Site> findByStatus(String status);
    
    /**
     * Find sites by location
     */
    List<Site> findByLocation(String location);
    
    /**
     * Find sites by IDs
     */
    List<Site> findByIdIn(List<Long> ids);
}
