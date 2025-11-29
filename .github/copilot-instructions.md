# MiniRestaurantPro - AI Coding Agent Instructions

## Project Overview

React Native 0.82.1 restaurant management app with TypeScript 5.8.3, Firebase backend, and bilingual support (English/Vietnamese). Currently in Phase 1 (MVP complete) with auth, navigation, theme system, and i18n fully implemented.

## Critical Path Aliases

**Always use path aliases - they're configured in both `tsconfig.json` and `babel.config.js`:**

```typescript
import { useTheme } from '@hooks/useTheme';           // ✅ Correct
import { useTranslation } from '@hooks/useTranslation';
import { HomeScreen } from '@screens/home';
import { Theme } from '@styles/theme';
import { RootNavigator } from '@screens/RootNavigation';

// ❌ NEVER use relative paths for imports:
import { useTheme } from '../../../hooks/useTheme';
```

Available aliases: `@/*`, `@components/*`, `@screens/*`, `@hooks/*`, `@services/*`, `@types/*`, `@utils/*`, `@constants/*`, `@assets/*`, `@styles/*`, `@navigation/*`, `@config/*`, `@i18n/*`

## Architecture Patterns

### Screen Structure (Established Pattern)

Every screen follows this modular structure with theme and i18n integration:

```typescript
// screens/home/index.tsx (Container component)
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { homeStyles } from './styles';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = homeStyles(theme);  // Dynamic styles from theme
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('home.title')}</Text>
    </View>
  );
};

// screens/home/styles.ts (Separate styles file)
import { StyleSheet } from 'react-native';
import { Theme } from '@styles/theme';

export const homeStyles = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
});

// screens/home/types.ts (Type definitions)
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigation';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
```

### Theme System (Mandatory)

**Never hardcode colors, spacing, or typography.** Use theme tokens:

```typescript
// ✅ Use theme tokens
const styles = (theme: Theme) => StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,        // Not '#FF5555'
    padding: theme.spacing.md,                    // Not 16
    borderRadius: theme.borderRadius.md,          // Not 8
    ...theme.shadows.md,                          // Platform-specific shadows
  },
  text: {
    ...theme.typography.button,                   // Not fontSize: 16
    color: theme.colors.onPrimary,
  },
});
```

