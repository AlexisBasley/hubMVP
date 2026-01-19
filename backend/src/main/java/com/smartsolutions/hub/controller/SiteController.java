package com.smartsolutions.hub.controller;

import com.smartsolutions.hub.dto.SiteDTO;
import com.smartsolutions.hub.security.UserPrincipal;
import com.smartsolutions.hub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sites")
@RequiredArgsConstructor
public class SiteController {
    
    private final UserService userService;
    
    @GetMapping("/me")
    public List<SiteDTO> getUserSites(@AuthenticationPrincipal UserPrincipal principal) {
        return userService.getUserSites(principal.siteIds());
    }
}
