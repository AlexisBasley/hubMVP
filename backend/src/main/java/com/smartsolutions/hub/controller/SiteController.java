package com.smartsolutions.hub.controller;

import com.smartsolutions.hub.dto.SiteDTO;
import com.smartsolutions.hub.model.Site;
import com.smartsolutions.hub.security.UserPrincipal;
import com.smartsolutions.hub.service.SiteService;
import com.smartsolutions.hub.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Site Controller
 * REST API endpoints for construction sites
 */
@RestController
@RequestMapping("/sites")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Sites", description = "Construction site management")
@SecurityRequirement(name = "bearerAuth")
public class SiteController {
    
    private final UserService userService;
    private final SiteService siteService;
    
    /**
     * Get current user's assigned sites
     */
    @GetMapping("/me")
    @Operation(summary = "Get my sites", description = "Retrieve sites assigned to the authenticated user")
    public List<SiteDTO> getUserSites(@AuthenticationPrincipal UserPrincipal principal) {
        log.info("GET /sites/me - user: {}", principal.email());
        return userService.getUserSites(principal.siteIds());
    }
    
    /**
     * Get all sites
     */
    @GetMapping
    @Operation(summary = "Get all sites", description = "Retrieve all construction sites")
    public ResponseEntity<List<Site>> getAllSites(
        @Parameter(description = "Filter by status (active/inactive)")
        @RequestParam(required = false) String status
    ) {
        log.info("GET /sites - status: {}", status);
        
        if ("active".equalsIgnoreCase(status)) {
            return ResponseEntity.ok(siteService.getActiveSites());
        }
        
        return ResponseEntity.ok(siteService.getAllSites());
    }
    
    /**
     * Get site by ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get site by ID", description = "Retrieve a specific construction site")
    public ResponseEntity<Site> getSiteById(
        @Parameter(description = "Site ID")
        @PathVariable Long id
    ) {
        log.info("GET /sites/{}", id);
        return ResponseEntity.ok(siteService.getSiteById(id));
    }
    
    /**
     * Get sites by location
     */
    @GetMapping("/location/{location}")
    @Operation(summary = "Get sites by location", description = "Retrieve sites in a specific location")
    public ResponseEntity<List<Site>> getSitesByLocation(
        @Parameter(description = "Location name")
        @PathVariable String location
    ) {
        log.info("GET /sites/location/{}", location);
        return ResponseEntity.ok(siteService.getSitesByLocation(location));
    }
    
    /**
     * Get sites by IDs (for getting user's assigned sites)
     */
    @PostMapping("/by-ids")
    @Operation(summary = "Get sites by IDs", description = "Retrieve multiple sites by their IDs")
    public ResponseEntity<List<Site>> getSitesByIds(
        @Parameter(description = "List of site IDs")
        @RequestBody List<Long> ids
    ) {
        log.info("POST /sites/by-ids - ids: {}", ids);
        return ResponseEntity.ok(siteService.getSitesByIds(ids));
    }
}
