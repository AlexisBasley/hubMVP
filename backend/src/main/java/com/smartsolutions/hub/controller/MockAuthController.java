package com.smartsolutions.hub.controller;

import com.smartsolutions.hub.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth/mock")
@RequiredArgsConstructor
@Profile("dev")
public class MockAuthController {
    
    private static final List<Map<String, Object>> MOCK_USERS = List.of(
        Map.of(
            "email", "jean.dupont@smartsolutions.fr",
            "name", "Jean Dupont",
            "role", "operationnel",
            "siteIds", List.of(1, 2)
        ),
        Map.of(
            "email", "sophie.martin@smartsolutions.fr",
            "name", "Sophie Martin",
            "role", "director",
            "siteIds", List.of(1, 2, 3)
        ),
        Map.of(
            "email", "marc.bernard@smartsolutions.fr",
            "name", "Marc Bernard",
            "role", "admin",
            "siteIds", List.of(1, 2, 3)
        )
    );
    
    @GetMapping("/users")
    public List<Map<String, Object>> getAvailableMockUsers() {
        return MOCK_USERS;
    }
    
    @GetMapping("/current-user")
    public UserPrincipal getCurrentMockUser(@AuthenticationPrincipal UserPrincipal principal) {
        return principal;
    }
}
