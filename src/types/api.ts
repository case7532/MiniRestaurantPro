// ============================================
// Enhanced Type Definitions for API
// ============================================

// Re-export base types from models
export * from './models';

// ============================================
// API Request Options
// ============================================

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  category?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface QueryParams extends PaginationParams, FilterParams {
  [key: string]: any;
}

// ============================================
// API Service Response Wrappers
// ============================================

export interface ServiceResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ServiceError {
  message: string;
  code?: string;
  details?: any;
}

// ============================================
// Menu API Types
// ============================================

export interface MenuListParams extends PaginationParams {
  category?: string;
  available?: boolean;
  search?: string;
}

export interface CreateMenuItemData {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  preparationTime?: number;
  ingredients?: string[];
  allergens?: string[];
}

export interface UpdateMenuItemData extends Partial<CreateMenuItemData> {
  available?: boolean;
}

// ============================================
// Order API Types
// ============================================

export interface OrderListParams extends PaginationParams {
  status?: string;
  customerId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface UpdateOrderStatusData {
  status: string;
  notes?: string;
}

// ============================================
// User API Types
// ============================================

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// ============================================
// Upload Types
// ============================================

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
