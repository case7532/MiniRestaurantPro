# 🏗️ MiniRestaurantPro - Architecture Documentation

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Design Patterns](#design-patterns)
- [State Management](#state-management)
- [Navigation](#navigation)
- [Data Flow](#data-flow)
- [Best Practices](#best-practices)

---

## 🎯 Tổng quan

**MiniRestaurantPro** là ứng dụng quản lý nhà hàng mini được xây dựng trên React Native với TypeScript, tuân theo kiến trúc Clean Architecture và các best practices của React Native.

### Tech Stack

- **Framework**: React Native 0.82.1
- **Language**: TypeScript 5.8.3
- **Internationalization**: i18next + react-i18next + react-native-localize ✅
- **Navigation**: React Navigation v6 (Native Stack + Bottom Tabs) ✅
- **State Management**: Context API / Redux Toolkit (đề xuất)
- **UI Library**: Custom components with theme system ✅
- **API Client**: Axios / React Query (đề xuất)
- **Testing**: Jest + React Native Testing Library
- **Gesture Handler**: react-native-gesture-handler ✅
- **Safe Area**: react-native-safe-area-context ✅

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
    ├─ GestureHandlerRootView
    │   └─ SafeAreaProvider
    │       └─ NavigationContainer (RootNavigator)
    │           │
    │           ├─ Auth Stack (when user not logged in)
    │           │   ├─ Login Screen
    │           │   ├─ Register Screen
    │           │   └─ Forgot Password Screen
    │           │
    │           └─ Main Tabs (when user logged in)
    │               ├─ Home Tab
    │               ├─ Menu Tab
    │               ├─ Orders Tab
    │               └─ Settings Tab
    │
    └─ i18n Initialization
```

### Navigation Flow

```
RootNavigator
├── If user === null
│   └── Auth Stack (Native Stack)
│       ├── LoginScreen
│       ├── RegisterScreen
│       └── ForgotPasswordScreen
│
└── If user !== null
    └── Main Tabs (Bottom Tabs)
        ├── HomeScreen
        ├── MenuScreen (placeholder)
        ├── OrdersScreen (placeholder)
        └── SettingsScreen (placeholder)
```

---

## 📁 Cấu trúc thư mục

```
MiniRestaurantPro/
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/          # Shared components ✅
│   │   │   ├── Button.tsx   # Reusable button with variants
│   │   │   └── Input.tsx    # Reusable text input
│   │   ├── layout/          # Layout components (Header, Footer, Container)
│   │   └── features/        # Feature-specific components
│   │
│   ├── screens/             # Screen components (modular structure)
│   │   ├── Auth/
│   │   │   ├── LoginScreen/
│   │   │   │   ├── index.tsx           # Container (logic)
│   │   │   │   ├── styles.ts           # Screen styles
│   │   │   │   └── components/
│   │   │   │       ├── index.ts        # Barrel export
│   │   │   │       ├── LoginHeader.tsx
│   │   │   │       ├── LoginForm.tsx
│   │   │   │       └── LoginFooter.tsx
│   │   │   ├── RegisterScreen/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── styles.ts
│   │   │   │   └── components/
│   │   │   └── ForgotPasswordScreen/
│   │   │       ├── index.tsx
│   │   │       ├── styles.ts
│   │   │       └── components/
│   │   │
│   │   └── Home/
│   │       └── HomeScreen/
│   │           ├── index.tsx
│   │           ├── styles.ts
│   │           └── components/
│   │               ├── HomeHeader.tsx
│   │               ├── StatsCards.tsx
│   │               ├── QuickActions.tsx
│   │               └── RecentActivity.tsx
│   │
│   ├── navigation/          # Navigation configuration ✅
│   │   ├── types.ts         # Navigation type definitions
│   │   ├── AuthStack.tsx    # Auth stack navigator
│   │   ├── MainTabs.tsx     # Bottom tabs navigator
│   │   ├── RootNavigator.tsx # Root navigator with auth switch
│   │   └── index.ts         # Barrel export
│   │
│   ├── services/            # External services
│   │   ├── api/             # API service layer
│   │   │   ├── client.ts    # API client configuration
│   │   │   ├── auth.ts      # Auth endpoints
│   │   │   ├── menu.ts      # Menu endpoints
│   │   │   └── orders.ts    # Orders endpoints
│   │   │
│   │   ├── storage/         # Local storage
│   │   │   └── asyncStorage.ts
│   │   │
│   │   └── notifications/   # Push notifications
│   │       └── notificationService.ts
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts       # Authentication hook
│   │   ├── useMenu.ts       # Menu data hook
│   │   ├── useOrders.ts     # Orders hook
│   │   └── useTheme.ts      # Theme hook
│   │
│   ├── context/             # React Context providers
│   │   ├── AuthContext.tsx  # Authentication context
│   │   └── ThemeContext.tsx # Theme context
│   │
│   ├── store/               # State management (Redux/Zustand)
│   │   ├── slices/          # Redux slices or Zustand stores
│   │   │   ├── authSlice.ts
│   │   │   ├── menuSlice.ts
│   │   │   └── orderSlice.ts
│   │   └── store.ts         # Store configuration
│   │
│   ├── types/               # TypeScript type definitions
│   │   ├── index.ts         # Global types
│   │   ├── models.ts        # Data models
│   │   ├── api.ts           # API types
│   │   └── navigation.ts    # Navigation types
│   │
│   ├── utils/               # Utility functions ✅
│   │   ├── validation.ts    # Validation helpers (email, password, phone)
│   │   └── helpers.ts       # General helpers (formatCurrency, debounce, etc.)
│   │
│   ├── constants/           # Application constants ✅
│   │   └── config.ts        # App configuration (API URLs, storage keys, endpoints)
│   │
│   ├── i18n/                # Internationalization ✅
│   │   ├── index.ts         # i18n configuration with device language detection
│   │   └── locales/         # Translation files
│   │       ├── en.json      # English translations
│   │       └── vi.json      # Vietnamese translations
│   │
│   ├── assets/              # Static assets
│   │   ├── images/          # Image files
│   │   ├── fonts/           # Custom fonts
│   │   └── icons/           # Icon files
│   │
│   ├── styles/              # Global styles ✅
│   │   └── theme.ts         # Theme configuration (Colors, Spacing, FontSizes, etc.)
│   │
│   └── __tests__/           # Test files (mirrors src structure)
│       ├── components/
│       ├── screens/
│       └── utils/
│
├── android/                 # Android native code
├── ios/                     # iOS native code
├── __tests__/               # Root level tests
├── .vscode/                 # VSCode configuration
├── App.tsx                  # Root component
├── index.js                 # Entry point
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config ✅ (with path aliases)
├── babel.config.js          # Babel config ✅ (with module-resolver)
├── metro.config.js          # Metro bundler config
├── jest.config.js           # Jest config
├── ARCHITECTURE.md          # Architecture documentation (this file)
├── NAVIGATION.md            # Navigation setup guide
├── SCREEN_STRUCTURE.md      # Screen structure guide
├── DEPENDENCIES.md          # Dependencies installation guide
├── QUICKSTART.md            # Quick start guide
└── I18N.md                  # i18n implementation guide
```

### Path Aliases Configuration ✅

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@navigation": ["src/navigation"],
      "@navigation/*": ["src/navigation/*"],
      "@utils/*": ["src/utils/*"],
      "@services/*": ["src/services/*"],
      "@types": ["src/types"],
      "@types/*": ["src/types/*"],
      "@hooks/*": ["src/hooks/*"],
      "@constants/*": ["src/constants/*"],
      "@assets/*": ["src/assets/*"],
      "@styles/*": ["src/styles/*"]
    }
  }
}
```

```javascript
// babel.config.js
module.exports = {
  plugins: [
    ['module-resolver', {
      alias: {
        '@': './src',
        '@components': './src/components',
        '@screens': './src/screens',
        '@navigation': './src/navigation',
        '@utils': './src/utils',
        '@services': './src/services',
        '@types': './src/types',
        '@hooks': './src/hooks',
        '@constants': './src/constants',
        '@assets': './src/assets',
        '@styles': './src/styles',
      }
    }]
  ]
}
```

---

## 🎨 Design Patterns

### 1. **Modular Screen Structure Pattern** ✅

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
      <LoginForm
        email={email}
        password={password}
        loading={loading}
        onLogin={handleLogin}
      />
      <LoginFooter />
    </SafeAreaView>
  );
};

// components/LoginForm.tsx (Presentational)
export const LoginForm: React.FC<LoginFormProps> = React.memo(({
  email,
  password,
  loading,
  onLogin,
}) => {
  return (
    <View style={styles.form}>
      <Input value={email} />
      <Input value={password} secureTextEntry />
      <Button title="Login" onPress={onLogin} loading={loading} />
    </View>
  );
});
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
  primary: (props) => <Button {...props} variant="primary" />,
  secondary: (props) => <Button {...props} variant="secondary" />,
  danger: (props) => <Button {...props} variant="danger" />,
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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    // Login logic
    set({ user, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

---

## 🧭 Navigation ✅

### React Navigation v6 Implementation

**Dependencies Installed:**
- @react-navigation/native
- @react-navigation/native-stack (for Auth Stack)
- @react-navigation/bottom-tabs (for Main Tabs)
- react-native-screens
- react-native-safe-area-context
- react-native-gesture-handler

**Navigation Structure:**
```typescript
// navigation/types.ts
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Menu: undefined;
  Orders: undefined;
  Settings: undefined;
};

// navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@hooks/useAuth';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// navigation/AuthStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@screens/Auth/LoginScreen';
import { RegisterScreen } from '@screens/Auth/RegisterScreen';
import { ForgotPasswordScreen } from '@screens/Auth/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

// navigation/MainTabs.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@screens/Home/HomeScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.secondary,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
```

**Navigation Usage in Screens:**
```typescript
import { useNavigation } from '@react-navigation/native';
import type { LoginScreenNavigationProp } from '@navigation/types';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };
  
  return <View>...</View>;
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

export const Button: React.FC<ButtonProps> = React.memo(({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, styles[variant]]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
});
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
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      store.dispatch(logout());
    }
    
    const message = error.response?.data?.message || 'Something went wrong';
    throw new Error(message);
  }
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
    const { getByText } = render(
      <Button title="Click Me" onPress={() => {}} />
    );
    expect(getByText('Click Me')).toBeTruthy();
  });
  
  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={onPressMock} />
    );
    
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
export const useAuth = () => { /* ... */ };
export const useMenu = () => { /* ... */ };
```

---

## 🚀 Recommended Libraries

### Essential
- **React Navigation** - Navigation
- **Redux Toolkit** hoặc **Zustand** - State Management
- **React Query** - Server State Management
- **Axios** - HTTP Client
- **React Hook Form** - Form Handling
- **Yup** / **Zod** - Validation
- **i18next** + **react-i18next** + **react-native-localize** - Internationalization ✅ Installed

### UI Components
- **React Native Elements** - UI Library
- **React Native Paper** - Material Design
- **Styled Components** / **Emotion** - Styling

### Utilities
- **date-fns** - Date manipulation
- **lodash** - Utility functions
- **react-native-vector-icons** - Icons
- **react-native-gesture-handler** - Gestures
- **react-native-reanimated** - Animations

### Development
- **Reactotron** - Debugging
- **Flipper** - Native debugging
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

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

## 🌍 Internationalization (i18n)

### Setup

Dự án sử dụng **i18next** với **react-native-localize** để hỗ trợ đa ngôn ngữ.

#### Supported Languages
- 🇬🇧 English (en)
- 🇻🇳 Tiếng Việt (vi)

### Configuration

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Auto-detect device language
const deviceLanguage = RNLocalize.getLocales()[0].languageCode;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('./locales/en.json') },
      vi: { translation: require('./locales/vi.json') },
    },
    lng: deviceLanguage,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
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
      <Button 
        title={t('common.submit')} 
        onPress={() => {}} 
      />
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

### Custom Hook

```typescript
// src/hooks/useTranslation.ts
export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();
  
  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    // Optionally persist to AsyncStorage
  };
  
  const getCurrentLanguage = () => i18n.language;
  
  return { t, changeLanguage, getCurrentLanguage };
};
```

### Language Settings Screen

Example implementation available at `src/screens/Settings/LanguageSettingsScreen.tsx`

---

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Query](https://tanstack.com/query/latest)
- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Guide](https://react.i18next.com/)

---

**Last Updated**: November 23, 2025
**Version**: 0.0.1
