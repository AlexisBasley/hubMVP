package com.smartsolutions.hub.service;

import com.smartsolutions.hub.dto.UserPreferencesDTO;
import com.smartsolutions.hub.model.UserPreferences;
import com.smartsolutions.hub.repository.UserPreferencesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserPreferencesService {
    
    private final UserPreferencesRepository userPreferencesRepository;
    
    /**
     * Get user preferences by user ID
     * Returns empty preferences if not found
     */
    @Transactional(readOnly = true)
    public UserPreferencesDTO getUserPreferences(Long userId) {
        log.debug("Fetching preferences for user: {}", userId);
        
        UserPreferences preferences = userPreferencesRepository.findByUserId(userId)
            .orElse(createDefaultPreferences(userId));
        
        return new UserPreferencesDTO(preferences.getUserId(), preferences.getPreferences());
    }
    
    /**
     * Update user preferences
     * Creates new preferences if they don't exist
     */
    @Transactional
    public UserPreferencesDTO updateUserPreferences(Long userId, Map<String, Object> preferences) {
        log.debug("Updating preferences for user: {}", userId);
        
        UserPreferences userPrefs = userPreferencesRepository.findByUserId(userId)
            .orElse(new UserPreferences());
        
        userPrefs.setUserId(userId);
        userPrefs.setPreferences(preferences);
        
        UserPreferences saved = userPreferencesRepository.save(userPrefs);
        log.info("Preferences updated for user: {}", userId);
        
        return new UserPreferencesDTO(saved.getUserId(), saved.getPreferences());
    }
    
    /**
     * Merge preferences (partial update)
     */
    @Transactional
    public UserPreferencesDTO mergeUserPreferences(Long userId, Map<String, Object> partialPreferences) {
        log.debug("Merging preferences for user: {}", userId);
        
        UserPreferences userPrefs = userPreferencesRepository.findByUserId(userId)
            .orElse(new UserPreferences());
        
        if (userPrefs.getId() == null) {
            userPrefs.setUserId(userId);
            userPrefs.setPreferences(new HashMap<>());
        }
        
        // Merge with existing preferences
        Map<String, Object> existing = userPrefs.getPreferences();
        existing.putAll(partialPreferences);
        userPrefs.setPreferences(existing);
        
        UserPreferences saved = userPreferencesRepository.save(userPrefs);
        log.info("Preferences merged for user: {}", userId);
        
        return new UserPreferencesDTO(saved.getUserId(), saved.getPreferences());
    }
    
    /**
     * Delete user preferences
     */
    @Transactional
    public void deleteUserPreferences(Long userId) {
        log.debug("Deleting preferences for user: {}", userId);
        userPreferencesRepository.deleteByUserId(userId);
        log.info("Preferences deleted for user: {}", userId);
    }
    
    /**
     * Create default preferences
     */
    private UserPreferences createDefaultPreferences(Long userId) {
        UserPreferences prefs = new UserPreferences();
        prefs.setUserId(userId);
        prefs.setPreferences(new HashMap<>());
        return prefs;
    }
}
