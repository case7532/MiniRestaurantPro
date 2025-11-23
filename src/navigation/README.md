# 🧭 Navigation System

## 📁 Cấu trúc (Modular - Tổ chức theo Stack)

```
src/navigation/
├── utils.ts          # NavigationService + ROUTES + Hooks + Types
├── RootNavigator.tsx # Root navigator
├── index.ts          # Exports
├── README.md         # This file
└── stacks/           # Stack navigators (organized by feature)
    ├── Auth/         # Auth stack
    │   ├── AuthStack.tsx  # Navigator component
    │   ├── types.ts       # Stack types
    │   ├── config.ts      # Screen options
    │   └── index.ts       # Exports
    └── Main/         # Main tabs
        ├── MainTabs.tsx   # Navigator component
        ├── types.ts       # Tab types
        ├── config.ts      # Tab options
        └── index.ts       # Exports
```

---

## 🚀 Sử dụng

### 1. Navigation Service (Dễ nhất!)

```typescript
import { NavigationService, ROUTES } from '@navigation';

// Navigate từ bất kỳ đâu
NavigationService.navigate('Main');
NavigationService.goBack();
NavigationService.resetRoot('Auth');

// Dùng constants
NavigationService.navigate(ROUTES.AUTH.LOGIN);
```

### 2. Hooks (Trong components)

```typescript
import { useAuthNavigation, useRouteParams } from '@navigation';

const LoginScreen = () => {
  const navigation = useAuthNavigation();
  navigation.navigate('Register'); // Type-safe!

  const params = useRouteParams<{ email: string }>();
};
```

### 3. Stack Configuration

```typescript
// Mỗi stack có config riêng trong folder của nó
import { authScreenOptions } from '@navigation/stacks/Auth';
import { tabBarOptions } from '@navigation/stacks/Main';

<Stack.Navigator screenOptions={authScreenOptions}>
<Tab.Navigator screenOptions={tabBarOptions}>
```

---

## ➕ Thêm Screen Mới (3 bước)

```typescript
// 1. stacks/Auth/types.ts - Add type
export type AuthStackParamList = {
  Login: undefined;
  NewScreen: { userId: string }; // ← Add
};

// 2. stacks/Auth/AuthStack.tsx - Add screen
<Stack.Screen name="NewScreen" component={NewScreen} />;

// 3. utils.ts - Add constant (optional)
export const ROUTES = {
  AUTH: {
    NEW_SCREEN: 'NewScreen' as const, // ← Add
  },
};

// Done!
NavigationService.navigate('NewScreen', { userId: '123' });
```

---

## 📦 Files Chi Tiết

### Core Files (Root)

- **`utils.ts`** - All-in-one: NavigationService, ROUTES, Hooks, Types
- **`RootNavigator.tsx`** - Root navigator với auth switch
- **`index.ts`** - Barrel exports

### Stack Folders (Modular)

Mỗi stack có cấu trúc riêng biệt:

- **`AuthStack.tsx/MainTabs.tsx`** - Stack navigator component
- **`types.ts`** - Stack-specific types
- **`config.ts`** - Stack-specific screen options
- **`index.ts`** - Barrel exports

---

## ⚡ Quick Examples

```typescript
// Navigate sau login
NavigationService.resetRoot('Main');

// Navigate với params
NavigationService.navigate('VerifyEmail', { email: 'user@email.com' });

// Conditional navigation
if (needsVerification) {
  NavigationService.navigate(ROUTES.AUTH.VERIFY_EMAIL);
} else {
  NavigationService.resetRoot(ROUTES.ROOT.MAIN);
}

// Trong component
const navigation = useAuthNavigation();
navigation.navigate('Register');

// Get params
const params = useRouteParams<{ userId: string }>();
```

---

**Version**: 3.0 (Modular - Organized by Stack)  
**Structure**: Modular folders with dedicated configs  
**Last Updated**: November 23, 2025
