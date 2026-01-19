import apiClient from './apiClient';

export interface DashboardConfig {
  id: number;
  userId: number;
  dashboardIds: string[];
}

class DashboardService {
  async getAvailableDashboards(): Promise<string[]> {
    const response = await apiClient.get<string[]>('/dashboards/available');
    return response.data;
  }

  async getUserDashboardConfig(): Promise<DashboardConfig> {
    const response = await apiClient.get<DashboardConfig>('/dashboards/me');
    return response.data;
  }

  async saveDashboardConfig(dashboardIds: string[]): Promise<DashboardConfig> {
    const response = await apiClient.put<DashboardConfig>('/dashboards/me', dashboardIds);
    return response.data;
  }
}

export default new DashboardService();
