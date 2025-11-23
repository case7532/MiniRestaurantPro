# 🚀 Firebase Quick Start

## Setup Nhanh (5 phút)

### 1. Tạo Firebase Project
```
→ https://console.firebase.google.com/
→ Add project → Tên: MiniRestaurantPro
```

### 2. Thêm iOS App
```
Bundle ID: org.reactjs.native.example.MiniRestaurantPro
Download: GoogleService-Info.plist
Copy to: ios/MiniRestaurantPro/GoogleService-Info.plist
```

### 3. Thêm Android App
```
Package: com.minirestaurantpro
Download: google-services.json
Copy to: android/app/google-services.json
```

### 4. Enable Services
```
✓ Authentication → Email/Password
✓ Firestore → Create Database (Test mode)
```

### 5. Run App
```bash
yarn ios    # hoặc
yarn android
```

---

## Code Examples

### Login
```typescript
import { AuthService } from '@/services/api/authFirebase';

const { user } = await AuthService.login({
  email: 'user@example.com',
  password: 'password123'
});
```

### Register
```typescript
const { user } = await AuthService.register({
  email: 'new@example.com',
  password: 'password123',
  name: 'Nguyễn Văn A'
});
```

### Query Firestore
```typescript
import { FirebaseFirestoreService } from '@/services/firebase';

const snapshot = await FirebaseFirestoreService
  .collection('menus')
  .where('available', '==', true)
  .get();
```

---

## Troubleshooting

### iOS không build
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Android không build
```bash
cd android
./gradlew clean
cd ..
```

### Firebase not initialized
- Kiểm tra đã copy files config từ Firebase Console chưa
- Đảm bảo Bundle ID/Package name khớp với Firebase

---

**📖 Chi tiết**: Xem `FIREBASE_SETUP.md`
