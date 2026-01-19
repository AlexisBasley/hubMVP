import apiClient from './apiClient';

export interface Tool {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
  displayOrder: number;
}

export interface CreateToolRequest {
  name: string;
  description?: string;
  url: string;
  icon: string;
}

class ToolService {
  async getUserTools(): Promise<Tool[]> {
    const response = await apiClient.get<Tool[]>('/tools');
    return response.data;
  }

  async createTool(tool: CreateToolRequest): Promise<Tool> {
    const response = await apiClient.post<Tool>('/tools', tool);
    return response.data;
  }

  async deleteTool(toolId: number): Promise<void> {
    await apiClient.delete(`/tools/${toolId}`);
  }

  async updateToolsOrder(toolIds: number[]): Promise<Tool[]> {
    const response = await apiClient.put<Tool[]>('/tools/order', { toolIds });
    return response.data;
  }
}

export default new ToolService();
