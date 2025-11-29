/**
 * Auth Context
 * Quản lý authentication state cho toàn bộ ứng dụng
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userName: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userName: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const AUTH_STORAGE_KEY = '@app_auth_token';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (userName: string, password: string) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        userName,
        password,
      );
      if (userCredential.user) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      await auth().signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  }, []);

  const register = useCallback(async (userName: string, password: string) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        userName,
        password,
      );
      if (userCredential.user) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to register:', error);
      throw error;
    }
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    register,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Usage example:
 *
 * ```tsx
 * // In App.tsx
 * import { AuthProvider } from '@/context/AuthContext';
 *
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <YourApp />
 *     </AuthProvider>
 *   );
 * }
 * ```
 */
