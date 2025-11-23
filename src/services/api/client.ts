// ============================================
// API Client Core
// ============================================
// Hệ thống API Client mạnh mẽ với:
// - Automatic token management
// - Request/Response interceptors
// - Error handling & normalization
// - Type-safe methods
// - Retry mechanism
// - Request cancellation
// ============================================

import axios, { 
  AxiosInstance, 
  AxiosError, 
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { Config } from '@constants/config';
import { StorageService } from '../storage/asyncStorage';
import type { ApiResponse, ApiError } from '@types/models';

/**
 * API Client Configuration Options
 */
export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retryAttempts?: number;
  retryDelay?: number;
}

/**
 * Request Configuration with custom options
 */
export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  retry?: boolean;
  customHeaders?: Record<string, string>;
}

/**
 * Enhanced API Client với đầy đủ features
 */
class ApiClient {
  private instance: AxiosInstance;
  private retryAttempts: number;
  private retryDelay: number;
  private isRefreshing: boolean = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor(config?: ApiClientConfig) {
    this.retryAttempts = config?.retryAttempts || 2;
    this.retryDelay = config?.retryDelay || 1000;

    this.instance = axios.create({
      baseURL: config?.baseURL || Config.API_URL,
      timeout: config?.timeout || Config.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup Request & Response Interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const customConfig = config as InternalAxiosRequestConfig & RequestConfig;
        
        // Add auth token if not skipped
        if (!customConfig.skipAuth) {
          const token = await StorageService.getAuthToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        // Add custom headers if provided
        if (customConfig.customHeaders) {
          Object.assign(config.headers, customConfig.customHeaders);
        }

        // Log request in development
        if (__DEV__) {
          console.log('🚀 API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        if (__DEV__) {
          console.error('❌ Request Error:', error);
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        if (__DEV__) {
          console.log('✅ API Response:', {
            status: response.status,
            url: response.config.url,
            data: response.data,
          });
        }
        return response;
      },
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & RequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.handleTokenRefresh();
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            await this.handleUnauthorized();
            return Promise.reject(refreshError);
          }
        }

        // Handle other errors
        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  /**
   * Handle token refresh với queue mechanism
   */
  private async handleTokenRefresh(): Promise<string | null> {
    if (this.isRefreshing) {
      // Wait for the token to be refreshed
      return new Promise((resolve) => {
        this.refreshSubscribers.push((token: string) => {
          resolve(token);
        });
      });
    }

    this.isRefreshing = true;

    try {
      const refreshToken = await StorageService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Call refresh token API (implement this in AuthService)
      const response = await this.instance.post<ApiResponse<{ token: string; refreshToken: string }>(
        '/auth/refresh',
        { refreshToken },
        { skipAuth: true } as RequestConfig
      );

      const { token, refreshToken: newRefreshToken } = response.data.data;

      // Save new tokens
      await StorageService.saveAuthToken(token);
      await StorageService.saveRefreshToken(newRefreshToken);

      // Notify all subscribers
      this.refreshSubscribers.forEach(callback => callback(token));
      this.refreshSubscribers = [];

      return token;
    } catch (error) {
      this.refreshSubscribers = [];
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Handle unauthorized - Clear tokens and redirect
   */
  private async handleUnauthorized(): Promise<void> {
    await StorageService.clearAuth();
    // TODO: Navigate to login screen
    // This should be handled by a navigation service or event emitter
    if (__DEV__) {
      console.log('🚫 Unauthorized - User logged out');
    }
  }

  /**
   * Normalize API errors to consistent format
   */
  private normalizeError(error: AxiosError<ApiError>): Error {
    if (__DEV__) {
      console.error('❌ API Error:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Network error
    if (!error.response) {
      return new Error('Network error. Please check your connection.');
    }

    // API error response
    if (error.response?.data?.error) {
      const apiError = error.response.data.error;
      return new Error(apiError.message || 'An error occurred');
    }

    // HTTP error
    const statusMessages: Record<number, string> = {
      400: 'Bad request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not found',
      500: 'Internal server error',
      503: 'Service unavailable',
    };

    return new Error(
      statusMessages[error.response.status] || 
      error.message || 
      'An unexpected error occurred'
    );
  }

  /**
   * GET request
   */
  async get<T = any>(
    url: string, 
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    url: string, 
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  /**
   * Upload file (multipart/form-data)
   */
  async upload<T = any>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progress: number) => void,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.customHeaders,
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(progress);
        }
      },
    });
    return response.data.data;
  }

  /**
   * Get raw Axios instance for advanced usage
   */
  getAxiosInstance(): AxiosInstance {
    return this.instance;
  }

  /**
   * Create AbortController for request cancellation
   */
  createCancelToken(): AbortController {
    return new AbortController();
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for custom instances
export { ApiClient };

/**
 * USAGE EXAMPLES:
 * 
 * 1. Basic GET request:
 * ```typescript
 * const data = await apiClient.get<User[]>('/users');
 * ```
 * 
 * 2. POST with data:
 * ```typescript
 * const user = await apiClient.post<User>('/users', { name: 'John' });
 * ```
 * 
 * 3. Skip authentication:
 * ```typescript
 * const data = await apiClient.get('/public', { skipAuth: true });
 * ```
 * 
 * 4. Custom headers:
 * ```typescript
 * const data = await apiClient.get('/users', {
 *   customHeaders: { 'X-Custom': 'value' }
 * });
 * ```
 * 
 * 5. Request cancellation:
 * ```typescript
 * const controller = apiClient.createCancelToken();
 * apiClient.get('/users', { signal: controller.signal });
 * // Cancel: controller.abort();
 * ```
 * 
 * 6. File upload:
 * ```typescript
 * const formData = new FormData();
 * formData.append('file', file);
 * const result = await apiClient.upload('/upload', formData, (progress) => {
 *   console.log(`Upload: ${progress}%`);
 * });
 * ```
 */
