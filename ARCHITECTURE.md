# 🏗️ MiniRestaurantPro - Architecture Documentation

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Trạng thái hiện tại](#trạng-thái-hiện-tại)
- [Design Patterns](#design-patterns)
- [State Management](#state-management)
- [Navigation](#navigation)
- [Data Flow](#data-flow)
- [Dependencies](#dependencies)
- [Theme System](#theme-system)
- [Platform-Specific Code](#platform-specific-code)
- [Security Best Practices](#security-best-practices)
- [Internationalization (i18n)](#internationalization-i18n)
- [Best Practices](#best-practices)
- [Additional Resources](#additional-resources)
- [Summary](#summary)

---

## 🎯 Tổng quan

**MiniRestaurantPro** là ứng dụng quản lý nhà hàng mini được xây dựng trên React Native với
TypeScript, tuân theo kiến trúc Clean Architecture và các best practices của React Native.

### Tech Stack

- **Framework**: React Native 0.82.1
- **Language**: TypeScript 5.8.3
- **React**: 19.1.1
- **Internationalization**: i18next + react-i18next + react-native-localize ✅
- **Firebase**: @react-native-firebase/app + auth + firestore ✅
- **Navigation**: React Navigation v7 (Native Stack + Bottom Tabs) ✅
- **Storage**: @react-native-async-storage/async-storage ✅
- **Gesture Handler**: react-native-gesture-handler ✅
- **Safe Area**: react-native-safe-area-context ✅
- **Testing**: Jest + React Native Testing Library
- **Code Quality**: ESLint + Prettier ✅

---

## 🏛️ Kiến trúc hệ thống

### Clean Architecture Layers

```
┌─────────────────────────────────────────────┐
│           Presentation Layer                │
│  (Screens, Components, ViewModels/Hooks)    │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│            Domain Layer                     │
│    (Business Logic, Use Cases, Entities)    │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│              Data Layer                     │
│  (API Services, Local Storage, Repositories)│
└─────────────────────────────────────────────┘
```

### Component Architecture

```
App.tsx (Root)
    │
    ├─ StatusBar (dark/light mode support)
    ├─ GestureHandlerRootView
    │   └─ SafeAreaProvider
    │       └─ RootNavigator (from @navigation)
    │           └─ [To be implemented: Auth/Main navigation]
    │
    └─ i18n Initialization ✅
```

### Firebase Integration

```
Firebase Services (Modular SDK v9+)
├── Authentication (@react-native-firebase/auth)
│   └─ Firebase Auth Service (to be implemented)
├── Firestore Database (@react-native-firebase/firestore)
│   └─ Data persistence and sync
└── Configuration
    ├─ firebase.config.ts (Web SDK config for reference)
    └─ Native configs (google-services.json / GoogleService-Info.plist)
```

---

## 📁 Cấu trúc thư mục

### Cấu trúc hiện tại (Foundation)

```
MiniRestaurantPro/
├── src/
│   ├── assets/              # Static assets (empty - ready for images, fonts, icons)
│   │
│   ├── components/          # Reusable components (empty - ready to implement)
│   │   ├── common/          # Shared UI components (Button, Input, Card, etc.)
│   │   ├── layout/          # Layout components (Header, Footer, Container)
│   │   └── features/        # Feature-specific components
│   │
│   ├── config/              # Configuration files ✅
│   │   └── firebase.config.ts # Firebase configuration (Web SDK for reference)
│   │
│   ├── constants/           # Application constants ✅
│   │   └── index.ts         # App constants (APP_NAME, etc.)
│   │
│   ├── hooks/               # Custom React hooks ✅
│   │   ├── useTranslation.ts # i18n translation hook with utilities
│   │   └── useTheme.ts      # Theme hook for accessing theme
│   │
│   ├── context/             # React Context providers ✅
│   │   ├── ThemeContext.tsx # Theme provider & state management
│   │   └── index.ts         # Barrel export
│   │
│   ├── i18n/                # Internationalization ✅
│   │   ├── index.ts         # i18n config with device language auto-detection
│   │   └── locales/         # Translation files
│   │       ├── en.json      # English translations
│   │       └── vi.json      # Vietnamese translations
│   │
│   ├── navigation/          # Navigation ✅
│   │   ├── types.ts         # Navigation type definitions
│   │   ├── RootNavigator.tsx # Root navigator (NavigationContainer)
│   │   ├── AuthStack.tsx    # Auth stack navigator
│   │   ├── index.ts         # Barrel export
│   │   └── README.md        # Navigation documentation
│   │
│   ├── screens/             # Screen components
│   │   ├── LoginScreen.tsx  # ✅ Login screen (basic)
│   │   ├── RegisterScreen.tsx # ✅ Register screen (basic)
│   │   ├── ThemeDemo.tsx    # ✅ Theme demo screen (for testing)
│   │   ├── Home/            # Home/Dashboard screens (to implement)
│   │   ├── Menu/            # Menu management screens (to implement)
│   │   ├── Orders/          # Order management screens (to implement)
│   │   └── Settings/        # Settings screens (to implement)
│   │
│   ├── services/            # External services (empty - ready to implement)
│   │   ├── api/             # API service layer
│   │   ├── firebase/        # Firebase services (Auth, Firestore)
│   │   └── storage/         # AsyncStorage wrapper
│   │
│   ├── styles/              # Global styles ✅
│   │   └── theme.ts         # Theme definitions (light & dark mode)
│   │
│   ├── types/               # TypeScript definitions (empty - ready to implement)
│   │   ├── index.ts         # Global types
│   │   ├── models.ts        # Data models
│   │   └── api.ts           # API types
│   │
│   └── utils/               # Utility functions (empty - ready to implement)
│       ├── validation.ts    # Validation helpers
│       └── helpers.ts       # General utilities
│
├── android/                 # Android native code + Firebase config
│   └── app/
│       └── google-services.json # Firebase config (to be added)
│
├── ios/                     # iOS native code + Firebase config
│   └── MiniRestaurantPro/
│       └── GoogleService-Info.plist # Firebase config (to be added)
│
├── __tests__/               # Test files
│
├── App.tsx                  # Root component ✅
├── index.js                 # Entry point
├── package.json             # Dependencies ✅
├── tsconfig.json            # TypeScript config ✅ (strict mode + path aliases)
├── babel.config.js          # Babel config ✅ (module-resolver)
├── metro.config.js          # Metro bundler config
├── jest.config.js           # Jest config
├── .eslintrc.js             # ESLint config ✅
├── .prettierrc.js           # Prettier config ✅
│
└── Documentation/
    ├── ARCHITECTURE.md      # Architecture guide (this file)
    ├── API_GUIDE.md         # API documentation
    ├── THEME_GUIDE.md       # Theme system guide ✅
    └── README.md            # Project overview
```

### Path Aliases Configuration ✅

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@screens/*": ["./src/screens/*"],
      "@utils/*": ["./src/utils/*"],
      "@services/*": ["./src/services/*"],
      "@types": ["./src/types"],
      "@types/*": ["./src/types/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@constants/*": ["./src/constants/*"],
      "@assets/*": ["./src/assets/*"],
      "@styles/*": ["./src/styles/*"],
      "@navigation": ["./src/navigation"],
      "@navigation/*": ["./src/navigation/*"],
      "@config/*": ["./src/config/*"],
      "@i18n/*": ["./src/i18n/*"]
    }
  }
}
```

```javascript
// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@services': './src/services',
          '@types': './src/types',
          '@hooks': './src/hooks',
          '@constants': './src/constants',
          '@assets': './src/assets',
          '@styles': './src/styles',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
```

**Usage Example:**

```typescript
// Instead of relative imports
import { useTranslation } from '../../../hooks/useTranslation';
import { APP_NAME } from '../../../constants';

// Use path aliases
import { useTranslation } from '@hooks/useTranslation';
import { APP_NAME } from '@constants';
```

---

## 📌 Trạng thái hiện tại

### ✅ Đã hoàn thành (Foundation)

1. **Project Setup**

   - ✅ React Native 0.82.1 với TypeScript 5.8.3
   - ✅ Strict TypeScript configuration
   - ✅ Path aliases configuration (tsconfig + babel)
   - ✅ ESLint + Prettier setup

2. **Internationalization (i18n)**

   - ✅ i18next + react-i18next + react-native-localize
   - ✅ Auto device language detection
   - ✅ English & Vietnamese translations
   - ✅ Custom useTranslation hook with utilities
   - ✅ Translation files: en.json, vi.json

3. **Firebase Setup**

   - ✅ Firebase packages installed (@react-native-firebase/app, auth, firestore)
   - ✅ Firebase config file (firebase.config.ts - Web SDK reference)
   - ⚠️ Native configs need to be added (google-services.json, GoogleService-Info.plist)

4. **Core Dependencies**

   - ✅ React Navigation v7 (native-stack, bottom-tabs)
   - ✅ AsyncStorage for local persistence
   - ✅ Safe Area Context
   - ✅ Gesture Handler

5. **App Structure**

   - ✅ Root App.tsx with proper setup
   - ✅ Directory structure prepared
   - ✅ Constants file (APP_NAME)

6. **Theme System**

   - ✅ Light & Dark theme definitions
   - ✅ ThemeProvider with AsyncStorage persistence
   - ✅ useTheme hook for components
   - ✅ Complete design tokens (colors, typography, spacing, shadows)
   - ✅ Theme demo screen
   - ✅ Color palette: Coral, Peach, Sage, Mint

7. **Navigation System**

   - ✅ RootNavigator implementation
   - ✅ Auth Stack (Native Stack Navigator)
   - ✅ Navigation types with TypeScript
   - ✅ Type-safe navigation hooks
   - ✅ Screen transition animations

8. **Auth Screens (Basic)**
   - ✅ Login Screen (with navigation to Register)
   - ✅ Register Screen (with navigation to Login)
   - ✅ Theme integration on all screens
   - ✅ i18n support on all screens

### 🚧 Cần implement

1. **Authentication Features**

   - [ ] Login/Register forms with validation
   - [ ] Firebase Auth service wrapper
   - [ ] Auth context/state management
   - [ ] Forgot Password screen
   - [ ] Protected routes with auth check

2. **Main Navigation**

   - [ ] Main Tabs (Bottom Tabs Navigator)
   - [ ] Home/Dashboard screen
   - [ ] Menu screen
   - [ ] Orders screen
   - [ ] Settings screen
   - [ ] Tab bar customization

3. **UI Components**

   - [ ] Common components (Button, Input, Card)
   - [ ] Layout components (Header, Footer, Container)
   - [ ] Form components (TextInput with validation)

4. **Services**

   - [ ] Firebase Auth service
   - [ ] Firestore service
   - [ ] AsyncStorage wrapper
   - [ ] API client (if using REST API)

5. **State Management**

   - [ ] Choose solution (Context API / Redux / Zustand)
   - [ ] Auth state management
   - [ ] App state management

6. **Types & Models**

   - [ ] User model
   - [ ] Menu item model
   - [ ] Order model
   - [ ] Type definitions

7. **Utilities**
   - [ ] Validation helpers
   - [ ] Date/time formatters
   - [ ] Currency formatters
   - [ ] General utilities

### 🎯 Next Steps

**Phase 1: Navigation & Auth**

1. Implement navigation system (RootNavigator, Auth Stack, Main Tabs)
2. Create Firebase Auth service
3. Build authentication screens
4. Setup auth state management

**Phase 2: Core UI**

1. Build common UI components (Button, Input, Card) using theme system
2. Create layout components (Header, Footer, Container)
3. Design and implement screen templates

**Phase 3: Features**

1. Home/Dashboard screen
2. Menu management
3. Order management
4. Settings

---

## 🎨 Design Patterns

### 1. **Modular Screen Structure Pattern** (Recommended)

**Current Implementation:** Each screen follows a modular structure with separation of concerns.

```
ScreenName/
├── index.tsx           # Container (logic, state, handlers)
├── styles.ts           # All screen styles
└── components/
    ├── index.ts        # Barrel export
    ├── Header.tsx      # Header component
    ├── Form.tsx        # Form component
    └── Footer.tsx      # Footer component
```

**Example:**

```typescript
// screens/Auth/LoginScreen/index.tsx (Container)
export const LoginScreen: React.FC = () => {
  const { login, loading } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Business logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoginHeader />
      <LoginForm email={email} password={password} loading={loading} onLogin={handleLogin} />
      <LoginFooter />
    </SafeAreaView>
  );
};

// components/LoginForm.tsx (Presentational)
export const LoginForm: React.FC<LoginFormProps> = React.memo(
  ({ email, password, loading, onLogin }) => {
    return (
      <View style={styles.form}>
        <Input value={email} />
        <Input value={password} secureTextEntry />
        <Button title="Login" onPress={onLogin} loading={loading} />
      </View>
    );
  },
);
```

**Benefits:**

- Clear separation of logic and UI
- Easy to test components in isolation
- Reusable presentational components
- All styles in one place
- Performance optimization with React.memo

### 2. **Custom Hooks Pattern**

```typescript
// hooks/useMenu.ts
export const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMenu = async () => {
    // Logic to fetch menu
  };

  return { menu, loading, fetchMenu };
};
```

### 3. **Repository Pattern**

```typescript
// services/repositories/MenuRepository.ts
export class MenuRepository {
  private api: ApiClient;

  async getMenu(): Promise<MenuItem[]> {
    const response = await this.api.get('/menu');
    return response.data;
  }

  async createItem(item: MenuItem): Promise<MenuItem> {
    const response = await this.api.post('/menu', item);
    return response.data;
  }
}
```

### 4. **Factory Pattern**

```typescript
// components/common/ButtonFactory.tsx
export const ButtonFactory = {
  primary: props => <Button {...props} variant="primary" />,
  secondary: props => <Button {...props} variant="secondary" />,
  danger: props => <Button {...props} variant="danger" />,
};
```

---

## 🔄 State Management

### Đề xuất: **Redux Toolkit** hoặc **Zustand**

#### Redux Toolkit Setup

```typescript
// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import menuReducer from './slices/menuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

#### Zustand Alternative

```typescript
// store/useAuthStore.ts
import create from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,
  login: async credentials => {
    // Login logic
    set({ user, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

---

## 🧭 Navigation ✅

### Navigation System (Implemented)

**Hệ thống navigation đã được implement với:**

- ✅ **Type-safe**: Full TypeScript support với navigation types
- ✅ **Clean Structure**: Modular organization với barrel exports
- ✅ **Animation**: Smooth transitions với slide_from_right
- ✅ **Theme Integration**: Works seamlessly với theme system
- ✅ **i18n Ready**: All screens support internationalization

### Current Navigation Structure

```
src/navigation/
├── types.ts          # ✅ Navigation type definitions
├── RootNavigator.tsx # ✅ Root navigator with NavigationContainer
├── AuthStack.tsx     # ✅ Auth stack navigator
├── index.ts          # ✅ Barrel exports
└── README.md         # ✅ Documentation

Current Screens:
├── LoginScreen.tsx   # ✅ Basic login screen
└── RegisterScreen.tsx # ✅ Basic register screen
```

### Implementation Details

#### Type Definitions (Implemented)

```typescript
// src/navigation/types.ts (Current Implementation)
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Auth Stack Parameter List
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Auth Stack Screen Props
export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

// Global type declaration for type-safe navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList {}
  }
}
```

#### Root Navigator (Current Implementation)

```typescript
// src/navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};
```

#### Auth Stack (Current Implementation)

```typescript
// src/navigation/AuthStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@/screens/LoginScreen';
import { RegisterScreen } from '@/screens/RegisterScreen';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
```

#### Screen Example (Current Implementation)

```typescript
// src/screens/LoginScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import type { LoginScreenProps } from '@navigation/types';
import type { Theme } from '@styles/theme';

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.login')}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>{t('auth.go_to_register')}</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Navigation Dependencies ✅

- @react-navigation/native v7.1.21
- @react-navigation/native-stack v7.7.0
- @react-navigation/bottom-tabs v7.8.6
- react-native-screens v4.18.0
- react-native-safe-area-context v5.6.2
- react-native-gesture-handler v2.29.1

### Usage in Components

```typescript
// Type-safe navigation
import { useNavigation } from '@react-navigation/native';

const MyComponent = () => {
  const navigation = useNavigation();

  // Navigate to Register screen
  navigation.navigate('Register');

  // Go back
  navigation.goBack();
};
```

### Next Steps for Navigation

**To implement:**

1. Main Tabs Navigator (Bottom Tabs)
   - Home tab
   - Menu tab
   - Orders tab
   - Settings tab
2. Conditional navigation based on auth state
3. Forgot Password screen
4. Add form inputs to Login/Register screens
5. Deep linking configuration

**Structure for Main Tabs:**

```typescript
export type MainTabsParamList = {
  Home: undefined;
  Menu: undefined;
  Orders: undefined;
  Settings: undefined;
};
```

---

## 📊 Data Flow

### API Call Flow

```
User Action → Component Event Handler
    ↓
Custom Hook / Redux Action
    ↓
Service Layer (API Client)
    ↓
HTTP Request → Backend API
    ↓
Response Processing
    ↓
State Update (Context/Redux)
    ↓
UI Re-render
```

### Example Implementation

```typescript
// 1. Component
const MenuScreen = () => {
  const { addMenuItem } = useMenu();

  const handleAddItem = async (item: MenuItem) => {
    await addMenuItem(item);
  };

  return <AddItemForm onSubmit={handleAddItem} />;
};

// 2. Custom Hook
export const useMenu = () => {
  const dispatch = useDispatch();

  const addMenuItem = async (item: MenuItem) => {
    try {
      dispatch(setLoading(true));
      const newItem = await MenuService.addItem(item);
      dispatch(addMenuItemSuccess(newItem));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return { addMenuItem };
};

// 3. Service Layer
export class MenuService {
  static async addItem(item: MenuItem): Promise<MenuItem> {
    const response = await apiClient.post('/menu', item);
    return response.data;
  }
}
```

---

## ✅ Best Practices

### 1. **Component Design**

- ✅ Giữ components nhỏ và tập trung vào một nhiệm vụ
- ✅ Sử dụng TypeScript interfaces cho props
- ✅ Tách logic ra khỏi UI (Container/Presentational pattern)
- ✅ Memoization với `React.memo`, `useMemo`, `useCallback`

```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = React.memo(
  ({ title, onPress, variant = 'primary', disabled = false }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, styles[variant]]}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  },
);
```

### 2. **Performance Optimization**

```typescript
// ✅ Use FlatList for long lists
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
/>

// ✅ Image optimization
<Image
  source={{ uri: imageUrl }}
  resizeMode="cover"
  style={styles.image}
  defaultSource={require('@assets/placeholder.png')}
/>

// ✅ Lazy loading
const MenuScreen = lazy(() => import('@screens/Menu/MenuScreen'));
```

### 3. **Error Handling**

```typescript
// services/api/client.ts
export const apiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      store.dispatch(logout());
    }

    const message = error.response?.data?.message || 'Something went wrong';
    throw new Error(message);
  },
);
```

### 4. **Type Safety**

```typescript
// types/models.ts
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  image?: string;
  description?: string;
}

export enum MenuCategory {
  APPETIZER = 'appetizer',
  MAIN_COURSE = 'main_course',
  DESSERT = 'dessert',
  BEVERAGE = 'beverage',
}

// Usage with strict typing
const addItem = (item: MenuItem): void => {
  // TypeScript ensures type safety
};
```

### 5. **Testing**

```typescript
// __tests__/components/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@components/common/Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button title="Click Me" onPress={() => {}} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Click Me" onPress={onPressMock} />);

    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
```

### 6. **Code Organization**

```typescript
// ✅ Export barrel pattern
// components/common/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';

// Usage
import { Button, Input, Card } from '@components/common';

// ✅ Named exports over default exports
export const useAuth = () => {
  /* ... */
};
export const useMenu = () => {
  /* ... */
};
```

---

## 📦 Dependencies

### Current Dependencies ✅

**Core:**

- react: 19.1.1
- react-native: 0.82.1
- typescript: 5.8.3

**Navigation:**

- @react-navigation/native: 7.1.21
- @react-navigation/native-stack: 7.7.0
- @react-navigation/bottom-tabs: 7.8.6
- react-native-screens: 4.18.0
- react-native-safe-area-context: 5.6.2
- react-native-gesture-handler: 2.29.1

**Internationalization:**

- i18next: 25.6.3
- react-i18next: 16.3.5
- react-native-localize: 3.6.0
- i18next-http-backend: 3.0.2

**Firebase:**

- @react-native-firebase/app: 23.5.0
- @react-native-firebase/auth: 23.5.0
- @react-native-firebase/firestore: 23.5.0

**Storage:**

- @react-native-async-storage/async-storage: 2.2.0

**Development:**

- eslint: 8.19.0
- prettier: 2.8.8
- jest: 29.6.3
- babel-plugin-module-resolver: 5.0.2

### Recommended Future Dependencies

**State Management:**

- @reduxjs/toolkit + react-redux
- zustand (alternative)

**Data Fetching:**

- @tanstack/react-query
- axios

**Forms & Validation:**

- react-hook-form
- yup or zod

**UI & Styling:**

- react-native-vector-icons
- react-native-reanimated

**Utilities:**

- date-fns
- lodash

---

## 🎨 Theme System ✅

### Overview

MiniRestaurantPro có hệ thống theme hoàn chỉnh hỗ trợ cả **Light Mode** và **Dark Mode** với
automatic theme persistence và system theme detection.

### Color Palette

Dựa trên bảng màu được thiết kế chuyên nghiệp:

- 🎨 **Coral** (#FF5555) - Primary color
- 🍑 **Peach** (#FF937E) - Secondary color
- 🌱 **Sage** (#A3D78A) - Accent color
- 🌿 **Mint** (#C1E59F) - Accent light

### Implementation

```typescript
// src/styles/theme.ts
export interface Theme {
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    // ... more colors
  };
  spacing: {
    xs: 4;
    sm: 8;
    md: 16;
    lg: 24;
    xl: 32;
    xxl: 48;
  };
  borderRadius: {
    sm: 4;
    md: 8;
    lg: 12;
    xl: 16;
    round: 9999;
  };
  typography: {
    h1;
    h2;
    h3;
    h4;
    h5;
    h6;
    body1;
    body2;
    button;
    caption;
    subtitle1;
    subtitle2;
  };
  shadows: { sm; md; lg };
}
```

### Files Structure

```
src/
├── styles/
│   └── theme.ts              ✅ Theme definitions (light & dark)
├── context/
│   ├── ThemeContext.tsx      ✅ Theme provider & state management
│   └── index.ts              ✅ Barrel export
├── hooks/
│   └── useTheme.ts           ✅ Theme hook for components
└── screens/
    └── ThemeDemo.tsx         ✅ Demo screen with all theme features
```

### Usage

#### 1. Basic Usage

```typescript
import { useTheme } from '@hooks/useTheme';
import { Theme } from '@styles/theme';

const MyComponent = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={[theme.typography.h1, { color: theme.colors.text }]}>Hello World</Text>
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          backgroundColor: theme.colors.primary,
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.md,
          ...theme.shadows.md,
        }}
      >
        <Text style={{ color: theme.colors.onPrimary }}>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};
```

#### 2. Advanced Usage with Dynamic Styles

```typescript
const MyComponent = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Themed Component</Text>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
  });
```

### Features

- ✅ **Light & Dark Mode**: Complete theme definitions
- ✅ **Auto Persistence**: Theme preference saved to AsyncStorage
- ✅ **System Detection**: Detects device theme preference
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Comprehensive Tokens**: Colors, typography, spacing, shadows
- ✅ **Platform-Specific**: iOS & Android shadow support

### Theme Tokens

**Colors:**

- Semantic colors: primary, secondary, accent
- Background colors: background, surface, card
- Text colors: text, textSecondary, textDisabled
- Status colors: success, warning, error, info
- UI colors: border, divider, ripple

**Typography:**

- Headings: h1 (32px) → h6 (16px)
- Body: body1 (16px), body2 (14px)
- Utility: button, caption, subtitle1, subtitle2

**Spacing:**

- xs (4px), sm (8px), md (16px), lg (24px), xl (32px), xxl (48px)

**Border Radius:**

- sm (4px), md (8px), lg (12px), xl (16px), round (9999px)

**Shadows:**

- sm, md, lg (platform-specific iOS/Android)

### Best Practices

1. **Always use theme colors** instead of hardcoded values
2. **Use typography tokens** for consistent text styling
3. **Use spacing tokens** for consistent layout
4. **Create dynamic styles** with `createStyles(theme)` pattern
5. **Use semantic colors** for UI states (success, error, warning)

### Documentation

📖 **Full Guide**: See [THEME_GUIDE.md](./THEME_GUIDE.md) for detailed documentation with examples.

---

## 📱 Platform-Specific Code

```typescript
// utils/platform.ts
import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Component usage
const styles = StyleSheet.create({
  container: {
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
```

---

## 🔐 Security Best Practices

1. **Secure Storage**: Sử dụng `react-native-keychain` cho sensitive data
2. **API Keys**: Không hardcode, dùng environment variables
3. **SSL Pinning**: Implement cho production
4. **JWT Handling**: Store tokens securely, implement refresh mechanism
5. **Input Validation**: Validate tất cả user inputs
6. **Code Obfuscation**: Sử dụng ProGuard (Android) và strip symbols (iOS)

---

## 🌍 Internationalization (i18n) ✅

### Setup

Dự án sử dụng **i18next** với **react-native-localize** để hỗ trợ đa ngôn ngữ với auto device
language detection.

#### Supported Languages

- 🇬🇧 English (en)
- 🇻🇳 Tiếng Việt (vi) - Default fallback

### Current Implementation

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import vi from './locales/vi.json';

// Auto-detect device language
const getDeviceLanguage = (): string => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    const languageCode = locales[0].languageCode;
    return ['vi', 'en'].includes(languageCode) ? languageCode : 'en';
  }
  return 'en';
};

export const LANGUAGES = {
  en: { name: 'English', flag: '🇬🇧' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: getDeviceLanguage(),
  fallbackLng: 'vi',
  compatibilityJSON: 'v4',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});
```

### Usage

#### In Components

```typescript
import { useTranslation } from '@hooks/useTranslation';

const MyComponent = () => {
  const { t, changeLanguage, getCurrentLanguage } = useTranslation();

  return (
    <View>
      <Text>{t('common.welcome')}</Text>
      <Text>{t('auth.login')}</Text>
      <Button title={t('common.submit')} onPress={() => {}} />
    </View>
  );
};
```

#### With Parameters

```typescript
// Translation: "order_number": "Order #{{number}}"
<Text>{t('orders.order_number', { number: '123' })}</Text>

// Translation: "validation.required": "{{field}} is required"
<Text>{t('validation.required', { field: 'Email' })}</Text>
```

#### Change Language

```typescript
const { changeLanguage } = useTranslation();

// Switch to Vietnamese
await changeLanguage('vi');

// Switch to English
await changeLanguage('en');
```

### Translation File Structure

```json
{
  "common": {
    "app_name": "MiniRestaurantPro",
    "welcome": "Welcome",
    "loading": "Loading...",
    "error": "Error"
  },
  "auth": {
    "login": "Login",
    "email": "Email",
    "password": "Password"
  },
  "menu": {
    "title": "Menu",
    "categories": {
      "appetizer": "Appetizer",
      "main_course": "Main Course"
    }
  }
}
```

### Best Practices

1. **Organize by Feature**: Group translations by feature/screen
2. **Use Nested Keys**: Keep translations organized with nested objects
3. **Consistent Naming**: Use snake_case for translation keys
4. **Placeholder Values**: Use `{{variable}}` for dynamic content
5. **Fallback Language**: Always provide English translations as fallback
6. **Context**: Add context comments in JSON for translators

### Custom Hook ✅

```typescript
// src/hooks/useTranslation.ts
import { useTranslation as useI18nTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      // Add AsyncStorage persistence when needed
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const getCurrentLanguage = () => i18n.language;
  const getAvailableLanguages = () => Object.keys(LANGUAGES);
  const getLanguageInfo = (code: string) => LANGUAGES[code as keyof typeof LANGUAGES];

  return {
    t,
    i18n,
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
    getLanguageInfo,
  };
};
```

### Translation Files Location

- `src/i18n/locales/en.json` - English translations
- `src/i18n/locales/vi.json` - Vietnamese translations

---

## 📚 Additional Resources

### Official Documentation

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Navigation v7 Docs](https://reactnavigation.org/docs/getting-started)
- [Firebase for React Native](https://rnfirebase.io/)
- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Guide](https://react.i18next.com/)

### Project Documentation

- [README.md](./README.md) - Project overview & quick start
- [API_GUIDE.md](./API_GUIDE.md) - API documentation

### Useful Tools

- [React Native Directory](https://reactnative.directory/) - Find React Native packages
- [React Native Elements](https://reactnativeelements.com/) - UI component library
- [React Native Paper](https://callstack.github.io/react-native-paper/) - Material Design

---

## 📝 Summary

**Current State:** Foundation Setup Complete ✅

The project has been set up with a solid foundation including:

- ✅ TypeScript with strict mode configuration
- ✅ Path aliases for clean imports
- ✅ i18n with auto device language detection (English & Vietnamese)
- ✅ Theme system with Light/Dark mode support
- ✅ Complete design tokens (colors, typography, spacing, shadows)
- ✅ Firebase integration (packages installed, config needed)
- ✅ Navigation dependencies ready
- ✅ Code quality tools (ESLint + Prettier)

**Features Completed:**

1. **Internationalization** - Full i18n support with device detection (EN/VI)
2. **Theme System** - Complete theming with persistence and system detection
3. **Navigation System** - Auth Stack with type-safe navigation
4. **Auth Screens** - Basic Login & Register screens with navigation
5. **TypeScript Setup** - Strict mode with comprehensive type safety
6. **Project Structure** - Clean architecture with modular organization

**Current Capabilities:**

- ✅ Navigate between Login and Register screens
- ✅ Full theme support (light/dark mode)
- ✅ i18n on all screens
- ✅ Type-safe navigation throughout the app

**Next Steps:**

1. Add forms to Login/Register screens (inputs, validation)
2. Implement Firebase Auth service and authentication flow
3. Create Main Tabs Navigator (Home, Menu, Orders, Settings)
4. Build common UI components (Button, Input, Card)
5. Add auth state management and protected routes

**Documentation:**

- 📖 [ARCHITECTURE.md](./ARCHITECTURE.md) - This file
- 🎨 [THEME_GUIDE.md](./THEME_GUIDE.md) - Complete theme system guide
- 🧭 [src/navigation/README.md](./src/navigation/README.md) - Navigation guide
- 🌍 i18n fully implemented (EN/VI)
- 📱 [README.md](./README.md) - Project overview

---

**Last Updated**: November 25, 2025 **Version**: 0.0.1 **Status**: Foundation + Theme + Navigation
✅ - Ready for Forms & Features