Color palette: Coral (#FF5555 primary), Peach (#FF937E secondary), Sage (#A3D78A accent), Mint (#C1E59F accent light). Full theme structure in `src/styles/theme.ts` with light/dark modes.

### Internationalization (Required)

All user-facing text must use i18n keys from `src/i18n/locales/`:

```typescript
const { t } = useTranslation();

// ✅ Use translation keys
<Text>{t('auth.login')}</Text>
<Text>{t('common.welcome')}</Text>
<Text>{t('orders.order_number', { number: '123' })}</Text>  // With params

// ❌ Never hardcode English text:
<Text>Login</Text>
```

Device language is auto-detected on startup. Add new keys to both `en.json` and `vi.json`.

### Type-Safe Navigation

Navigation uses React Navigation v7 with TypeScript:

```typescript
// Define param lists in navigation files
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { userId?: string };
};

// Use typed props in screens
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  // navigation.navigate() is fully typed
  navigation.navigate('Login');
};
```

Navigation state lives in `src/screens/RootNavigation.tsx`. New screens must update param list and add to navigator.

## Firebase Integration

Uses `@react-native-firebase` v23.5.0 (NOT web SDK). Modular imports:

```typescript
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Collections follow naming convention: users, menu_items, orders, etc.
const menuRef = firestore().collection('menu_items');
```

Firebase config files: `android/app/google-services.json` and `ios/MiniRestaurantPro/GoogleService-Info.plist`. Web config at `src/config/firebase.config.ts` is reference only.

## Development Workflows

### Running the App

```bash
# iOS - requires: cd ios && bundle exec pod install
npm run ios

# Android - requires Android Studio emulator running
npm run android

# Start Metro bundler
npm start
```

### Code Quality Commands

```bash
npm run type-check    # TypeScript validation (strict mode enabled)
npm run lint         # ESLint with auto-fix
npm run format       # Prettier formatting
npm run validate     # Runs type-check + lint + format:check
```

TypeScript strict mode is enforced - all types must be explicit. No `any` types allowed.

### Testing

Jest configured for React Native Testing Library. Test files: `__tests__/**/*.test.tsx`

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## State Management

Currently using Context API (ThemeContext). See `src/context/ThemeContext.tsx` for persistence pattern with AsyncStorage. When adding new services:

1. Create service in `src/services/api/`
2. Create custom hook in `src/hooks/`
3. Use hook in components (not direct service calls)

Example: Future `useAuth()` should wrap Firebase auth, expose `login()`, `logout()`, `user` state.

## File Organization

```
src/
├── screens/           # One folder per screen with index.tsx, styles.ts, types.ts
├── components/        # Empty - add common/, layout/, features/ as needed
├── hooks/             # Custom hooks (useTheme, useTranslation exist)
├── services/          # Empty - add api/ and storage/ for business logic
├── context/           # React Context providers (ThemeContext exists)
├── navigation/        # Empty - navigation in screens/RootNavigation.tsx
├── i18n/              # i18next config + locales/en.json, locales/vi.json
├── styles/            # theme.ts with comprehensive design tokens
├── config/            # firebase.config.ts (web reference)
├── constants/         # index.ts with APP_NAME
├── types/             # Empty - add shared TypeScript types here
└── utils/             # Empty - add helpers here
```

## Key Dependencies

- React 19.1.1 with new-architecture disabled
- React Navigation v7 (native-stack + bottom-tabs ready)
- Firebase: app, auth, firestore
- i18next + react-i18next + react-native-localize
- AsyncStorage for local persistence
- Gesture handler + Safe area context

## Platform Differences

iOS shadows use `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`. Android uses `elevation`. Theme system handles this via `theme.shadows.sm/md/lg`.

CocoaPods required for iOS: `cd ios && bundle install && bundle exec pod install`

## What's Not Yet Implemented

- UI components library (Button, Input, Card) - create in `src/components/common/`
- Services layer (auth, firestore CRUD) - create in `src/services/api/`
- Most screens (POS, Orders, Inventory) - roadmap in `documents/DEVELOPMENT_ROADMAP.md`
- State management beyond Context API (Redux Toolkit or Zustand planned)

## Documentation

Critical files to read before major changes:
- `ARCHITECTURE.md` - Full system architecture, current state, patterns
- `THEME_GUIDE.md` - Complete theme system guide with examples
- `documents/PROJECT_OVERVIEW.md` - Business requirements, feature roadmap
- `documents/DEVELOPMENT_ROADMAP.md` - Phase-by-phase implementation plan

## Error Handling Patterns

### Firebase Error Handling

Always handle Firebase errors with proper user feedback:

```typescript
import auth from '@react-native-firebase/auth';
import { useTranslation } from '@hooks/useTranslation';

const handleLogin = async (email: string, password: string) => {
  const { t } = useTranslation();
  
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error: any) {
    // Map Firebase error codes to translation keys
    const errorMap: Record<string, string> = {
      'auth/user-not-found': 'auth.errors.user_not_found',
      'auth/wrong-password': 'auth.errors.wrong_password',
      'auth/invalid-email': 'auth.errors.invalid_email',
      'auth/too-many-requests': 'auth.errors.too_many_requests',
    };
    
    const errorKey = errorMap[error.code] || 'common.errors.unknown';
    showToast(t(errorKey));
    
    // Log error for debugging (remove in production or use analytics)
    console.error('Login error:', error.code, error.message);
  }
};
```

### Form Validation Pattern

Use consistent validation with error messages:

```typescript
import { useState } from 'react';

interface FormErrors {
  email?: string;
  password?: string;
}

const [errors, setErrors] = useState<FormErrors>({});

const validateForm = (): boolean => {
  const newErrors: FormErrors = {};
  
  if (!email) {
    newErrors.email = t('auth.errors.email_required');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = t('auth.errors.email_invalid');
  }
  
  if (!password) {
    newErrors.password = t('auth.errors.password_required');
  } else if (password.length < 6) {
    newErrors.password = t('auth.errors.password_too_short');
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### Network Error Handling

Handle network failures gracefully:

```typescript
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

const fetchData = async () => {
  try {
    // Check network status first
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      showToast(t('common.errors.no_internet'));
      return;
    }
    
    const snapshot = await firestore()
      .collection('menu_items')
      .get();
      
    // Process data...
  } catch (error) {
    if (error.code === 'unavailable') {
      showToast(t('common.errors.service_unavailable'));
    } else {
      showToast(t('common.errors.unknown'));
    }
    console.error('Fetch error:', error);
  }
};
```

## Testing Patterns

### Component Testing

Test components with theme and i18n context:

```typescript
// __tests__/screens/home/HomeScreen.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeScreen } from '@screens/home';
import { ThemeProvider } from '@context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <NavigationContainer>
        {component}
      </NavigationContainer>
    </ThemeProvider>
  );
};

describe('HomeScreen', () => {
  it('renders correctly with theme', () => {
    const { getByText } = renderWithProviders(
      <HomeScreen navigation={mockNavigation} route={{}} />
    );
    
    expect(getByText(/home/i)).toBeTruthy();
  });
  
  it('applies theme colors correctly', () => {
    const { getByTestId } = renderWithProviders(
      <HomeScreen navigation={mockNavigation} route={{}} />
    );
    
    const container = getByTestId('home-container');
    expect(container.props.style).toHaveProperty('backgroundColor');
  });
});
```

### Hook Testing

Test custom hooks in isolation:

```typescript
// __tests__/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '@hooks/useAuth';
import auth from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/auth');

describe('useAuth', () => {
  it('handles login successfully', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ user: { uid: '123' } });
    (auth as jest.Mock).mockReturnValue({
      signInWithEmailAndPassword: mockSignIn,
    });
    
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password');
  });
});
```

### Snapshot Testing

Use snapshots for UI consistency:

```typescript
// __tests__/components/Button.test.tsx
import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '@components/common/Button';
import { ThemeProvider } from '@context/ThemeContext';

