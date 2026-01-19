package com.smartsolutions.hub.repository;

import com.smartsolutions.hub.model.UserPreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPreferencesRepository extends JpaRepository<UserPreferences, Long> {
    
    /**
     * Find user preferences by user ID
     */
    Optional<UserPreferences> findByUserId(Long userId);
    
    /**
     * Delete user preferences by user ID
     */
    void deleteByUserId(Long userId);
}
