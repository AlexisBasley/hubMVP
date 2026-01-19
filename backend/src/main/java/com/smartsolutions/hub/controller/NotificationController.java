package com.smartsolutions.hub.controller;

import com.smartsolutions.hub.dto.NotificationDTO;
import com.smartsolutions.hub.model.User;
import com.smartsolutions.hub.security.UserPrincipal;
import com.smartsolutions.hub.service.NotificationService;
import com.smartsolutions.hub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {
    
    private final NotificationService notificationService;
    private final UserService userService;
    
    @GetMapping
    public Page<NotificationDTO> getNotifications(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        User user = userService.getOrCreateUser(
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds()
        );
        return notificationService.getUserNotifications(user.getId(), page, size);
    }
    
    @PutMapping("/{id}/read")
    public NotificationDTO markAsRead(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        User user = userService.getOrCreateUser(
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds()
        );
        return notificationService.markAsRead(id, user.getId());
    }
    
    @GetMapping("/unread-count")
    public Long getUnreadCount(@AuthenticationPrincipal UserPrincipal principal) {
        User user = userService.getOrCreateUser(
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds()
        );
        return notificationService.getUnreadCount(user.getId());
    }
}