describe('Button Component', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <Button title="Test Button" onPress={() => {}} />
        </ThemeProvider>
      )
      .toJSON();
    
    expect(tree).toMatchSnapshot();
  });
});
```

## Common Pitfalls to Avoid

1. Don't mix web Firebase SDK with react-native-firebase
2. Don't forget to add translation keys to BOTH en.json and vi.json
3. Don't use relative imports - always use path aliases
4. Don't create styles without theme parameter - must be `(theme: Theme) => StyleSheet.create(...)`
5. Don't bypass navigation types - use `NativeStackScreenProps` for all screens
6. Don't commit `google-services.json` or `GoogleService-Info.plist` (gitignored)
7. Don't use `any` type - TypeScript strict mode requires explicit types
8. Don't hardcode strings - use i18n keys for all user-facing text
9. Don't skip error handling - always wrap Firebase calls in try-catch
10. Don't forget to test on both iOS and Android - platform differences exist

## Performance Best Practices

### Optimize Re-renders

Use React.memo and useCallback strategically:

```typescript
import React, { useCallback, memo } from 'react';

// Memoize expensive components
export const MenuItem = memo<MenuItemProps>(({ item, onPress }) => {
  const { theme } = useTheme();
  const styles = menuItemStyles(theme);
  
  return (
    <TouchableOpacity onPress={() => onPress(item.id)}>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
});

// Use useCallback for callbacks passed to child components
const ParentComponent = () => {
  const handleItemPress = useCallback((itemId: string) => {
    console.log('Item pressed:', itemId);
  }, []);
  
  return <MenuItem item={item} onPress={handleItemPress} />;
};
```

### FlatList Optimization

Optimize long lists with proper configuration:

```typescript
import { FlatList } from 'react-native';

<FlatList
  data={items}
  renderItem={({ item }) => <MenuItem item={item} />}
  keyExtractor={(item) => item.id}
  // Performance optimizations
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={10}
  windowSize={10}
  // Memoize item separator and footer
  ItemSeparatorComponent={ItemSeparator}
  ListFooterComponent={ListFooter}
/>
```

### Image Optimization

Use FastImage for better performance:

```typescript
import FastImage from 'react-native-fast-image';

<FastImage
  source={{
    uri: item.imageUrl,
    priority: FastImage.priority.normal,
  }}
  resizeMode={FastImage.resizeMode.cover}
  style={styles.image}
/>
```

## Security Best Practices

### Firebase Security Rules

Never trust client-side data. Use Firestore security rules:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Menu items are read-only for all authenticated users
    match /menu_items/{itemId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Sensitive Data

Never store sensitive data in AsyncStorage without encryption:

```typescript
// ❌ Don't store sensitive data plainly
AsyncStorage.setItem('password', password);

// ✅ Store only non-sensitive data
AsyncStorage.setItem('theme', 'dark');
AsyncStorage.setItem('language', 'en');

// For sensitive data, use react-native-keychain or Expo SecureStore
import * as Keychain from 'react-native-keychain';

await Keychain.setGenericPassword('username', 'password');
```

### API Keys

Keep Firebase config secure:

```typescript
// ✅ Firebase config is safe in mobile apps (bundled, not exposed)
// But never commit google-services.json or GoogleService-Info.plist to public repos

// For additional API keys, use environment variables
import Config from 'react-native-config';

const API_KEY = Config.API_KEY; // From .env file
```

## Accessibility Guidelines

Make the app accessible to all users:

```typescript
import { View, Text, TouchableOpacity } from 'react-native';

// Add accessibility props to all interactive elements
<TouchableOpacity
  accessibilityRole="button"
  accessibilityLabel={t('auth.login_button')}
  accessibilityHint={t('auth.login_hint')}
  onPress={handleLogin}
>
  <Text style={styles.buttonText}>{t('auth.login')}</Text>
</TouchableOpacity>

// Add labels to inputs
<TextInput
  accessibilityLabel={t('auth.email_label')}
  placeholder={t('auth.email_placeholder')}
  value={email}
  onChangeText={setEmail}
/>

// Use proper heading hierarchy
<Text
  accessibilityRole="header"
  accessibilityLevel={1}
  style={styles.title}
>
  {t('home.title')}
</Text>
```

## Next Features (Phase 2)

Immediate next implementations per roadmap:
1. Auth forms with validation in Login/Register screens
2. Firebase Auth service wrapper
3. Main Tabs Navigator (Home, Menu, Orders, Settings)
4. Common UI components using theme system
5. Protected routes with auth state check

When implementing these, maintain patterns: modular screen structure, theme integration, i18n support, TypeScript strict types.

## CI/CD Integration

GitHub Actions workflows are configured in `.github/workflows/ci.yml`:

- **Automatic validation on PR**: TypeScript, ESLint, Prettier, and tests
- **Build verification**: Android and iOS builds on every push
- **Code coverage**: Jest coverage reports uploaded to Codecov

Make sure all checks pass before requesting review:

```bash
npm run validate  # Run all checks locally before pushing
```
