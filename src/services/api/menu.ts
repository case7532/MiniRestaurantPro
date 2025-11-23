// ============================================
// Menu Service - Firebase Implementation
// ============================================
// Service để quản lý menu items với:
// - CRUD operations
// - Category management
// - Search & Filter
// - Image upload to Firebase Storage
// ============================================

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase.config';
import type { MenuItem, MenuCategory } from '@/types/models';

const MENU_COLLECTION = 'menuItems';
// Google Drive folder for menu images
// const GOOGLE_DRIVE_FOLDER = 'https://drive.google.com/drive/folders/1d9xZEsRfglHSz_Xy0YDRHyvaYhWOROmx';

/**
 * Menu Service - Firebase Firestore Implementation
 */
export class MenuService {
  // ============================================
  // Menu Items CRUD
  // ============================================

  /**
   * Get all menu items
   */
  static async getMenuItems(): Promise<MenuItem[]> {
    try {
      const menuRef = collection(db, MENU_COLLECTION);
      const q = query(menuRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      return snapshot.docs.map(
        docSnap =>
          ({
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate().toISOString(),
            updatedAt: docSnap.data().updatedAt?.toDate().toISOString(),
          } as MenuItem),
      );
    } catch (error) {
      console.error('Error getting menu items:', error);
      throw new Error('Không thể tải danh sách món ăn');
    }
  }

  /**
   * Get single menu item by ID
   */
  static async getMenuItem(id: string): Promise<MenuItem> {
    try {
      const docRef = doc(db, MENU_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Không tìm thấy món ăn');
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate().toISOString(),
        updatedAt: docSnap.data().updatedAt?.toDate().toISOString(),
      } as MenuItem;
    } catch (error) {
      console.error('Error getting menu item:', error);
      throw new Error('Không thể tải thông tin món ăn');
    }
  }

  /**
   * Create new menu item
   */
  static async createMenuItem(
    data: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<MenuItem> {
    try {
      const menuRef = collection(db, MENU_COLLECTION);
      const now = Timestamp.now();

      const docRef = await addDoc(menuRef, {
        ...data,
        createdAt: now,
        updatedAt: now,
      });

      return await this.getMenuItem(docRef.id);
    } catch (error) {
      console.error('Error creating menu item:', error);
      throw new Error('Không thể tạo món ăn mới');
    }
  }

  /**
   * Update existing menu item
   */
  static async updateMenuItem(
    id: string,
    data: Partial<MenuItem>,
  ): Promise<MenuItem> {
    try {
      const docRef = doc(db, MENU_COLLECTION, id);

      // Remove fields that shouldn't be updated

      const { id: _id, createdAt: _createdAt, ...updateData } = data;

      await updateDoc(docRef, {
        ...updateData,
        updatedAt: Timestamp.now(),
      });

      return await this.getMenuItem(id);
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw new Error('Không thể cập nhật món ăn');
    }
  }

  /**
   * Delete menu item
   */
  static async deleteMenuItem(id: string): Promise<void> {
    try {
      // Note: Images on Google Drive are not deleted automatically
      // Admin needs to manually delete them from the Drive folder if needed

      const docRef = doc(db, MENU_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw new Error('Không thể xóa món ăn');
    }
  }

  /**
   * Toggle menu item availability
   */
  static async toggleAvailability(id: string): Promise<MenuItem> {
    try {
      const item = await this.getMenuItem(id);
      return await this.updateMenuItem(id, {
        available: !item.available,
      });
    } catch (error) {
      console.error('Error toggling availability:', error);
      throw new Error('Không thể thay đổi trạng thái món ăn');
    }
  }

  // ============================================
  // Category Management
  // ============================================

  /**
   * Get menu items by category
   */
  static async getItemsByCategory(category: MenuCategory): Promise<MenuItem[]> {
    try {
      const menuRef = collection(db, MENU_COLLECTION);
      const q = query(
        menuRef,
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map(
        docSnap =>
          ({
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate().toISOString(),
            updatedAt: docSnap.data().updatedAt?.toDate().toISOString(),
          } as MenuItem),
      );
    } catch (error) {
      console.error('Error getting menu items by category:', error);
      throw new Error('Không thể tải danh sách món ăn theo danh mục');
    }
  }

  // ============================================
  // Search & Filter
  // ============================================

  /**
   * Search menu items by name or description
   */
  static async searchMenuItems(searchTerm: string): Promise<MenuItem[]> {
    try {
      const items = await this.getMenuItems();
      const lowerSearch = searchTerm.toLowerCase();

      return items.filter(
        item =>
          item.name.toLowerCase().includes(lowerSearch) ||
          item.description.toLowerCase().includes(lowerSearch),
      );
    } catch (error) {
      console.error('Error searching menu items:', error);
      throw new Error('Không thể tìm kiếm món ăn');
    }
  }

  /**
   * Get available menu items only
   */
  static async getAvailableItems(): Promise<MenuItem[]> {
    try {
      const items = await this.getMenuItems();
      return items.filter(item => item.available);
    } catch (error) {
      console.error('Error getting available items:', error);
      throw new Error('Không thể tải danh sách món ăn có sẵn');
    }
  }

  // ============================================
  // Image Management - Google Drive
  // ============================================

  /**
   * Validate and convert Google Drive URL to direct image URL
   * Accepts:
   * - Shareable link: https://drive.google.com/file/d/{FILE_ID}/view
   * - Direct link: https://drive.google.com/uc?id={FILE_ID}
   * - Thumbnail: https://drive.google.com/thumbnail?id={FILE_ID}
   */
  static convertGoogleDriveUrl(url: string): string {
    try {
      // Already a direct link
      if (
        url.includes('drive.google.com/uc?id=') ||
        url.includes('drive.google.com/thumbnail?id=')
      ) {
        return url;
      }

      // Extract file ID from shareable link
      const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        // Convert to direct download link
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }

      // If it's already a valid URL, return as is
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }

      throw new Error('Invalid Google Drive URL format');
    } catch (error) {
      console.error('Error converting Google Drive URL:', error);
      throw new Error('URL Google Drive không hợp lệ');
    }
  }

  /**
   * Validate image URL (Google Drive or other)
   */
  static async validateImageUrl(url: string): Promise<boolean> {
    try {
      const convertedUrl = this.convertGoogleDriveUrl(url);
      const response = await fetch(convertedUrl, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('Error validating image URL:', error);
      return false;
    }
  }

  /**
   * Upload to Google Drive (requires manual upload)
   * This method guides users to upload manually to Google Drive
   * and returns instructions
   */
  static getGoogleDriveUploadInstructions(): string {
    return `
HƯỚNG DẪN UPLOAD ẢNH LÊN GOOGLE DRIVE:

1. Truy cập: https://drive.google.com/drive/folders/1d9xZEsRfglHSz_Xy0YDRHyvaYhWOROmx
2. Click "New" -> "File upload"
3. Chọn ảnh món ăn cần upload
4. Sau khi upload, click chuột phải vào ảnh -> "Get link"
5. Chọn "Anyone with the link" -> "Viewer"
6. Copy link và paste vào ứng dụng

Link format: https://drive.google.com/file/d/FILE_ID/view
    `;
  }
}

/**
 * USAGE EXAMPLES:
 *
 * 1. Get all menu items:
 * ```typescript
 * const items = await MenuService.getMenuItems();
 * ```
 *
 * 2. Create new item with Google Drive image:
 * ```typescript
 * // Upload ảnh lên Google Drive folder trước
 * // Folder: https://drive.google.com/drive/folders/1d9xZEsRfglHSz_Xy0YDRHyvaYhWOROmx
 *
 * const googleDriveUrl = 'https://drive.google.com/file/d/FILE_ID/view';
 * const imageUrl = MenuService.convertGoogleDriveUrl(googleDriveUrl);
 *
 * const newItem = await MenuService.createMenuItem({
 *   name: 'Phở Bò',
 *   description: 'Traditional Vietnamese beef noodle soup',
 *   price: 85000,
 *   category: MenuCategory.MAIN_COURSE,
 *   available: true,
 *   image: imageUrl,
 *   preparationTime: 15,
 *   ingredients: ['beef', 'rice noodles', 'herbs']
 * });
 * ```
 *
 * 3. Search items:
 * ```typescript
 * const results = await MenuService.searchMenuItems('phở');
 * ```
 *
 * 4. Convert Google Drive URL:
 * ```typescript
 * const shareableUrl = 'https://drive.google.com/file/d/1ABC123/view';
 * const directUrl = MenuService.convertGoogleDriveUrl(shareableUrl);
 * // Returns: 'https://drive.google.com/uc?export=view&id=1ABC123'
 * ```
 *
 * 5. Get upload instructions:
 * ```typescript
 * const instructions = MenuService.getGoogleDriveUploadInstructions();
 * console.log(instructions);
 * ```
 *
 * 6. Get items by category:
 * ```typescript
 * const appetizers = await MenuService.getItemsByCategory(MenuCategory.APPETIZER);
 * ```
 *
 * GOOGLE DRIVE SETUP:
 * - Folder: ${GOOGLE_DRIVE_FOLDER}
 * - Quyền: Anyone with the link can view
 * - Upload ảnh vào folder này
 * - Copy link và convert bằng convertGoogleDriveUrl()
 */
