import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

interface JwtPayload {
  sub: string; // email
  userId: number;
  exp: number;
  iat: number;
}

/**
 * Token management service for JWT authentication
 */
class TokenService {
  /**
   * Save tokens to localStorage
   */
  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Get access token from localStorage
   */
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  /**
   * Get refresh token from localStorage
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  /**
   * Remove tokens from localStorage
   */
  removeTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  /**
   * Get decoded token payload
   */
  getTokenPayload(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if user is authenticated (has valid access token)
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  /**
   * Get time until token expires (in seconds)
   */
  getTimeUntilExpiry(token: string): number {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return Math.max(0, decoded.exp - currentTime);
    } catch (error) {
      return 0;
    }
  }

  /**
   * Setup automatic token refresh
   * Refreshes the token 5 minutes before it expires
   */
  setupTokenRefresh(refreshCallback: () => Promise<void>): ReturnType<typeof setTimeout> | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const timeUntilExpiry = this.getTimeUntilExpiry(token);
    const refreshTime = Math.max(0, (timeUntilExpiry - 300) * 1000); // 5 minutes before expiry

    if (refreshTime <= 0) {
      // Token already expired or about to expire, refresh immediately
      refreshCallback();
      return null;
    }

    return setTimeout(() => {
      refreshCallback();
    }, refreshTime);
  }
}

export default new TokenService();
