package com.smartsolutions.hub.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * JWT configuration properties
 * Values loaded from application.yml (jwt.* properties)
 */
@Configuration
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtConfig {
    
    /**
     * Secret key for signing JWT tokens
     * IMPORTANT: Must be at least 256 bits (32 characters) for HS256
     * Should be stored in environment variable in production
     */
    private String secret;
    
    /**
     * Access token expiration time in milliseconds
     * Default: 86400000 (24 hours)
     */
    private Long expiration = 86400000L; // 24 hours
    
    /**
     * Refresh token expiration time in milliseconds
     * Default: 604800000 (7 days)
     */
    private Long refreshExpiration = 604800000L; // 7 days
    
    /**
     * Issuer name for JWT tokens
     */
    private String issuer = "hub-smart-solutions";
    
    /**
     * Token header name
     */
    private String header = "Authorization";
    
    /**
     * Token prefix
     */
    private String prefix = "Bearer ";
}
