package com.smartsolutions.hub.service;

import com.smartsolutions.hub.config.JwtConfig;
import com.smartsolutions.hub.dto.*;
import com.smartsolutions.hub.exception.BadRequestException;
import com.smartsolutions.hub.exception.ResourceNotFoundException;
import com.smartsolutions.hub.exception.UnauthorizedException;
import com.smartsolutions.hub.model.User;
import com.smartsolutions.hub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

/**
 * Authentication Service
 * Handles all authentication-related business logic
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final JwtConfig jwtConfig;
    private final PasswordEncoder passwordEncoder;
    
    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final int ACCOUNT_LOCK_DURATION_MINUTES = 30;
    private static final int PASSWORD_RESET_EXPIRATION_HOURS = 1;
    
    /**
     * Register a new user
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        log.info("Registering new user: {}", request.getEmail());
        
        // Validate passwords match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }
        
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email already registered");
        }
        
        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setRole(request.getRole());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setPreferredLanguage(request.getPreferredLanguage());
        user.setNotificationEnabled(true);
        user.setAccountNonLocked(true);
        user.setFailedLoginAttempts(0);
        
        user = userRepository.save(user);
        
        log.info("User registered successfully: {}", user.getEmail());
        
        // Generate tokens and return response
        return generateAuthResponse(user, false);
    }
    
    /**
     * Login with email and password
     */
    @Transactional
    public AuthResponse login(LoginRequest request) {
        log.info("Login attempt for user: {}", request.getEmail());
        
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));
        
        // Check if account is locked
        if (!user.getAccountNonLocked()) {
            throw new UnauthorizedException("Account is locked. Please try again later or reset your password.");
        }
        
        // Validate password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            handleFailedLoginAttempt(user);
            throw new UnauthorizedException("Invalid email or password");
        }
        
        // Reset failed attempts on successful login
        if (user.getFailedLoginAttempts() > 0) {
            user.setFailedLoginAttempts(0);
        }
        
        // Update last login timestamp
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
        
        log.info("User logged in successfully: {}", user.getEmail());
        
        // Generate tokens and return response
        return generateAuthResponse(user, request.getRememberMe());
    }
    
    /**
     * Mock SSO login (development only)
     */
    @Transactional
    public AuthResponse mockSSOLogin(MockSSORequest request) {
        log.info("Mock SSO login for user: {}", request.getEmail());
        
        // Find or create user
        User user = userRepository.findByEmail(request.getEmail())
            .orElseGet(() -> {
                // Create new user for SSO (no password)
                User newUser = new User();
                newUser.setEmail(request.getEmail());
                newUser.setName(extractNameFromEmail(request.getEmail()));
                newUser.setRole("operationnel");
                newUser.setAccountNonLocked(true);
                newUser.setFailedLoginAttempts(0);
                newUser.setPreferredLanguage("fr");
                newUser.setNotificationEnabled(true);
                return userRepository.save(newUser);
            });
        
        // Update last login
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
        
        log.info("Mock SSO login successful: {}", user.getEmail());
        
        return generateAuthResponse(user, false);
    }
    
    /**
     * Refresh access token using refresh token
     */
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        
        // Validate refresh token
        if (!jwtService.validateRefreshToken(refreshToken)) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }
        
        // Extract user email from token
        String email = jwtService.extractEmail(refreshToken);
        
        // Find user
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        // Check if account is locked
        if (!user.getAccountNonLocked()) {
            throw new UnauthorizedException("Account is locked");
        }
        
        log.info("Token refreshed for user: {}", email);
        
        // Generate new tokens
        return generateAuthResponse(user, false);
    }
    
    /**
     * Request password reset
     */
    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        log.info("Password reset requested for: {}", request.getEmail());
        
        // Find user (fail silently for security)
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Generate reset token
            String resetToken = UUID.randomUUID().toString();
            user.setPasswordResetToken(resetToken);
            user.setPasswordResetExpiresAt(
                LocalDateTime.now().plusHours(PASSWORD_RESET_EXPIRATION_HOURS)
            );
            
            userRepository.save(user);
            
            // TODO: Send email with reset link
            // In development, we'll log the token
            log.info("Password reset token for {}: {}", request.getEmail(), resetToken);
            log.info("Reset link: http://localhost:3000/reset-password/{}", resetToken);
        }
        
        // Always return success (security best practice)
        log.info("Password reset email sent (if user exists)");
    }
    
    /**
     * Reset password with token
     */
    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        log.info("Password reset attempt with token");
        
        // Validate passwords match
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }
        
        // Find user by reset token
        User user = userRepository.findByPasswordResetToken(request.getToken())
            .orElseThrow(() -> new BadRequestException("Invalid or expired reset token"));
        
        // Check if token is expired
        if (user.getPasswordResetExpiresAt() == null || 
            user.getPasswordResetExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Reset token has expired");
        }
        
        // Update password
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setPasswordResetToken(null);
        user.setPasswordResetExpiresAt(null);
        user.setFailedLoginAttempts(0);
        user.setAccountNonLocked(true);
        
        userRepository.save(user);
        
        log.info("Password reset successful for user: {}", user.getEmail());
    }
    
    /**
     * Handle failed login attempt
     */
    private void handleFailedLoginAttempt(User user) {
        int attempts = user.getFailedLoginAttempts() + 1;
        user.setFailedLoginAttempts(attempts);
        
        if (attempts >= MAX_FAILED_ATTEMPTS) {
            user.setAccountNonLocked(false);
            log.warn("Account locked due to too many failed attempts: {}", user.getEmail());
        }
        
        userRepository.save(user);
    }
    
    /**
     * Generate authentication response with tokens
     */
    private AuthResponse generateAuthResponse(User user, Boolean rememberMe) {
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        
        // Adjust expiration if remember me is enabled
        Long expiresIn = rememberMe != null && rememberMe 
            ? jwtConfig.getRefreshExpiration() / 1000  // Use refresh expiration
            : jwtConfig.getExpiration() / 1000;        // Use access expiration
        
        return AuthResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .tokenType("Bearer")
            .expiresIn(expiresIn)
            .user(AuthResponse.UserInfo.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .siteIds(user.getSiteIds())
                .preferredLanguage(user.getPreferredLanguage())
                .notificationEnabled(user.getNotificationEnabled())
                .build())
            .build();
    }
    
    /**
     * Extract name from email (for SSO users)
     */
    private String extractNameFromEmail(String email) {
        String localPart = email.split("@")[0];
        // Convert "john.doe" to "John Doe"
        String[] words = localPart.replace(".", " ")
            .replace("-", " ")
            .replace("_", " ")
            .split("\\s+");
        
        StringBuilder result = new StringBuilder();
        for (String word : words) {
            if (!word.isEmpty()) {
                result.append(Character.toUpperCase(word.charAt(0)));
                if (word.length() > 1) {
                    result.append(word.substring(1).toLowerCase());
                }
                result.append(" ");
            }
        }
        return result.toString().trim();
    }
}
