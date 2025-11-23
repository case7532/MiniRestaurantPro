// ============================================
// Firebase Configuration
// ============================================
// Cấu hình Firebase cho ứng dụng
// Thay thế các giá trị bên dưới bằng config từ Firebase Console
// ============================================

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: process.env.FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
  appId: process.env.FIREBASE_APP_ID || 'YOUR_APP_ID',
  // Uncomment nếu sử dụng Analytics
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'YOUR_MEASUREMENT_ID',
};

/**
 * HƯỚNG DẪN CẤU HÌNH:
 * 
 * 1. Truy cập Firebase Console: https://console.firebase.google.com/
 * 2. Tạo project mới hoặc chọn project có sẵn
 * 3. Thêm iOS app:
 *    - Bundle ID: lấy từ Info.plist trong ios/MiniRestaurantPro/
 *    - Download GoogleService-Info.plist
 *    - Copy vào ios/MiniRestaurantPro/
 * 4. Thêm Android app:
 *    - Package name: lấy từ android/app/build.gradle
 *    - Download google-services.json
 *    - Copy vào android/app/
 * 5. Cập nhật các giá trị trong file này
 * 
 * LƯU Ý:
 * - Có thể tạo file .env để quản lý các giá trị config
 * - Không commit file chứa API keys thật lên Git
 * - Sử dụng .env.example để share template
 */
