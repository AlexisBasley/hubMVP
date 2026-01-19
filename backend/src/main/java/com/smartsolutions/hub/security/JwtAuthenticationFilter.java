package com.smartsolutions.hub.security;

import com.smartsolutions.hub.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

/**
 * JWT Authentication Filter
 * Intercepts requests to validate JWT tokens and set authentication
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtService jwtService;
    
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        
        try {
            // Extract JWT token from Authorization header
            String token = extractTokenFromRequest(request);
            
            if (token != null && jwtService.validateAccessToken(token)) {
                // Extract user information from token
                String email = jwtService.extractEmail(token);
                Long userId = jwtService.extractUserId(token);
                String name = jwtService.extractName(token);
                String role = jwtService.extractRole(token);
                java.util.List<Long> siteIds = jwtService.extractSiteIds(token);
                
                if (email != null) {
                    // ALWAYS clear existing authentication to avoid session caching issues
                    SecurityContextHolder.clearContext();
                    
                    // Create authentication object with all user information from token
                    UserPrincipal userPrincipal = new UserPrincipal(
                        userId,
                        email,
                        name != null ? name : "",
                        role != null ? role : "USER",
                        siteIds != null ? siteIds : Collections.emptyList()
                    );
                    
                    log.debug("Creating UserPrincipal: userId={}, email={}, name={}, role={}, siteIds={}", 
                        userId, email, name, role, siteIds);
                    
                    UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                            userPrincipal,
                            null,
                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + (role != null ? role.toUpperCase() : "USER")))
                        );
                    
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    
                    // Set authentication in security context
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    
                    log.debug("JWT authentication successful for user: {} ({})", name, email);
                    log.debug("After setting authentication - SecurityContext: {}", 
                        SecurityContextHolder.getContext().getAuthentication());
                }
            }
        } catch (Exception e) {
            log.error("Cannot set user authentication from JWT: {}", e.getMessage());
        }
        
        filterChain.doFilter(request, response);
    }
    
    /**
     * Extract JWT token from Authorization header
     */
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        
        return null;
    }
}
