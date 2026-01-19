package com.smartsolutions.hub.service;

import com.smartsolutions.hub.dto.SiteDTO;
import com.smartsolutions.hub.dto.UserDTO;
import com.smartsolutions.hub.model.Site;
import com.smartsolutions.hub.model.User;
import com.smartsolutions.hub.repository.SiteRepository;
import com.smartsolutions.hub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    
    private final UserRepository userRepository;
    private final SiteRepository siteRepository;
    
    @Transactional
    public User getOrCreateUser(String email, String name, String role, List<Long> siteIds) {
        log.debug("getOrCreateUser called with email={}, name={}, role={}, siteIds={}", email, name, role, siteIds);
        return userRepository.findByEmail(email)
            .orElseGet(() -> {
                log.info("User not found, creating new user: {}", email);
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setRole(role);
                newUser.setSiteIds(siteIds);
                newUser.setPreferredLanguage("fr");
                newUser.setNotificationEnabled(true);
                return userRepository.save(newUser);
            });
    }
    
    public UserDTO toDTO(User user) {
        return new UserDTO(
            user.getId(),
            user.getEmail(),
            user.getName(),
            user.getRole(),
            user.getSiteIds(),
            user.getPreferredLanguage(),
            user.getNotificationEnabled()
        );
    }
    
    /**
     * Get user's sites from database by their site IDs
     */
    @Transactional(readOnly = true)
    public List<SiteDTO> getUserSites(List<Long> siteIds) {
        if (siteIds == null || siteIds.isEmpty()) {
            return List.of();
        }
        
        // Fetch sites from database
        List<Site> sites = siteRepository.findByIdIn(siteIds);
        
        // Convert to DTOs
        return sites.stream()
            .map(site -> new SiteDTO(
                site.getId(),
                site.getName(),
                site.getLocation(),
                site.getStatus()
            ))
            .toList();
    }
    
    @Transactional
    public User updatePreferences(Long userId, Map<String, Object> preferences) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (preferences.containsKey("preferredLanguage")) {
            user.setPreferredLanguage((String) preferences.get("preferredLanguage"));
        }
        if (preferences.containsKey("notificationEnabled")) {
            user.setNotificationEnabled((Boolean) preferences.get("notificationEnabled"));
        }
        
        return userRepository.save(user);
    }
}
