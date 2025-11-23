// ============================================
// useMenu Hook - Menu Management
// ============================================

import { useState, useCallback } from 'react';
import { MenuService } from '@services/api/menu';
import type { MenuItem, MenuCategory } from '@/types/models';

interface UseMenuReturn {
  items: MenuItem[];
  filteredItems: MenuItem[];
  loading: boolean;
  error: string | null;
  selectedCategory: MenuCategory | null;
  searchQuery: string;
  fetchItems: () => Promise<void>;
  getItemById: (id: string) => Promise<MenuItem>;
  createItem: (data: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<MenuItem>;
  updateItem: (id: string, data: Partial<MenuItem>) => Promise<MenuItem>;
  deleteItem: (id: string) => Promise<void>;
  toggleAvailability: (id: string) => Promise<void>;
  filterByCategory: (category: MenuCategory | null) => void;
  searchItems: (query: string) => void;
  convertGoogleDriveUrl: (url: string) => string;
  validateImageUrl: (url: string) => Promise<boolean>;
  getUploadInstructions: () => string;
}

/**
 * Custom hook for menu management
 * 
 * @example
 * ```tsx
 * const { 
 *   items, 
 *   loading, 
 *   fetchItems, 
 *   createItem,
 *   filterByCategory,
 *   searchItems 
 * } = useMenu();
 * 
 * // Fetch all items on mount
 * useEffect(() => {
 *   fetchItems();
 * }, []);
 * 
 * // Filter by category
 * filterByCategory(MenuCategory.MAIN_COURSE);
 * 
 * // Search items
 * searchItems('phở');
 * ```
 */
export const useMenu = (): UseMenuReturn => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch all menu items
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await MenuService.getMenuItems();
      setItems(data);
      setFilteredItems(data);
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể tải danh sách món ăn';
      setError(errorMessage);
      console.error('Error fetching menu items:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get item by ID
  const getItemById = useCallback(async (id: string): Promise<MenuItem> => {
    setLoading(true);
    setError(null);

    try {
      const item = await MenuService.getMenuItem(id);
      return item;
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể tải thông tin món ăn';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new menu item
  const createItem = useCallback(async (
    data: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<MenuItem> => {
    setLoading(true);
    setError(null);

    try {
      const newItem = await MenuService.createMenuItem(data);
      setItems(prev => [newItem, ...prev]);
      setFilteredItems(prev => [newItem, ...prev]);
      return newItem;
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể tạo món ăn mới';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update menu item
  const updateItem = useCallback(async (
    id: string,
    data: Partial<MenuItem>
  ): Promise<MenuItem> => {
    setLoading(true);
    setError(null);

    try {
      const updatedItem = await MenuService.updateMenuItem(id, data);
      
      setItems(prev =>
        prev.map(item => (item.id === id ? updatedItem : item))
      );
      setFilteredItems(prev =>
        prev.map(item => (item.id === id ? updatedItem : item))
      );
      
      return updatedItem;
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể cập nhật món ăn';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete menu item
  const deleteItem = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await MenuService.deleteMenuItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
      setFilteredItems(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể xóa món ăn';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle availability
  const toggleAvailability = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const updatedItem = await MenuService.toggleAvailability(id);
      
      setItems(prev =>
        prev.map(item => (item.id === id ? updatedItem : item))
      );
      setFilteredItems(prev =>
        prev.map(item => (item.id === id ? updatedItem : item))
      );
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể thay đổi trạng thái món ăn';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter by category
  const filterByCategory = useCallback((category: MenuCategory | null) => {
    setSelectedCategory(category);
    
    if (!category) {
      setFilteredItems(items);
      return;
    }
    
    const filtered = items.filter(item => item.category === category);
    setFilteredItems(filtered);
  }, [items]);

  // Search items
  const searchItems = useCallback((query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      if (selectedCategory) {
        filterByCategory(selectedCategory);
      } else {
        setFilteredItems(items);
      }
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    let filtered = items.filter(item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    );
    
    // Apply category filter if selected
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredItems(filtered);
  }, [items, selectedCategory, filterByCategory]);

  // Convert Google Drive URL
  const convertGoogleDriveUrl = useCallback((url: string): string => {
    return MenuService.convertGoogleDriveUrl(url);
  }, []);

  // Validate image URL
  const validateImageUrl = useCallback(async (url: string): Promise<boolean> => {
    return await MenuService.validateImageUrl(url);
  }, []);

  // Get upload instructions
  const getUploadInstructions = useCallback((): string => {
    return MenuService.getGoogleDriveUploadInstructions();
  }, []);

  return {
    items,
    filteredItems,
    loading,
    error,
    selectedCategory,
    searchQuery,
    fetchItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    toggleAvailability,
    filterByCategory,
    searchItems,
    convertGoogleDriveUrl,
    validateImageUrl,
    getUploadInstructions,
  };
};
