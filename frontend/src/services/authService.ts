import apiClient from './apiClient';
import tokenService from './tokenService';
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

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    siteIds: number[];
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}

class AuthService {
  private readonly STORAGE_KEY = 'mockUser';

  /**
   * Login with email and password
   */
  async login(email: string, password: string, rememberMe: boolean = false): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      email,
      password,
      rememberMe,
    });

    const { accessToken, refreshToken } = response.data;
    tokenService.saveTokens(accessToken, refreshToken);

    return response.data;
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/register', data);

    const { accessToken, refreshToken } = response.data;
    tokenService.saveTokens(accessToken, refreshToken);

    return response.data;
  }

  /**
   * Mock SSO login for development
   */
  async mockSSOLogin(email: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/sso/mock', { email });

    const { accessToken, refreshToken } = response.data;
    tokenService.saveTokens(accessToken, refreshToken);

    return response.data;
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<void> {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<LoginResponse>('/auth/refresh', {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    tokenService.saveTokens(accessToken, newRefreshToken);
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string, confirmPassword: string): Promise<void> {
    await apiClient.post('/auth/reset-password', {
      token,
      newPassword,
      confirmPassword,
    });
  }

  /**
   * Logout user
   */
  logout(): void {
    tokenService.removeTokens();
    // Also clear mock user if it exists
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.href = '/login';
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return tokenService.isAuthenticated();
  }

  /**
   * Get current user from API
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  }

  /**
   * Update user preferences
   */
  async updatePreferences(preferences: { preferredLanguage?: string; notificationEnabled?: boolean }): Promise<User> {
    const response = await apiClient.put<User>('/users/me/preferences', preferences);
    return response.data;
  }

  // ========== Mock Auth Methods (for development) ==========

  /**
   * Get current mock user email from localStorage
   */
  getCurrentMockUserEmail(): string {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored || defaultMockUser.email;
  }

  /**
   * Switch to a different mock user (dev only)
   */
  switchMockUser(email: string): void {
    localStorage.setItem(this.STORAGE_KEY, email);
    window.location.reload();
  }

  /**
   * Get available mock users (dev only)
   */
  getAvailableMockUsers() {
    return mockUsers;
  }
}

export default new AuthService();
