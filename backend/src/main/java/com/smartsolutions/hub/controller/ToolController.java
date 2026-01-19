package com.smartsolutions.hub.controller;

import com.smartsolutions.hub.dto.CreateToolRequest;
import com.smartsolutions.hub.dto.ToolDTO;
import com.smartsolutions.hub.dto.UpdateToolsOrderRequest;
import com.smartsolutions.hub.model.User;
import com.smartsolutions.hub.security.UserPrincipal;
import com.smartsolutions.hub.service.ToolService;
import com.smartsolutions.hub.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tools")
@RequiredArgsConstructor
public class ToolController {
    
    private final ToolService toolService;
    private final UserService userService;
    
    @GetMapping
    public List<ToolDTO> getUserTools(@AuthenticationPrincipal UserPrincipal principal) {
        User user = userService.getOrCreateUser(
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds()
        );
        return toolService.getUserTools(user.getId());
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ToolDTO createTool(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateToolRequest request) {
        User user = userService.getOrCreateUser(
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds()
        );
        return toolService.createTool(user.getId(), request);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTool(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        User user = userService.getOrCreateUser(
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds()
        );
        toolService.deleteTool(id, user.getId());
    }
    
    @PutMapping("/order")
    public List<ToolDTO> updateToolsOrder(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody UpdateToolsOrderRequest request) {
        User user = userService.getOrCreateUser(
            principal.email(),
            principal.name(),
            principal.role(),
            principal.siteIds()
        );
        return toolService.updateToolsOrder(user.getId(), request.toolIds());
    }
}
