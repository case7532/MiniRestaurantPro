# 🍽️ MiniRestaurantPro

[![React Native](https://img.shields.io/badge/React%20Native-0.82.1-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Ứng dụng quản lý nhà hàng mini được xây dựng với React Native và TypeScript, tuân theo Clean
Architecture và các best practices.

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Tech Stack](#-tech-stack)
- [Cài đặt](#-cài-đặt)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Development](#-development)
- [Scripts](#-scripts)
- [Architecture](#-architecture)
- [Testing](#-testing)
- [Deployment](#-deployment)

---

## ✨ Tính năng

- ✅ **TypeScript**: Type-safe development với strict mode
- ✅ **Clean Architecture**: Tách biệt rõ ràng giữa các layers
- ✅ **Path Aliases**: Import modules dễ dàng với @ prefix
- ✅ **Internationalization (i18n)**: Hỗ trợ đa ngôn ngữ (EN/VI) với i18next
- ✅ **Custom Hooks**: Tái sử dụng logic với custom hooks
- ✅ **State Management Ready**: Cấu trúc sẵn sàng cho Redux/Zustand
- ✅ **Navigation Ready**: Cấu trúc cho React Navigation
- ✅ **Testing Setup**: Jest và React Native Testing Library
- ✅ **ESLint & Prettier**: Code quality và formatting
- ✅ **Dark Mode Support**: Theme system sẵn sàng

---

## 🛠 Tech Stack

### Core

- **React Native** 0.82.1 - Mobile framework
- **TypeScript** 5.8.3 - Type-safe JavaScript
- **React** 19.1.1 - UI library
- **i18next** + **react-i18next** + **react-native-localize** - Internationalization (i18n)

### Development Tools

- **Babel** - JavaScript compiler với module resolver
- **Metro** - JavaScript bundler
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Recommended Libraries (để install)

```bash
# State Management
npm install @reduxjs/toolkit react-redux
# or
npm install zustand

# Navigation
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

# API & Data Fetching
npm install axios
npm install @tanstack/react-query

# UI Components
npm install react-native-elements
npm install react-native-vector-icons

# Form Handling
npm install react-hook-form yup
```

---

## 📦 Cài đặt

### Prerequisites

- Node.js >= 20
- npm hoặc yarn
- React Native development environment
  ([Setup Guide](https://reactnative.dev/docs/environment-setup))
- Xcode (macOS) cho iOS development
- Android Studio cho Android development

### Clone và cài đặt

```bash
# Clone repository
git clone <your-repo-url>
cd MiniRestaurantPro

# Cài đặt dependencies
npm install

# iOS: Cài đặt CocoaPods
cd ios && bundle install && bundle exec pod install && cd ..
```

---

## 📁 Cấu trúc dự án

```
MiniRestaurantPro/
├── src/                    # Source code
│   ├── components/         # Reusable components
│   │   ├── common/        # Shared UI components
│   │   ├── layout/        # Layout components
│   │   └── features/      # Feature-specific components
│   ├── screens/           # Screen components
│   ├── navigation/        # Navigation configuration
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services, storage
│   ├── store/             # State management
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utility functions
│   ├── constants/         # App constants
│   ├── assets/            # Images, fonts, icons
│   └── styles/            # Global styles
├── android/               # Android native code
├── ios/                   # iOS native code
├── __tests__/             # Test files
└── App.tsx                # Root component
```

**Chi tiết**: Xem [ARCHITECTURE.md](./ARCHITECTURE.md) để biết thêm về kiến trúc dự án.

---

## 🚀 Development

### Path Aliases

Dự án đã được cấu hình với path aliases để import dễ dàng:

```typescript
// ❌ Before
import Button from '../../../components/common/Button';
import { useAuth } from '../../../hooks/useAuth';

// ✅ After
import Button from '@components/common/Button';
import { useAuth } from '@hooks/useAuth';
```

**Available aliases:**

- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@screens/*` → `src/screens/*`
- `@hooks/*` → `src/hooks/*`
- `@services/*` → `src/services/*`
- `@types/*` → `src/types/*`
- `@utils/*` → `src/utils/*`
- `@constants/*` → `src/constants/*`
- `@assets/*` → `src/assets/*`
- `@styles/*` → `src/styles/*`

### Internationalization (i18n)

Hỗ trợ đa ngôn ngữ với auto-detection:

```typescript
import { useTranslation } from '@hooks/useTranslation';

const MyComponent = () => {
  const { t, changeLanguage } = useTranslation();

  return (
    <View>
      <Text>{t('common.welcome')}</Text>
      <Button title="Switch to Vietnamese" onPress={() => changeLanguage('vi')} />
    </View>
  );
};
```

**Supported Languages:**

- 🇬🇧 English (en)
- 🇻🇳 Tiếng Việt (vi)

### TypeScript Configuration

TypeScript đã được cấu hình với strict mode và các rules tối ưu:

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true
}
```

---

## 📜 Scripts

```bash
# Development
npm start              # Start Metro bundler
npm run android        # Run on Android
npm run ios            # Run on iOS

# Code Quality
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues
npm run format         # Format code with Prettier

# Testing
npm test               # Run tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report

# Build
npm run build:android  # Build Android APK
npm run build:ios      # Build iOS app
```

---

## 🏗 Architecture

Dự án tuân theo **Clean Architecture** với 3 layers chính:

### 1. Presentation Layer

- **Components**: UI components (dumb & smart)
- **Screens**: Page-level components
- **Hooks**: Custom React hooks cho logic tái sử dụng

### 2. Domain Layer

- **Types**: TypeScript interfaces và types
- **Models**: Business entities
- **Use Cases**: Business logic

### 3. Data Layer

- **Services**: API clients, storage services
- **Repositories**: Data access patterns

**Xem chi tiết**: [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Writing Tests

```typescript
// Example: Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@components/common/Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button title="Click Me" onPress={() => {}} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Press" onPress={onPressMock} />);

    fireEvent.press(getByText('Press'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
```

---

## 🎯 Best Practices

### Component Design

```typescript
// ✅ Good: Typed props, memoization, single responsibility
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = React.memo(
  ({ title, onPress, variant = 'primary' }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  },
);
```

### Custom Hooks

```typescript
// ✅ Good: Reusable logic, clear interface
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials: Credentials) => {
    setLoading(true);
    try {
      const user = await AuthService.login(credentials);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, login };
};
```

### Performance Optimization

```typescript
// ✅ Good: Optimized list rendering
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

---

## 📱 Platform-Specific Code

```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  shadow: {
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

## 🚢 Deployment

### Android

```bash
# Generate release APK
cd android
./gradlew assembleRelease

# APK location: android/app/build/outputs/apk/release/app-release.apk
```

### iOS

```bash
# Build for release (trong Xcode)
# Product > Archive > Distribute App
```

---

## 🔧 Troubleshooting

### Common Issues

**Metro bundler không start:**

```bash
npm start -- --reset-cache
```

**iOS build fails:**

```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Android build fails:**

```bash
cd android
./gradlew clean
cd ..
```

**TypeScript errors:**

```bash
rm -rf node_modules
npm install
```

---

## 📚 Additional Resources

- [Architecture Documentation](./ARCHITECTURE.md) - Chi tiết về kiến trúc
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Navigation](https://reactnavigation.org/)

---

## 👥 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

Your Name - [@yourhandle](https://twitter.com/yourhandle)

Project Link:
[https://github.com/yourusername/MiniRestaurantPro](https://github.com/yourusername/MiniRestaurantPro)

---

# Getting Started

> **Note**: Make sure you have completed the
> [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before
> proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and
use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or
after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit
[CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS
Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will
automatically update and reflect these changes — this is powered by
[Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a
full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**,
  accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd>
  (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the
  [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the
  [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the
[Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React
  Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React
  Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub
  **repository** for React Native.
