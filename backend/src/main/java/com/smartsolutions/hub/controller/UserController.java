package com.smartsolutions.hub.controller;

import com.smartsolutions.hub.dto.SiteDTO;
import com.smartsolutions.hub.dto.UserDTO;
import com.smartsolutions.hub.model.User;
import com.smartsolutions.hub.security.UserPrincipal;
import com.smartsolutions.hub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/me")
    public UserDTO getCurrentUser(@AuthenticationPrincipal UserPrincipal principal) {
        User user = userService.getOrCreateUser(
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds()
        );
        return userService.toDTO(user);
    }
    
    @GetMapping("/me/sites")
    public List<SiteDTO> getUserSites(@AuthenticationPrincipal UserPrincipal principal) {
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
}
