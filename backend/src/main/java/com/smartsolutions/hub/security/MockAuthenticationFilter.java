package com.smartsolutions.hub.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
@Profile("dev")
public class MockAuthenticationFilter extends OncePerRequestFilter {
    
    private static final String MOCK_USER_HEADER = "X-Mock-User";
    
    // Mock users database
    private static final Map<String, UserPrincipal> MOCK_USERS = Map.of(
        "jean.dupont@smartsolutions.fr", new UserPrincipal(
            1L, 
            "jean.dupont@smartsolutions.fr", 
            "Jean Dupont", 
            "operationnel", 
            List.of(1L, 2L)
        ),
        "sophie.martin@smartsolutions.fr", new UserPrincipal(
            2L, 
            "sophie.martin@smartsolutions.fr", 
            "Sophie Martin", 
            "director", 
            List.of(1L, 2L, 3L)
        ),
        "marc.bernard@smartsolutions.fr", new UserPrincipal(
            3L, 
            "marc.bernard@smartsolutions.fr", 
            "Marc Bernard", 
            "admin", 
            List.of(1L, 2L, 3L)
        )
    );
    
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        
        String mockUserEmail = request.getHeader(MOCK_USER_HEADER);
        
        // Default to first user if no header provided
        if (mockUserEmail == null || mockUserEmail.isEmpty()) {
            mockUserEmail = "jean.dupont@smartsolutions.fr";
        }
        
        UserPrincipal principal = MOCK_USERS.get(mockUserEmail);
        
        if (principal != null) {
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        filterChain.doFilter(request, response);
    }
}
