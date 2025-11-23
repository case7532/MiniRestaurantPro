# Hướng Dẫn Tích Hợp Firebase

## 📋 Tổng Quan

Firebase đã được tích hợp vào MiniRestaurantPro với các tính năng:
- ✅ Firebase Authentication (Email/Password)
- ✅ Cloud Firestore Database
- ✅ Tự động đồng bộ dữ liệu realtime
- ✅ Quản lý user profiles
- ✅ Token management tự động

---

## 🚀 Cài Đặt & Cấu Hình

### Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** hoặc chọn project có sẵn
3. Đặt tên project (ví dụ: "MiniRestaurantPro")
4. Bật/tắt Google Analytics (tùy chọn)
5. Click **"Create project"**

### Bước 2: Thêm iOS App

1. Trong Firebase Console, click vào biểu tượng iOS
2. **Bundle ID**: `org.reactjs.native.example.MiniRestaurantPro`
   - Kiểm tra trong `ios/MiniRestaurantPro/Info.plist`
3. **App nickname**: MiniRestaurantPro (tùy chọn)
4. Click **"Register app"**
5. **Download** file `GoogleService-Info.plist`
6. **Di chuyển file** vào thư mục:
   ```
   ios/MiniRestaurantPro/GoogleService-Info.plist
   ```
7. **Quan trọng**: File đã được tạo sẵn template, thay thế nó bằng file từ Firebase Console

### Bước 3: Thêm Android App

1. Trong Firebase Console, click vào biểu tượng Android
2. **Package name**: `com.minirestaurantpro`
   - Kiểm tra trong `android/app/build.gradle`
3. **App nickname**: MiniRestaurantPro (tùy chọn)
4. **SHA-1 certificate** (tùy chọn cho debug):
   ```bash
   cd android
   ./gradlew signingReport
   ```
5. Click **"Register app"**
6. **Download** file `google-services.json`
7. **Di chuyển file** vào thư mục:
   ```
   android/app/google-services.json
   ```
8. **Quan trọng**: File đã được tạo sẵn template, thay thế nó bằng file từ Firebase Console

### Bước 4: Enable Authentication

1. Trong Firebase Console, vào **Authentication** → **Sign-in method**
2. Click **"Email/Password"**
3. Bật **"Email/Password"** provider
4. Click **"Save"**

### Bước 5: Thiết Lập Firestore Database

1. Trong Firebase Console, vào **Firestore Database**
2. Click **"Create database"**
3. Chọn mode:
   - **Production mode**: Cho app thật (yêu cầu security rules)
   - **Test mode**: Cho development (30 ngày trial)
4. Chọn **Location** (ví dụ: asia-southeast1)
5. Click **"Enable"**

### Bước 6: Cấu Hình Security Rules (Khuyến nghị)

Trong **Firestore Database** → **Rules**, thêm rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // User có thể đọc và ghi document của chính mình
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Admin có thể đọc tất cả users
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'ADMIN';
    }
    
    // Restaurants, menus, orders - chỉ authenticated users
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### Bước 7: Install Dependencies & Build

```bash
# Install pods cho iOS
cd ios
pod install
cd ..

# Build Android (optional - kiểm tra config)
cd android
./gradlew clean
cd ..

# Run app
yarn ios
# hoặc
yarn android
```

---

## 📱 Sử Dụng Firebase Auth

### Login

```typescript
import { AuthService } from '@/services/api/authFirebase';

// Login
try {
  const response = await AuthService.login({
    email: 'user@example.com',
    password: 'password123'
  });
  console.log('Logged in:', response.user);
} catch (error) {
  console.error('Login error:', error.message);
}
```

### Register

```typescript
// Register
try {
  const response = await AuthService.register({
    email: 'newuser@example.com',
    password: 'password123',
    name: 'Nguyễn Văn A',
    phone: '+84123456789'
  });
  console.log('Registered:', response.user);
  
  // Email verification tự động được gửi
} catch (error) {
  console.error('Register error:', error.message);
}
```

### Check Authentication

```typescript
// Kiểm tra user đã login chưa
const isAuth = await AuthService.isAuthenticated();

if (isAuth) {
  const user = await AuthService.getCurrentUser();
  console.log('Current user:', user);
}
```

### Password Reset

```typescript
// Gửi email reset password
await AuthService.requestPasswordReset('user@example.com');
// User sẽ nhận email với link reset password từ Firebase
```

### Update Profile

```typescript
// Cập nhật profile
const updatedUser = await AuthService.updateProfile({
  name: 'Nguyễn Văn B',
  phone: '+84987654321'
});
```

