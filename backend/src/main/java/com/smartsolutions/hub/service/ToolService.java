package com.smartsolutions.hub.service;

import com.smartsolutions.hub.dto.CreateToolRequest;
import com.smartsolutions.hub.dto.ToolDTO;
import com.smartsolutions.hub.model.Tool;
import com.smartsolutions.hub.repository.ToolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ToolService {
    
    private final ToolRepository toolRepository;
    
    public List<ToolDTO> getUserTools(Long userId) {
        return toolRepository.findByUserIdOrderByDisplayOrder(userId)
            .stream()
            .map(this::toDTO)
            .toList();
    }
    
    @Transactional
    public ToolDTO createTool(Long userId, CreateToolRequest request) {
        List<Tool> existingTools = toolRepository.findByUserIdOrderByDisplayOrder(userId);
        int nextOrder = existingTools.isEmpty() ? 0 : existingTools.size();
        
        Tool tool = new Tool();
        tool.setUserId(userId);
        tool.setName(request.name());
        tool.setDescription(request.description());
        tool.setUrl(request.url());
        tool.setIcon(request.icon());
        tool.setDisplayOrder(nextOrder);
        
        Tool saved = toolRepository.save(tool);
        return toDTO(saved);
    }
    
    @Transactional
    public void deleteTool(Long toolId, Long userId) {
        Tool tool = toolRepository.findById(toolId)
            .orElseThrow(() -> new RuntimeException("Tool not found"));
        
        if (!tool.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        
        toolRepository.delete(tool);
    }
    
    @Transactional
    public List<ToolDTO> updateToolsOrder(Long userId, List<Long> toolIds) {
        List<Tool> tools = toolRepository.findByUserIdOrderByDisplayOrder(userId);
        
        for (int i = 0; i < toolIds.size(); i++) {
            final int order = i;  // Make it effectively final
            Long toolId = toolIds.get(i);
            tools.stream()
                .filter(t -> t.getId().equals(toolId))
                .findFirst()
                .ifPresent(tool -> tool.setDisplayOrder(order));
        }
        
        List<Tool> saved = toolRepository.saveAll(tools);
        return saved.stream().map(this::toDTO).toList();
    }
    
    private ToolDTO toDTO(Tool tool) {
        return new ToolDTO(
            tool.getId(),
            tool.getName(),
            tool.getDescription(),
            tool.getUrl(),
            tool.getIcon(),
            tool.getDisplayOrder()
        );
    }
}
