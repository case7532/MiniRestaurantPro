// ============================================
// Firebase Configuration
// ============================================
// Cấu hình Firebase cho ứng dụng
// Thay thế các giá trị bên dưới bằng config từ Firebase Console
// ============================================

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * NOTE: This is Web Firebase config - FOR REFERENCE ONLY
 * React Native uses native Firebase SDK (@react-native-firebase)
 * Configuration files are:
 * - iOS: ios/MiniRestaurantPro/GoogleService-Info.plist
 * - Android: android/app/google-services.json
 */
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  // Uncomment nếu sử dụng Analytics
  // measurementId: 'YOUR_MEASUREMENT_ID',
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

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