---

## 🗄️ Sử Dụng Firestore

### Lấy/Lưu User Data

```typescript
import { FirebaseFirestoreService } from '@/services/firebase';

// Lấy user document
const user = await FirebaseFirestoreService.getUserDocument(userId);

// Cập nhật user document
await FirebaseFirestoreService.updateUserDocument(userId, {
  name: 'New Name',
  phone: '+84123456789'
});
```

### Query Collections

```typescript
// Lấy tất cả restaurants
const restaurantsSnapshot = await FirebaseFirestoreService
  .collection('restaurants')
  .where('active', '==', true)
  .orderBy('createdAt', 'desc')
  .get();

const restaurants = restaurantsSnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

### Realtime Listeners

```typescript
// Lắng nghe thay đổi realtime
const unsubscribe = FirebaseFirestoreService
  .collection('orders')
  .where('status', '==', 'pending')
  .onSnapshot((snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Orders updated:', orders);
  });

// Cleanup khi unmount
return () => unsubscribe();
```

---

## 🔄 Migration từ API cũ sang Firebase

### Option 1: Thay thế hoàn toàn

1. Backup file cũ:
   ```bash
   mv src/services/api/auth.ts src/services/api/auth.backup.ts
   ```

2. Sử dụng Firebase auth:
   ```bash
   mv src/services/api/authFirebase.ts src/services/api/auth.ts
   ```

3. Tất cả imports sẽ tự động dùng Firebase

### Option 2: Sử dụng song song

```typescript
// Import Firebase auth với alias khác
import { AuthService as FirebaseAuth } from '@/services/api/authFirebase';
import { AuthService as ApiAuth } from '@/services/api/auth';

// Sử dụng Firebase
await FirebaseAuth.login(credentials);

// Hoặc sử dụng API cũ
await ApiAuth.login(credentials);
```

---

## 🔍 Troubleshooting

### iOS Build Errors

```bash
# Clear pods và reinstall
cd ios
rm -rf Pods Podfile.lock
pod install --repo-update
cd ..
```

### Android Build Errors

```bash
# Clean build
cd android
./gradlew clean
./gradlew assembleDebug
cd ..
```

### Firebase Not Initialized

- Kiểm tra file `google-services.json` và `GoogleService-Info.plist` đã được thay thế bằng file thật từ Firebase Console
- Kiểm tra Bundle ID (iOS) và Package name (Android) phải khớp với Firebase Console

### Authentication Errors

| Error Code | Ý Nghĩa | Giải Pháp |
|------------|---------|-----------|
| `auth/email-already-in-use` | Email đã được sử dụng | Sử dụng email khác |
| `auth/invalid-email` | Email không hợp lệ | Kiểm tra format email |
| `auth/weak-password` | Mật khẩu quá yếu | Sử dụng mật khẩu ≥6 ký tự |
| `auth/user-not-found` | Không tìm thấy user | Kiểm tra email |
| `auth/wrong-password` | Sai mật khẩu | Kiểm tra lại password |
| `auth/too-many-requests` | Quá nhiều request | Đợi một lúc rồi thử lại |

---

## 📚 Tài Liệu Tham Khảo

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Firebase](https://rnfirebase.io/)
- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

---

## 📂 Cấu Trúc Files

```
src/
├── config/
│   └── firebase.config.ts          # Firebase configuration
├── services/
│   ├── firebase/
│   │   └── index.ts                # Firebase Auth & Firestore services
│   └── api/
│       ├── auth.ts                 # API auth service (cũ)
│       └── authFirebase.ts         # Firebase auth wrapper (mới)
android/
├── app/
│   ├── build.gradle               # Google services plugin
│   └── google-services.json       # Android Firebase config
├── build.gradle                   # Google services classpath
ios/
├── Podfile                        # Firebase static framework
└── MiniRestaurantPro/
    └── GoogleService-Info.plist   # iOS Firebase config
```

---

## ✅ Checklist Setup

- [ ] Tạo Firebase project
- [ ] Thêm iOS app và download `GoogleService-Info.plist`
- [ ] Thêm Android app và download `google-services.json`
- [ ] Copy files config vào đúng thư mục
- [ ] Enable Email/Password authentication
- [ ] Tạo Firestore database
- [ ] Cấu hình Security Rules
- [ ] Run `pod install` (iOS)
- [ ] Test build app
- [ ] Test login/register functionality

---

**🎉 Chúc mừng! Firebase đã sẵn sàng sử dụng!**
