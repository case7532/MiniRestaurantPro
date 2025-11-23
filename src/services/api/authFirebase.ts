// ============================================
// Firebase Auth Service Wrapper
// ============================================
// Wrapper cho AuthService hiện tại để sử dụng Firebase
// Tương thích với interface cũ
// ============================================

import { FirebaseAuthService, FirebaseFirestoreService } from '../firebase';
import { StorageService } from '../storage/asyncStorage';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  User,
  UserRole,
} from '@/types/models';
import type { ChangePasswordData } from '@/types/api';

/**
 * Authentication Service với Firebase
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
      // Đăng nhập với Firebase
      const userCredential = await FirebaseAuthService.signInWithEmail(credentials);
      const firebaseUser = userCredential.user;

      // Lấy user data từ Firestore
      let userData = await FirebaseFirestoreService.getUserDocument(firebaseUser.uid);

      // Nếu chưa có user document, tạo mới
      if (!userData) {
        const newUserData: Partial<User> = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          phone: firebaseUser.phoneNumber || '',
          role: 'CUSTOMER' as UserRole,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await FirebaseFirestoreService.setUserDocument(
          firebaseUser.uid,
          newUserData
        );

        userData = newUserData as User;
      }

      // Lấy ID token để làm access token
      const token = await firebaseUser.getIdToken();

      // Tạo response theo format cũ
      const response: AuthResponse = {
        user: userData,
        token: token,
        refreshToken: '', // Firebase manages refresh tokens internally
      };

      // Lưu vào storage
      await StorageService.saveAuthToken(token);
      await StorageService.saveRefreshToken(response.refreshToken);
      await StorageService.saveUserData(userData);

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
      // Đăng ký với Firebase
      const userCredential = await FirebaseAuthService.signUpWithEmail(data);
      const firebaseUser = userCredential.user;

      // Tạo user document trong Firestore
      const userData: Partial<User> = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: data.name,
        phone: data.phone || '',
        role: 'CUSTOMER' as UserRole,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await FirebaseFirestoreService.setUserDocument(
        firebaseUser.uid,
        userData
      );

      // Lấy ID token
      const token = await firebaseUser.getIdToken();

      // Tạo response
      const response: AuthResponse = {
        user: userData as User,
        token: token,
        refreshToken: '', // Firebase manages refresh tokens internally
      };

      // Lưu vào storage
      await StorageService.saveAuthToken(token);
      await StorageService.saveRefreshToken(response.refreshToken);
      await StorageService.saveUserData(userData as User);

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
      await FirebaseAuthService.signOut();
    } finally {
      await StorageService.clearAuth();
    }
  }

  // ============================================
  // Token Management
  // ============================================

  /**
   * Refresh access token
   */
  static async refreshToken(_refreshToken: string): Promise<AuthResponse> {
    try {
      const currentUser = FirebaseAuthService.getCurrentUser();
      
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      // Force refresh token
      const token = await currentUser.getIdToken(true);

      // Lấy user data
      const userData = await FirebaseFirestoreService.getUserDocument(currentUser.uid);

      if (!userData) {
        throw new Error('User data not found');
      }

      const response: AuthResponse = {
        user: userData,
        token: token,
        refreshToken: '', // Firebase manages refresh tokens internally
      };

      // Lưu token mới
      await StorageService.saveAuthToken(token);
      await StorageService.saveRefreshToken(response.refreshToken);

      return response;
    } catch (error) {
      await this.logout();
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    const user = FirebaseAuthService.getCurrentUser();
    return !!user;
  }

  /**
   * Get current user from storage
   */
  static async getCurrentUser(): Promise<User | null> {
    const firebaseUser = FirebaseAuthService.getCurrentUser();
    
    if (!firebaseUser) {
      return null;
    }

    // Lấy full user data từ Firestore
    const userData = await FirebaseFirestoreService.getUserDocument(firebaseUser.uid);
    return userData;
  }

  // ============================================
  // Password Management
  // ============================================

  /**
   * Request password reset - Send reset email
   */
  static async requestPasswordReset(email: string): Promise<void> {
    try {
      await FirebaseAuthService.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reset password with token (Firebase handles this via email)
   */
  static async resetPassword(
    _token: string,
    _newPassword: string
  ): Promise<void> {
    // Firebase xử lý reset password qua email link
    // Không cần implement method này
    throw new Error('Use requestPasswordReset to reset password via email');
  }

  /**
   * Change password for logged in user
   */
  static async changePassword(data: ChangePasswordData): Promise<void> {
    try {
      await FirebaseAuthService.changePassword(
        data.currentPassword,
        data.newPassword
      );
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
      await FirebaseAuthService.sendVerificationEmail();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify email with token (Firebase handles this via email)
   */
  static async verifyEmail(_token: string): Promise<void> {
    // Firebase xử lý verify email qua email link
    // Không cần implement method này
    throw new Error('Email verification handled automatically by Firebase');
  }

  // ============================================
  // Profile Management
  // ============================================

  /**
   * Get user profile
   */
  static async getProfile(): Promise<User> {
    try {
      const firebaseUser = FirebaseAuthService.getCurrentUser();
      
      if (!firebaseUser) {
        throw new Error('No user logged in');
      }

      const user = await FirebaseFirestoreService.getUserDocument(firebaseUser.uid);
      
      if (!user) {
        throw new Error('User data not found');
      }

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
      const firebaseUser = FirebaseAuthService.getCurrentUser();
      
      if (!firebaseUser) {
        throw new Error('No user logged in');
      }

      // Update Firebase Auth profile
      if (data.name || data.avatar) {
        await FirebaseAuthService.updateProfile({
          displayName: data.name,
          photoURL: data.avatar,
        });
      }

      // Update Firestore document
      await FirebaseFirestoreService.updateUserDocument(
        firebaseUser.uid,
        {
          ...data,
          updatedAt: new Date().toISOString(),
        }
      );

      // Lấy updated user
      const user = await FirebaseFirestoreService.getUserDocument(firebaseUser.uid);
      
      if (!user) {
        throw new Error('User data not found');
      }

      // Update cached user data
      await StorageService.saveUserData(user);
      
      return user;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * USAGE EXAMPLES (giống như trước):
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
 */
