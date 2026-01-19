package com.smartsolutions.hub.controller;

import com.smartsolutions.hub.dto.*;
import com.smartsolutions.hub.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Authentication Controller
 * Handles all authentication-related endpoints
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Authentication", description = "Authentication and user management endpoints")
public class AuthController {
    
    private final AuthService authService;
    
    /**
     * Register a new user
     */
    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Create a new user account with email and password")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        log.info("Register request received for email: {}", request.getEmail());
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    /**
     * Login with email and password
     */
    @PostMapping("/login")
    @Operation(summary = "Login", description = "Authenticate user with email and password")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login request received for email: {}", request.getEmail());
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
    
    /**
     * Mock SSO login (development only)
     * Simulates Azure AD SSO authentication
     */
    @PostMapping("/sso/mock")
    @Operation(summary = "Mock SSO Login", description = "Mock SSO authentication for development (dev profile only)")
    public ResponseEntity<AuthResponse> mockSSOLogin(@Valid @RequestBody MockSSORequest request) {
        log.info("Mock SSO login request for email: {}", request.getEmail());
        AuthResponse response = authService.mockSSOLogin(request);
        return ResponseEntity.ok(response);
    }
    
    /**
     * Refresh access token
     */
    @PostMapping("/refresh")
    @Operation(summary = "Refresh token", description = "Get new access token using refresh token")
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        log.info("Token refresh request received");
        AuthResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(response);
    }
    
    /**
     * Request password reset
     */
    @PostMapping("/forgot-password")
    @Operation(summary = "Forgot password", description = "Request password reset link via email")
    public ResponseEntity<Map<String, String>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        log.info("Forgot password request for email: {}", request.getEmail());
        authService.forgotPassword(request);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "If an account exists with this email, a password reset link has been sent.");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Reset password with token
     */
    @PostMapping("/reset-password")
    @Operation(summary = "Reset password", description = "Reset password using reset token")
    public ResponseEntity<Map<String, String>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        log.info("Password reset request received");
        authService.resetPassword(request);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password reset successful. You can now login with your new password.");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Logout (client-side only, invalidates token on client)
     */
    @PostMapping("/logout")
    @Operation(summary = "Logout", description = "Logout user (client-side token removal)")
    public ResponseEntity<Map<String, String>> logout() {
        log.info("Logout request received");
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logged out successfully");
        
        return ResponseEntity.ok(response);
    }
}
