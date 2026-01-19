package com.smartsolutions.hub.config;

import com.smartsolutions.hub.security.JwtAuthenticationEntryPoint;
import com.smartsolutions.hub.security.JwtAuthenticationFilter;
import com.smartsolutions.hub.security.MockAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    /**
     * Password encoder bean (BCrypt with strength 10)
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
    
    /**
     * Development security filter chain with JWT authentication
     */
    @Bean
    @Profile("dev")
    public SecurityFilterChain devSecurityFilterChain(
            HttpSecurity http,
            JwtAuthenticationFilter jwtAuthFilter,
            JwtAuthenticationEntryPoint jwtAuthEntryPoint) throws Exception {
        
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints (context path is already /api, so don't include it here)
                .requestMatchers(
                    "/auth/**",               // Authentication endpoints
                    "/api-docs/**",           // Swagger docs
                    "/swagger-ui/**",         // Swagger UI
                    "/swagger-ui.html",
                    "/actuator/health"        // Health check
                ).permitAll()
                // All other endpoints require authentication
                .anyRequest().authenticated()
            )
            .exceptionHandling(exception -> 
                exception.authenticationEntryPoint(jwtAuthEntryPoint)
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    /**
     * Production security filter chain with OAuth2 JWT
     */
    @Bean
    @Profile("prod")
    public SecurityFilterChain prodSecurityFilterChain(
            HttpSecurity http,
            JwtAuthenticationFilter jwtAuthFilter,
            JwtAuthenticationEntryPoint jwtAuthEntryPoint) throws Exception {
        
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints (context path is already /api, so don't include it here)
                .requestMatchers(
                    "/auth/**",
                    "/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/actuator/health"
                ).permitAll()
                // All other endpoints require authentication
                .anyRequest().authenticated()
            )
            .exceptionHandling(exception -> 
                exception.authenticationEntryPoint(jwtAuthEntryPoint)
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            // OAuth2 Resource Server for Azure AD (future)
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> {}));
        
        return http.build();
    }
}
