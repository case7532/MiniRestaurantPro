# 🎨 Theme System Guide

Hướng dẫn sử dụng hệ thống theme cho MiniRestaurantPro.

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Color Palette](#color-palette)
- [Cài đặt](#cài-đặt)
- [Sử dụng Theme](#sử-dụng-theme)
- [Theme Structure](#theme-structure)
- [Best Practices](#best-practices)

---

## 🎯 Tổng quan

Hệ thống theme của MiniRestaurantPro hỗ trợ cả **Light Mode** và **Dark Mode** với bảng màu được
thiết kế chuyên nghiệp dựa trên:

- 🎨 **Coral** (#FF5555) - Primary color (màu chủ đạo)
- 🍑 **Peach** (#FF937E) - Secondary color (màu phụ)
- 🌿 **Mint** (#C1E59F) - Accent light (màu nhấn sáng)
- 🌱 **Sage** (#A3D78A) - Accent color (màu nhấn)

### Features

- ✅ Light & Dark mode support
- ✅ Automatic theme persistence (AsyncStorage)
- ✅ System theme detection
- ✅ Type-safe theme access
- ✅ Comprehensive color palette
- ✅ Typography system
- ✅ Spacing & border radius tokens
- ✅ Platform-specific shadows

---

## 🎨 Color Palette

### Light Mode

| Color          | Hex       | Usage                      |
| -------------- | --------- | -------------------------- |
| Primary        | `#FF5555` | Buttons, links, highlights |
| Primary Light  | `#FF7B7B` | Hover states               |
| Primary Dark   | `#E63946` | Active states              |
| Secondary      | `#FF937E` | Secondary actions          |
| Accent         | `#A3D78A` | Success, confirmations     |
| Accent Light   | `#C1E59F` | Light accents              |
| Background     | `#FFFFFF` | Main background            |
| Surface        | `#F8F9FA` | Card backgrounds           |
| Text           | `#1A1A1A` | Primary text               |
| Text Secondary | `#6C757D` | Secondary text             |

### Dark Mode

| Color          | Hex       | Usage                      |
| -------------- | --------- | -------------------------- |
| Primary        | `#FF7B7B` | Buttons, links, highlights |
| Primary Light  | `#FFA0A0` | Hover states               |
| Primary Dark   | `#FF5555` | Active states              |
| Secondary      | `#FFB09A` | Secondary actions          |
| Accent         | `#B5E399` | Success, confirmations     |
| Accent Light   | `#C9EDB3` | Light accents              |
| Background     | `#121212` | Main background            |
| Surface        | `#1E1E1E` | Card backgrounds           |
| Text           | `#FFFFFF` | Primary text               |
| Text Secondary | `#B0B0B0` | Secondary text             |

---

## 📦 Cài đặt

### 1. Wrap App với ThemeProvider

```tsx
// App.tsx
import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { YourApp } from './YourApp';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

export default App;
```

### 2. Import useTheme hook trong components

```tsx
import { useTheme } from '@hooks/useTheme';
```

---

## 🚀 Sử dụng Theme

### Basic Usage

```tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@hooks/useTheme';

const MyComponent = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[theme.typography.h1, { color: theme.colors.text }]}>Hello World</Text>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.md,
            ...theme.shadows.md,
          },
        ]}
        onPress={toggleTheme}
      >
        <Text style={[theme.typography.button, { color: theme.colors.onPrimary }]}>
          Toggle {isDark ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    padding: 16,
    alignItems: 'center',
  },
});
```

### Advanced Usage with Dynamic Styles

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { Theme } from '@styles/theme';

const MyComponent = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Themed Component</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Card content</Text>
      </View>
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
    card: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.md,
    },
    cardText: {
      ...theme.typography.body1,
      color: theme.colors.textSecondary,
    },
  });

export default MyComponent;
```

---

## 📐 Theme Structure

### Colors

```typescript
theme.colors.primary; // Main brand color
theme.colors.secondary; // Secondary brand color
theme.colors.accent; // Accent/success color
theme.colors.background; // Main background
theme.colors.surface; // Card/surface background
theme.colors.text; // Primary text
theme.colors.textSecondary; // Secondary text
theme.colors.error; // Error state
theme.colors.warning; // Warning state
theme.colors.success; // Success state
theme.colors.border; // Border color
```

### Typography

```typescript
theme.typography.h1; // 32px, bold
theme.typography.h2; // 28px, bold
theme.typography.h3; // 24px, semibold
theme.typography.h4; // 20px, semibold
theme.typography.h5; // 18px, semibold
theme.typography.h6; // 16px, semibold
theme.typography.body1; // 16px, regular
theme.typography.body2; // 14px, regular
theme.typography.button; // 16px, semibold
theme.typography.caption; // 12px, regular
```

### Spacing

```typescript
theme.spacing.xs; // 4px
theme.spacing.sm; // 8px
theme.spacing.md; // 16px
theme.spacing.lg; // 24px
theme.spacing.xl; // 32px
theme.spacing.xxl; // 48px
```

### Border Radius

```typescript
theme.borderRadius.sm; // 4px
theme.borderRadius.md; // 8px
theme.borderRadius.lg; // 12px
theme.borderRadius.xl; // 16px
theme.borderRadius.round; // 9999px (fully rounded)
```

### Shadows

```typescript
theme.shadows.sm; // Small shadow
theme.shadows.md; // Medium shadow
theme.shadows.lg; // Large shadow
```

---

## ✅ Best Practices

### 1. Always Use Theme Colors

```tsx
// ❌ Bad - Hardcoded colors
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
});

// ✅ Good - Using theme
const styles = createStyles(theme);
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
  });
```

### 2. Use Typography Tokens

```tsx
// ❌ Bad - Hardcoded font sizes
<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Title</Text>

// ✅ Good - Using typography tokens
<Text style={[theme.typography.h3, { color: theme.colors.text }]}>
  Title
</Text>
```

### 3. Use Spacing Tokens

```tsx
// ❌ Bad - Magic numbers
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 24,
  },
});

