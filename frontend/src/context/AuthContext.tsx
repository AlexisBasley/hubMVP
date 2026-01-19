import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User, LoginResponse } from '../services/authService';
import tokenService from '../services/tokenService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<LoginResponse>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: string;
  }) => Promise<LoginResponse>;
  loginWithSSO: (email: string) => Promise<LoginResponse>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (tokenService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        tokenService.removeTokens();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Setup automatic token refresh
  useEffect(() => {
    if (user) {
      const refreshInterval = tokenService.setupTokenRefresh(async () => {
        try {
          await authService.refreshToken();
        } catch (error) {
          console.error('Failed to refresh token:', error);
          logout();
        }
      });

      return () => {
        if (refreshInterval) {
          clearTimeout(refreshInterval);
        }
      };
    }
  }, [user]);

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<LoginResponse> => {
    setLoading(true);
    try {
      const response = await authService.login(email, password, rememberMe);
      const userData = await authService.getCurrentUser();
      setUser(userData);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: string;
  }): Promise<LoginResponse> => {
    setLoading(true);
    try {
      const response = await authService.register(data);
      const userData = await authService.getCurrentUser();
      setUser(userData);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const loginWithSSO = async (email: string): Promise<LoginResponse> => {
    setLoading(true);
    try {
      const response = await authService.mockSSOLogin(email);
      const userData = await authService.getCurrentUser();
      setUser(userData);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    authService.logout();
  };

  const refreshUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    loginWithSSO,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
