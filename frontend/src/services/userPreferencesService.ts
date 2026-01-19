import apiClient from './apiClient';

export interface UserPreferences {
  userId: number;
  preferences: {
    tools?: any[];
    dashboards?: any[];
    selectedSite?: string;
    sidebarOpen?: boolean;
    language?: string;
    notifications?: boolean;
    [key: string]: any;
  };
}

class UserPreferencesService {
  /**
   * Get current user's preferences
   */
  async getUserPreferences(): Promise<UserPreferences> {
    const response = await apiClient.get<UserPreferences>('/users/me/preferences/v2');
    return response.data;
  }

  /**
   * Update user preferences (full replace)
   */
  async updateUserPreferences(preferences: Record<string, any>): Promise<UserPreferences> {
    const response = await apiClient.put<UserPreferences>('/users/me/preferences/v2', preferences);
    return response.data;
  }

  /**
   * Merge user preferences (partial update)
   */
  async mergeUserPreferences(partialPreferences: Record<string, any>): Promise<UserPreferences> {
    const response = await apiClient.patch<UserPreferences>('/users/me/preferences/v2', partialPreferences);
    return response.data;
  }

  /**
   * Save tools configuration
   */
  async saveTools(tools: any[]): Promise<UserPreferences> {
    return this.mergeUserPreferences({ tools });
  }

  /**
   * Save dashboards configuration
   */
  async saveDashboards(dashboards: any[]): Promise<UserPreferences> {
    return this.mergeUserPreferences({ dashboards });
  }

  /**
   * Save selected site
   */
  async saveSelectedSite(siteId: string): Promise<UserPreferences> {
    return this.mergeUserPreferences({ selectedSite: siteId });
  }

  /**
   * Save sidebar state
   */
  async saveSidebarState(isOpen: boolean): Promise<UserPreferences> {
    return this.mergeUserPreferences({ sidebarOpen: isOpen });
  }
}

export default new UserPreferencesService();
