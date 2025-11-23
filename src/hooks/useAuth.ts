// ============================================
// useAuth Hook - Firebase Authentication
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { AuthService } from '@services/api/authFirebase';
import { FirebaseAuthService } from '@services/firebase';
import type { User, LoginCredentials, RegisterData } from '@/types/models';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
}

/**
 * Custom hook for Firebase authentication
 * 
 * @example
 * ```tsx
 * const { user, loading, login, logout, register } = useAuth();
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

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = FirebaseAuthService.onAuthStateChanged(async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          // User is signed in, get user data
          const userData = await AuthService.getCurrentUser();
          setUser(userData);
        } else {
          // User is signed out
          setUser(null);
        }
      } catch (err) {
        console.error('Error in auth state listener:', err);
        setError(err instanceof Error ? err.message : 'Authentication error');
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(credentials);
      setUser(response.user);
    } catch (err: any) {
      const errorMessage = err.message || 'Đăng nhập thất bại';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.register(data);
      setUser(response.user);
    } catch (err: any) {
      const errorMessage = err.message || 'Đăng ký thất bại';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await AuthService.logout();
      setUser(null);
    } catch (err: any) {
      const errorMessage = err.message || 'Đăng xuất thất bại';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await AuthService.getProfile();
      setUser(userData);
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể tải thông tin người dùng';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const sendPasswordResetEmail = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      await AuthService.requestPasswordReset(email);
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể gửi email khôi phục mật khẩu';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const sendVerificationEmail = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await AuthService.sendVerificationEmail();
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể gửi email xác thực';
      setError(errorMessage);
      throw new Error(errorMessage);
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
    register,
    logout,
    refreshUser,
    sendPasswordResetEmail,
    sendVerificationEmail,
  };
};
