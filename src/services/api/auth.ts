// ============================================
// Authentication Service
// ============================================
// Full-featured auth service với:
// - Login/Register/Logout
// - Password reset
// - Token management
// - Email verification
// ============================================

import { apiClient } from './client';
import { StorageService } from '../storage/asyncStorage';
import { API_ENDPOINTS } from '@constants/config';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  User,
} from '@/types/models';
import type { ChangePasswordData } from '@/types/api';

/**
 * Authentication Service
 */
export class AuthService {
  // ============================================
  // Login & Registration
  // ============================================

  /**
   * Login user với email và password
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.LOGIN,
        credentials,
        { skipAuth: true }
      );

      // Save tokens and user data
      await StorageService.saveAuthToken(response.token);
      await StorageService.saveRefreshToken(response.refreshToken);
      await StorageService.saveUserData(response.user);

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register new user
   */
  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.REGISTER,
        data,
        { skipAuth: true }
      );

      // Save tokens and user data
      await StorageService.saveAuthToken(response.token);
      await StorageService.saveRefreshToken(response.refreshToken);
      await StorageService.saveUserData(response.user);

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user - Clear tokens and user data
   */
  static async logout(): Promise<void> {
    try {
      // Call logout API (optional - to invalidate token on server)
      await apiClient.post(API_ENDPOINTS.LOGOUT).catch(() => {
        // Ignore errors - still clear local data
      });
    } finally {
      // Always clear local auth data
      await StorageService.clearAuth();
    }
  }

  // ============================================
  // Token Management
  // ============================================

  /**
   * Refresh access token using refresh token
   */
  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.REFRESH_TOKEN,
        { refreshToken },
        { skipAuth: true }
      );

      // Save new tokens
      await StorageService.saveAuthToken(response.token);
      await StorageService.saveRefreshToken(response.refreshToken);

      return response;
    } catch (error) {
      // If refresh fails, logout user
      await this.logout();
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    const token = await StorageService.getAuthToken();
    return !!token;
  }

  /**
   * Get current user from storage
   */
  static async getCurrentUser(): Promise<User | null> {
    return await StorageService.getUserData();
  }

  // ============================================
  // Password Management
  // ============================================

  /**
   * Request password reset - Send reset email
   */
  static async requestPasswordReset(email: string): Promise<void> {
    try {
      await apiClient.post(
        '/auth/forgot-password',
        { email },
        { skipAuth: true }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  static async resetPassword(
    token: string,
    newPassword: string
  ): Promise<void> {
    try {
      await apiClient.post(
        '/auth/reset-password',
        { token, password: newPassword },
        { skipAuth: true }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Change password for logged in user
   */
  static async changePassword(data: ChangePasswordData): Promise<void> {
    try {
      await apiClient.post('/auth/change-password', data);
    } catch (error) {
      throw error;
    }
  }

  // ============================================
  // Email Verification
  // ============================================

  /**
   * Send verification email
   */
  static async sendVerificationEmail(): Promise<void> {
    try {
      await apiClient.post('/auth/send-verification');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(token: string): Promise<void> {
    try {
      await apiClient.post(
        '/auth/verify-email',
        { token },
        { skipAuth: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // ============================================
  // Profile Management
  // ============================================

  /**
   * Get user profile
   */
  static async getProfile(): Promise<User> {
    try {
      const user = await apiClient.get<User>(API_ENDPOINTS.USER_PROFILE);
      
      // Update cached user data
      await StorageService.saveUserData(user);
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const user = await apiClient.put<User>(
        API_ENDPOINTS.UPDATE_PROFILE,
        data
      );
      
      // Update cached user data
      await StorageService.saveUserData(user);
      
      return user;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * 1. Login:
 * ```typescript
 * const response = await AuthService.login({
 *   email: 'user@example.com',
 *   password: 'password123'
 * });
 * console.log('Logged in:', response.user);
 * ```
 * 
 * 2. Register:
 * ```typescript
 * const response = await AuthService.register({
 *   email: 'new@example.com',
 *   password: 'password123',
 *   name: 'John Doe',
 *   phone: '+1234567890'
 * });
 * ```
 * 
 * 3. Check authentication:
 * ```typescript
 * const isAuth = await AuthService.isAuthenticated();
 * if (isAuth) {
 *   const user = await AuthService.getCurrentUser();
 * }
 * ```
 * 
 * 4. Password reset flow:
 * ```typescript
 * // Step 1: Request reset
 * await AuthService.requestPasswordReset('user@example.com');
 * 
 * // Step 2: User receives email with token
 * // Step 3: Reset with token
 * await AuthService.resetPassword(token, 'newPassword123');
 * ```
 * 
 * 5. Update profile:
 * ```typescript
 * const updatedUser = await AuthService.updateProfile({
 *   name: 'New Name',
 *   phone: '+9876543210'
 * });
 * ```
 */
