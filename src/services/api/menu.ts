// ============================================
// Menu Service
// ============================================
// Service để quản lý menu items với:
// - CRUD operations
// - Category management
// - Search & Filter
// - Image upload
// ============================================

import { apiClient } from './client';
import { API_ENDPOINTS } from '@constants/config';
import type { 
  MenuItem,
  MenuCategory,
  PaginatedResponse,
} from '@/types/models';
import type { 
  MenuListParams,
  CreateMenuItemData,
  UpdateMenuItemData,
  UploadResponse,
} from '@/types/api';

/**
 * Menu Service
 */
export class MenuService {
  // ============================================
  // Menu Items CRUD
  // ============================================

  /**
   * Get all menu items với pagination và filters
   */
  static async getMenuItems(params?: MenuListParams): Promise<PaginatedResponse<MenuItem>> {
    try {
      const response = await apiClient.get<PaginatedResponse<MenuItem>>(
        API_ENDPOINTS.MENU_LIST,
        { params }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get single menu item by ID
   */
  static async getMenuItem(id: string): Promise<MenuItem> {
    try {
      const url = API_ENDPOINTS.MENU_ITEM.replace(':id', id);
      const response = await apiClient.get<MenuItem>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new menu item
   */
  static async createMenuItem(data: CreateMenuItemData): Promise<MenuItem> {
    try {
      const response = await apiClient.post<MenuItem>(
        API_ENDPOINTS.MENU_LIST,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update existing menu item
   */
  static async updateMenuItem(
    id: string,
    data: UpdateMenuItemData
  ): Promise<MenuItem> {
    try {
      const url = API_ENDPOINTS.MENU_ITEM.replace(':id', id);
      const response = await apiClient.put<MenuItem>(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete menu item
   */
  static async deleteMenuItem(id: string): Promise<void> {
    try {
      const url = API_ENDPOINTS.MENU_ITEM.replace(':id', id);
      await apiClient.delete(url);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Toggle menu item availability
   */
  static async toggleAvailability(id: string): Promise<MenuItem> {
    try {
      const url = API_ENDPOINTS.MENU_ITEM.replace(':id', id);
      const response = await apiClient.patch<MenuItem>(`${url}/toggle-availability`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // ============================================
  // Category Management
  // ============================================

  /**
   * Get all menu categories
   */
  static async getCategories(): Promise<MenuCategory[]> {
    try {
      const response = await apiClient.get<MenuCategory[]>(
        API_ENDPOINTS.MENU_CATEGORIES
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get menu items by category
   */
  static async getItemsByCategory(
    category: MenuCategory,
    params?: Omit<MenuListParams, 'category'>
  ): Promise<PaginatedResponse<MenuItem>> {
    try {
      const response = await apiClient.get<PaginatedResponse<MenuItem>>(
        API_ENDPOINTS.MENU_LIST,
        { params: { ...params, category } }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // ============================================
  // Search & Filter
  // ============================================

  /**
   * Search menu items by name or description
   */
  static async searchMenuItems(
    query: string,
    params?: Omit<MenuListParams, 'search'>
  ): Promise<PaginatedResponse<MenuItem>> {
    try {
      const response = await apiClient.get<PaginatedResponse<MenuItem>>(
        API_ENDPOINTS.MENU_LIST,
        { params: { ...params, search: query } }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get available menu items only
   */
  static async getAvailableItems(
    params?: Omit<MenuListParams, 'available'>
  ): Promise<PaginatedResponse<MenuItem>> {
    try {
      const response = await apiClient.get<PaginatedResponse<MenuItem>>(
        API_ENDPOINTS.MENU_LIST,
        { params: { ...params, available: true } }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // ============================================
  // Image Upload
  // ============================================

  /**
   * Upload menu item image
   */
  static async uploadImage(
    file: File | Blob,
    onProgress?: (progress: number) => void
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await apiClient.upload<UploadResponse>(
        '/menu/upload-image',
        formData,
        onProgress
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete menu item image
   */
  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      await apiClient.delete('/menu/delete-image', {
        data: { imageUrl },
      });
    } catch (error) {
      throw error;
    }
  }

  // ============================================
  // Batch Operations
  // ============================================

  /**
   * Bulk update menu items
   */
  static async bulkUpdate(
    items: Array<{ id: string; data: UpdateMenuItemData }>
  ): Promise<MenuItem[]> {
    try {
      const response = await apiClient.post<MenuItem[]>(
        '/menu/bulk-update',
        { items }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Bulk delete menu items
   */
  static async bulkDelete(ids: string[]): Promise<void> {
    try {
      await apiClient.post('/menu/bulk-delete', { ids });
    } catch (error) {
      throw error;
    }
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * 1. Get menu items with pagination:
 * ```typescript
 * const result = await MenuService.getMenuItems({
 *   page: 1,
 *   pageSize: 20,
 *   category: 'main_course',
 *   available: true
 * });
 * console.log(result.data); // MenuItem[]
 * console.log(result.pagination); // { page, pageSize, total, totalPages }
 * ```
 * 
 * 2. Create new item:
 * ```typescript
 * const newItem = await MenuService.createMenuItem({
 *   name: 'Pad Thai',
 *   description: 'Thai stir-fried noodles',
 *   price: 12.99,
 *   category: 'main_course',
 *   preparationTime: 15,
 *   ingredients: ['rice noodles', 'shrimp', 'peanuts']
 * });
 * ```
 * 
 * 3. Search items:
 * ```typescript
 * const results = await MenuService.searchMenuItems('pasta', {
 *   page: 1,
 *   pageSize: 10
 * });
 * ```
 * 
 * 4. Upload image:
 * ```typescript
 * const uploadResult = await MenuService.uploadImage(
 *   imageFile,
 *   (progress) => console.log(`Upload: ${progress}%`)
 * );
 * 
 * // Then update menu item with image URL
 * await MenuService.updateMenuItem(itemId, {
 *   image: uploadResult.url
 * });
 * ```
 * 
 * 5. Get items by category:
 * ```typescript
 * const appetizers = await MenuService.getItemsByCategory('appetizer');
 * ```
 */
