package com.smartsolutions.hub.service;

import com.smartsolutions.hub.dto.SiteDTO;
import com.smartsolutions.hub.dto.UserDTO;
import com.smartsolutions.hub.model.User;
import com.smartsolutions.hub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    
    // Mock sites data
    private static final List<SiteDTO> MOCK_SITES = List.of(
        new SiteDTO(1L, "Chantier Paris - La Défense", "Paris, France", "active"),
        new SiteDTO(2L, "Chantier Lyon Part-Dieu", "Lyon, France", "active"),
        new SiteDTO(3L, "Chantier Marseille Euroméditerranée", "Marseille, France", "active")
    );
    
    @Transactional
    public User getOrCreateUser(String email, String name, String role, List<Long> siteIds) {
        return userRepository.findByEmail(email)
            .orElseGet(() -> {
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
    
    public List<SiteDTO> getUserSites(List<Long> siteIds) {
        return MOCK_SITES.stream()
            .filter(site -> siteIds.contains(site.id()))
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
