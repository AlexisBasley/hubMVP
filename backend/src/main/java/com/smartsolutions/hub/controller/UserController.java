package com.smartsolutions.hub.controller;

import com.smartsolutions.hub.dto.SiteDTO;
import com.smartsolutions.hub.dto.UserDTO;
import com.smartsolutions.hub.dto.UserPreferencesDTO;
import com.smartsolutions.hub.model.User;
import com.smartsolutions.hub.security.UserPrincipal;
import com.smartsolutions.hub.service.UserService;
import com.smartsolutions.hub.service.UserPreferencesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    
    private final UserService userService;
    private final UserPreferencesService userPreferencesService;
    
    @GetMapping("/me")
    public UserDTO getCurrentUser(@AuthenticationPrincipal UserPrincipal principal) {
        log.debug("getCurrentUser called");
        log.debug("  principal object: {}", principal);
        log.debug("  principal.id: {}", principal.id());
        log.debug("  principal.email: {}", principal.email());
        log.debug("  principal.name: {}", principal.name());
        log.debug("  principal.role: {}", principal.role());
        log.debug("  principal.siteIds: {}", principal.siteIds());
        log.debug("  SecurityContext authentication: {}", 
            org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication());
        
        // Return user info directly from JWT token principal
        return new UserDTO(
            principal.id(),
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds(),
            "fr", // default language
            true  // default notification enabled
        );
    }
    
    @GetMapping("/me/sites")
    public List<SiteDTO> getUserSites(@AuthenticationPrincipal UserPrincipal principal) {
        log.debug("getUserSites called with principal: id={}, email={}, siteIds={}", 
            principal.id(), principal.email(), principal.siteIds());
        return userService.getUserSites(principal.siteIds());
    }
    
    @PutMapping("/me/preferences")
    public UserDTO updatePreferences(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody Map<String, Object> preferences) {
        User user = userService.getOrCreateUser(
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds()
        );
        User updated = userService.updatePreferences(user.getId(), preferences);
        return userService.toDTO(updated);
    }
    
    /**
     * Get user preferences (tools, dashboards, settings)
     */
    @GetMapping("/me/preferences/v2")
    public UserPreferencesDTO getUserPreferencesV2(@AuthenticationPrincipal UserPrincipal principal) {
        log.debug("getUserPreferencesV2 called for user: {}", principal.id());
        return userPreferencesService.getUserPreferences(principal.id());
    }
    
    /**
     * Update user preferences (full replace)
     */
    @PutMapping("/me/preferences/v2")
    public UserPreferencesDTO updateUserPreferencesV2(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody Map<String, Object> preferences) {
        log.debug("updateUserPreferencesV2 called for user: {}", principal.id());
        return userPreferencesService.updateUserPreferences(principal.id(), preferences);
    }
    
    /**
     * Merge user preferences (partial update)
     */
    @PatchMapping("/me/preferences/v2")
    public UserPreferencesDTO mergeUserPreferencesV2(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody Map<String, Object> partialPreferences) {
        log.debug("mergeUserPreferencesV2 called for user: {}", principal.id());
        return userPreferencesService.mergeUserPreferences(principal.id(), partialPreferences);
    }
}
