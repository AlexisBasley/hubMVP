import apiClient from './apiClient';
import { defaultMockUser, mockUsers } from '../config/authConfig';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  siteIds: number[];
  preferredLanguage: string;
  notificationEnabled: boolean;
}

class AuthService {
  private readonly STORAGE_KEY = 'mockUser';

  // Get current mock user email from localStorage
  getCurrentMockUserEmail(): string {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored || defaultMockUser.email;
  }

  // Switch to a different mock user
  switchMockUser(email: string) {
    localStorage.setItem(this.STORAGE_KEY, email);
    window.location.reload(); // Reload to apply changes
  }

  // Get current user from API
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  }

  // Get available mock users
  getAvailableMockUsers() {
    return mockUsers;
  }

  // Mock login (just sets the mock user)
  login(email: string) {
    localStorage.setItem(this.STORAGE_KEY, email);
  }

  // Mock logout
  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.reload();
  }

  // Update user preferences
  async updatePreferences(preferences: { preferredLanguage?: string; notificationEnabled?: boolean }): Promise<User> {
    const response = await apiClient.put<User>('/users/me/preferences', preferences);
    return response.data;
  }
}

export default new AuthService();
