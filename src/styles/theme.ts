/**
 * Theme Configuration
 * Hệ thống theme hỗ trợ Light và Dark mode
 */

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    // Primary Colors (based on provided palette)
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    accentLight: string;

    // Background Colors
    background: string;
    surface: string;
    card: string;

    // Text Colors
    text: string;
    textSecondary: string;
    textDisabled: string;

    // UI Element Colors
    border: string;
    divider: string;
    ripple: string;

    // Status Colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // Overlay
    overlay: string;
    backdrop: string;

    // Semantic Colors
    onPrimary: string;
    onSecondary: string;
    onBackground: string;
    onSurface: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    round: number;
  };
  typography: {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    h4: TextStyle;
    h5: TextStyle;
    h6: TextStyle;
    body1: TextStyle;
    body2: TextStyle;
    subtitle1: TextStyle;
    subtitle2: TextStyle;
    button: TextStyle;
    caption: TextStyle;
    overline: TextStyle;
  };
  shadows: {
    sm: ShadowStyle;
    md: ShadowStyle;
    lg: ShadowStyle;
  };
}

interface TextStyle {
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700' | '800';
  lineHeight: number;
  letterSpacing?: number;
}

interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

// ============================================
// LIGHT THEME
// ============================================
export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    // Primary Colors - Based on #FF5555
    primary: '#FF5555',
    primaryLight: '#FF7B7B',
    primaryDark: '#E63946',
    // Secondary Colors - Based on #FF937E
    secondary: '#FF937E',
    // Accent Colors - Based on #C1E59F and #A3D78A
    accent: '#A3D78A',
    accentLight: '#C1E59F',

    // Background Colors
    background: '#FFFFFF',
    surface: '#F8F9FA',
    card: '#FFFFFF',

    // Text Colors
    text: '#1A1A1A',
    textSecondary: '#6C757D',
    textDisabled: '#ADB5BD',

    // UI Element Colors
    border: '#DEE2E6',
    divider: '#E9ECEF',
    ripple: 'rgba(255, 85, 85, 0.12)',

    // Status Colors
    success: '#A3D78A',
    warning: '#FFB020',
    error: '#FF5555',
    info: '#4DABF7',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    backdrop: 'rgba(0, 0, 0, 0.3)',

    // Semantic Colors
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: '#1A1A1A',
    onSurface: '#1A1A1A',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 36,
      letterSpacing: -0.5,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    h5: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
    },
    h6: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22,
    },
    body1: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    overline: {
      fontSize: 10,
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: 1.5,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// ============================================
// DARK THEME
// ============================================
export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    // Primary Colors - Adjusted for dark mode
    primary: '#FF7B7B',
    primaryLight: '#FFA0A0',
    primaryDark: '#FF5555',
    // Secondary Colors
    secondary: '#FFB09A',
    // Accent Colors
    accent: '#B5E399',
    accentLight: '#C9EDB3',

    // Background Colors - Dark mode
    background: '#121212',
    surface: '#1E1E1E',
    card: '#252525',

    // Text Colors - Dark mode
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textDisabled: '#6C6C6C',

    // UI Element Colors
    border: '#3A3A3A',
    divider: '#2C2C2C',
    ripple: 'rgba(255, 123, 123, 0.12)',

    // Status Colors - Adjusted for dark mode
    success: '#B5E399',
    warning: '#FFB84D',
    error: '#FF7B7B',
    info: '#66C0FF',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
    backdrop: 'rgba(0, 0, 0, 0.5)',

    // Semantic Colors
    onPrimary: '#000000',
    onSecondary: '#000000',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 36,
      letterSpacing: -0.5,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    h5: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
    },
    h6: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22,
    },
    body1: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    overline: {
      fontSize: 10,
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: 1.5,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// ============================================
// THEME HELPER FUNCTIONS
// ============================================

/**
 * Get theme based on mode
 */
export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

/**
 * Color palette reference (original colors)
 */
export const ColorPalette = {
  coral: '#FF5555',
  peach: '#FF937E',
  mint: '#C1E59F',
  sage: '#A3D78A',
} as const;

/**
 * Common color utilities
 */
export const colorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Usage example:
 *
 * ```tsx
 * import { lightTheme, darkTheme, getTheme } from '@styles/theme';
 *
 * // In your component
 * const theme = getTheme('light');
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing.md,
 *   },
 *   title: {
 *     ...theme.typography.h1,
 *     color: theme.colors.text,
 *   },
 *   button: {
 *     backgroundColor: theme.colors.primary,
 *     borderRadius: theme.borderRadius.md,
 *     ...theme.shadows.md,
 *   },
 * });
 * ```
 */
