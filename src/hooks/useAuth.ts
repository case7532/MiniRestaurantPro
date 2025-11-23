// ============================================
// Example Custom Hook: useAuth
// ============================================

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, LoginCredentials, AuthResponse } from '@types/models';
import { Config } from '@constants/config';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

/**
 * Custom hook for authentication
 * 
 * @example
 * ```tsx
 * const { user, loading, login, logout } = useAuth();
 * 
 * const handleLogin = async () => {
 *   await login({ email: 'user@example.com', password: 'password' });
 * };
 * ```
 */
export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const token = await AsyncStorage.getItem(Config.STORAGE_KEYS.AUTH_TOKEN);
      const userData = await AsyncStorage.getItem(Config.STORAGE_KEYS.USER_DATA);
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (err) {
      console.error('Error checking session:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await AuthService.login(credentials);
      
      // Mock response for example
      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          email: credentials.email,
          name: 'John Doe',
          role: 'admin' as any,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      };

      // Save to storage
      await AsyncStorage.setItem(
        Config.STORAGE_KEYS.AUTH_TOKEN,
        mockResponse.token
      );
      await AsyncStorage.setItem(
        Config.STORAGE_KEYS.USER_DATA,
        JSON.stringify(mockResponse.user)
      );

      setUser(mockResponse.user);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      // TODO: Call logout API if needed
      // await AuthService.logout();

      // Clear storage
      await AsyncStorage.removeItem(Config.STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(Config.STORAGE_KEYS.USER_DATA);

      setUser(null);
    } catch (err: any) {
      setError(err.message || 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    
    try {
      // TODO: Fetch user from API
      // const userData = await UserService.getProfile();
      // setUser(userData);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh user data');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  };
};
