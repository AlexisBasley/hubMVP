package com.smartsolutions.hub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Authentication response DTO
 * Returned after successful login/register
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    
    /**
     * JWT access token
     */
    private String accessToken;
    
    /**
     * JWT refresh token
     */
    private String refreshToken;
    
    /**
     * Token type (always "Bearer")
     */
    private String tokenType = "Bearer";
    
    /**
     * Access token expiration time in seconds
     */
    private Long expiresIn;
    
    /**
     * User information
     */
    private UserInfo user;
    
    /**
     * Nested user info class
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserInfo {
        private Long id;
        private String email;
        private String name;
        private String role;
        private List<Long> siteIds;
        private String preferredLanguage;
        private Boolean notificationEnabled;
    }
}
