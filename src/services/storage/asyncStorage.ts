// ============================================
// AsyncStorage Service
// ============================================
// Centralized storage management với type-safe methods
// ============================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Config } from '@constants/config';
import type { User } from '@/types/models';

/**
 * Storage Service - Quản lý local storage
 */
export class StorageService {
  // ============================================
  // Authentication Storage
  // ============================================

  /**
   * Save auth token
   */
  static async saveAuthToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(Config.STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error saving auth token:', error);
      throw error;
    }
  }

  /**
   * Get auth token
   */
  static async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(Config.STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  /**
   * Save refresh token
   */
  static async saveRefreshToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(Config.STORAGE_KEYS.REFRESH_TOKEN, token);
    } catch (error) {
      console.error('Error saving refresh token:', error);
      throw error;
    }
  }

  /**
   * Get refresh token
   */
  static async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(Config.STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  /**
   * Save user data
   */
  static async saveUserData(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(
        Config.STORAGE_KEYS.USER_DATA,
        JSON.stringify(user),
      );
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }

  /**
   * Get user data
   */
  static async getUserData(): Promise<User | null> {
    try {
      const data = await AsyncStorage.getItem(Config.STORAGE_KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  /**
   * Clear all auth data
   */
  static async clearAuth(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        Config.STORAGE_KEYS.AUTH_TOKEN,
        Config.STORAGE_KEYS.REFRESH_TOKEN,
        Config.STORAGE_KEYS.USER_DATA,
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw error;
    }
  }

  // ============================================
  // App Settings Storage
  // ============================================

  /**
   * Save app language
   */
  static async saveLanguage(language: string): Promise<void> {
    try {
      await AsyncStorage.setItem(Config.STORAGE_KEYS.LANGUAGE, language);
    } catch (error) {
      console.error('Error saving language:', error);
      throw error;
    }
  }

  /**
   * Get app language
   */
  static async getLanguage(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(Config.STORAGE_KEYS.LANGUAGE);
    } catch (error) {
      console.error('Error getting language:', error);
      return null;
    }
  }

  /**
   * Save theme preference
   */
  static async saveTheme(theme: string): Promise<void> {
    try {
      await AsyncStorage.setItem(Config.STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error('Error saving theme:', error);
      throw error;
    }
  }

  /**
   * Get theme preference
   */
  static async getTheme(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(Config.STORAGE_KEYS.THEME);
    } catch (error) {
      console.error('Error getting theme:', error);
      return null;
    }
  }

  // ============================================
  // Generic Storage Methods
  // ============================================

  /**
   * Save any data with key
   */
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  }

  /**
   * Get data by key
   */
  static async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  /**
   * Save object as JSON
   */
  static async setObject<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving object ${key}:`, error);
      throw error;
    }
  }

  /**
   * Get object from JSON
   */
  static async getObject<T>(key: string): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting object ${key}:`, error);
      return null;
    }
  }

  /**
   * Remove item by key
   */
  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  /**
   * Clear all storage
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * Get all keys
   */
  static async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }
}

/**
 * USAGE EXAMPLES:
 *
 * 1. Auth storage:
 * ```typescript
 * await StorageService.saveAuthToken('token123');
 * const token = await StorageService.getAuthToken();
 * await StorageService.clearAuth();
 * ```
 *
 * 2. User data:
 * ```typescript
 * await StorageService.saveUserData(user);
 * const user = await StorageService.getUserData();
 * ```
 *
 * 3. Generic storage:
 * ```typescript
 * await StorageService.setObject('myKey', { data: 'value' });
 * const data = await StorageService.getObject<MyType>('myKey');
 * ```
 */
