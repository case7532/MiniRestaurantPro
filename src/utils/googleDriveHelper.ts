// ============================================
// Google Drive Image Helper
// ============================================
// Component helper để xử lý Google Drive image URLs
// ============================================

import { Alert, Linking } from 'react-native';

export class GoogleDriveImageHelper {
  private static readonly DRIVE_FOLDER =
    'https://drive.google.com/drive/folders/1d9xZEsRfglHSz_Xy0YDRHyvaYhWOROmx';

  /**
   * Show instructions for uploading to Google Drive
   */
  static showUploadInstructions(): void {
    Alert.alert(
      '📁 Hướng dẫn upload ảnh',
      `1. Nhấn "Mở Google Drive" để truy cập thư mục\n\n` +
        `2. Upload ảnh món ăn vào thư mục\n\n` +
        `3. Click chuột phải vào ảnh → "Get link"\n\n` +
        `4. Chọn "Anyone with the link" → "Viewer"\n\n` +
        `5. Copy link và paste vào ứng dụng\n\n` +
        `Link format:\n` +
        `https://drive.google.com/file/d/FILE_ID/view`,
      [
        {
          text: 'Đóng',
          style: 'cancel',
        },
        {
          text: 'Mở Google Drive',
          onPress: () => this.openDriveFolder(),
        },
      ],
    );
  }

  /**
   * Open Google Drive folder in browser
   */
  static async openDriveFolder(): Promise<void> {
    try {
      const canOpen = await Linking.canOpenURL(this.DRIVE_FOLDER);
      if (canOpen) {
        await Linking.openURL(this.DRIVE_FOLDER);
      } else {
        Alert.alert('Lỗi', 'Không thể mở Google Drive');
      }
    } catch (error) {
      console.error('Error opening Drive folder:', error);
      Alert.alert('Lỗi', 'Không thể mở Google Drive');
    }
  }

  /**
   * Validate Google Drive URL format
   */
  static isValidGoogleDriveUrl(url: string): boolean {
    if (!url) {
      return false;
    }

    const patterns = [
      /drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+/,
      /drive\.google\.com\/uc\?id=[a-zA-Z0-9_-]+/,
      /drive\.google\.com\/thumbnail\?id=[a-zA-Z0-9_-]+/,
    ];

    return patterns.some(pattern => pattern.test(url));
  }

  /**
   * Convert Google Drive URL to direct image URL
   */
  static convertToDirectUrl(url: string): string {
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
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    // If it's already a valid URL, return as is
    return url;
  }

  /**
   * Show error for invalid URL
   */
  static showInvalidUrlError(): void {
    Alert.alert(
      'URL không hợp lệ',
      'Vui lòng nhập URL Google Drive hợp lệ.\n\n' +
        'Ví dụ:\n' +
        'https://drive.google.com/file/d/1ABC123/view',
      [{ text: 'OK' }],
    );
  }

  /**
   * Prompt user to input Google Drive URL
   */
  static promptForImageUrl(
    onSuccess: (url: string) => void,
    currentUrl?: string,
  ): void {
    Alert.prompt(
      '🖼️ Link ảnh Google Drive',
      'Paste link ảnh từ Google Drive:',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Hướng dẫn',
          onPress: () => this.showUploadInstructions(),
        },
        {
          text: 'Xác nhận',
          onPress: url => {
            if (!url || !url.trim()) {
              return;
            }

            if (!this.isValidGoogleDriveUrl(url)) {
              this.showInvalidUrlError();
              return;
            }

            const directUrl = this.convertToDirectUrl(url);
            onSuccess(directUrl);
          },
        },
      ],
      'plain-text',
      currentUrl || '',
      'url',
    );
  }

  /**
   * Get placeholder image URL
   */
  static getPlaceholderUrl(): string {
    return 'https://via.placeholder.com/400x300.png?text=No+Image';
  }
}