// ✅ Good - Using spacing tokens
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
  });
```

### 4. Semantic Color Usage

```tsx
// ✅ Use semantic colors for states
<View style={{ backgroundColor: theme.colors.success }}>
  <Text style={{ color: theme.colors.text }}>Success!</Text>
</View>

<View style={{ backgroundColor: theme.colors.error }}>
  <Text style={{ color: theme.colors.onPrimary }}>Error!</Text>
</View>
```

### 5. Dynamic Styles Function

```tsx
// ✅ Best practice - Create styles function that accepts theme
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    // styles here
  });

// In component
const MyComponent = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  // ...
};
```

---

## 🔧 Theme API

### useTheme Hook

```typescript
const {
  theme, // Current theme object
  themeMode, // 'light' | 'dark'
  isDark, // boolean
  toggleTheme, // () => void
  setThemeMode, // (mode: 'light' | 'dark') => void
} = useTheme();
```

### Theme Object

```typescript
interface Theme {
  mode: 'light' | 'dark';
  colors: {
    /* ... */
  };
  spacing: {
    /* ... */
  };
  borderRadius: {
    /* ... */
  };
  typography: {
    /* ... */
  };
  shadows: {
    /* ... */
  };
}
```

---

## 🎨 Examples

### Button Component

```tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { Theme } from '@styles/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const buttonStyle = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    outline: styles.outlineButton,
  }[variant];

  const textStyle = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    outline: styles.outlineText,
  }[variant];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    primaryButton: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    secondaryButton: {
      backgroundColor: theme.colors.secondary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    outlineButton: {
      backgroundColor: 'transparent',
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    primaryText: {
      ...theme.typography.button,
      color: theme.colors.onPrimary,
    },
    secondaryText: {
      ...theme.typography.button,
      color: theme.colors.onSecondary,
    },
    outlineText: {
      ...theme.typography.button,
      color: theme.colors.primary,
    },
  });
```

### Card Component

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { Theme } from '@styles/theme';

interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, children }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {children}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: theme.spacing.md,
      ...theme.shadows.md,
    },
    title: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    description: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
    },
  });
```

---

## 🧪 Testing Theme

Run the app to see the ThemeDemo screen with all theme features:

```bash
npm run android
# or
npm run ios
```

The demo screen shows:

- Color palette
- Typography variants
- Shadow elevations
- Button styles
- Spacing system
- Theme toggle functionality

---

## 📚 Additional Resources

- [React Native Styling](https://reactnative.dev/docs/style)
- [Material Design Color System](https://material.io/design/color)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

**Created**: November 25, 2025 **Version**: 1.0.0
