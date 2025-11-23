// ============================================
// Example API Service: Auth Service
// ============================================

import axios, { AxiosInstance, AxiosError } from 'axios';
import { Config, API_ENDPOINTS } from '@constants/config';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  ApiResponse,
  ApiError 
} from '@types/models';

/**
 * API Client Configuration
 */
class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: Config.API_URL,
      timeout: Config.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      async (config) => {
        // Add auth token if available
        const token = await this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          // Handle token expiration
          await this.handleUnauthorized();
        }
        
        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private async getAuthToken(): Promise<string | null> {
    // TODO: Implement with AsyncStorage
    // const token = await AsyncStorage.getItem(Config.STORAGE_KEYS.AUTH_TOKEN);
    // return token;
    return null;
  }

  private async handleUnauthorized() {
    // TODO: Implement token refresh or redirect to login
    console.log('Unauthorized - redirect to login');
  }

  private normalizeError(error: AxiosError<ApiError>): Error {
    if (error.response?.data?.error) {
      return new Error(error.response.data.error.message);
    }
    return new Error(error.message || 'An unexpected error occurred');
  }

  public getClient(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
export const apiClient = new ApiClient().getClient();

/**
 * Authentication Service
 */
export class AuthService {
  /**
   * Login user
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.LOGIN,
        credentials
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register new user
   */
  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.REGISTER,
        data
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.REFRESH_TOKEN,
        { refreshToken }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Example usage:
 * 
 * ```typescript
 * import { AuthService } from '@services/api/auth';
 * 
 * const handleLogin = async () => {
 *   try {
 *     const response = await AuthService.login({
 *       email: 'user@example.com',
 *       password: 'password123'
 *     });
 *     console.log('Logged in:', response.user);
 *   } catch (error) {
 *     console.error('Login failed:', error.message);
 *   }
 * };
 * ```
 */
