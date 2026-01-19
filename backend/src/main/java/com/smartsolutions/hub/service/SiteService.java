package com.smartsolutions.hub.service;

import com.smartsolutions.hub.exception.ResourceNotFoundException;
import com.smartsolutions.hub.model.Site;
import com.smartsolutions.hub.repository.SiteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Site Service
 * Handles business logic for construction sites
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class SiteService {
    
    private final SiteRepository siteRepository;
    
    /**
     * Get all sites
     */
    @Transactional(readOnly = true)
    public List<Site> getAllSites() {
        log.debug("Getting all sites");
        return siteRepository.findAll();
    }
    
    /**
     * Get all active sites
     */
    @Transactional(readOnly = true)
    public List<Site> getActiveSites() {
        log.debug("Getting all active sites");
        return siteRepository.findByStatus("active");
    }
    
    /**
     * Get site by ID
     */
    @Transactional(readOnly = true)
    public Site getSiteById(Long id) {
        log.debug("Getting site by id: {}", id);
        return siteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Site not found with id: " + id));
    }
    
    /**
     * Get sites by IDs (for user's assigned sites)
     */
    @Transactional(readOnly = true)
    public List<Site> getSitesByIds(List<Long> ids) {
        log.debug("Getting sites by ids: {}", ids);
        if (ids == null || ids.isEmpty()) {
            return List.of();
        }
        return siteRepository.findByIdIn(ids);
    }
    
    /**
     * Get sites by location
     */
    @Transactional(readOnly = true)
    public List<Site> getSitesByLocation(String location) {
        log.debug("Getting sites by location: {}", location);
        return siteRepository.findByLocation(location);
    }
}
