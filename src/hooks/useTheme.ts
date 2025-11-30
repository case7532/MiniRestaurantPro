/**
 * useTheme Hook
 * Custom hook để truy cập theme trong components
 */

import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

/**
 * Usage example:
 *
 * ```tsx
 * import { useTheme } from '@hooks/useTheme';
 * import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
 *
 * const MyComponent = () => {
 *   const { theme, isDark, toggleTheme } = useTheme();
 *
 *   return (
 *     <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
 *       <Text style={[theme.typography.h1, { color: theme.colors.text }]}>
 *         Hello World
 *       </Text>
 *
 *       <TouchableOpacity
 *         onPress={toggleTheme}
 *         style={[styles.button, {
 *           backgroundColor: theme.colors.primary,
 *           borderRadius: theme.borderRadius.md,
 *           padding: theme.spacing.md,
 *           ...theme.shadows.md,
 *         }]}
 *       >
 *         <Text style={[theme.typography.button, { color: theme.colors.onPrimary }]}>
 *           Toggle Theme ({isDark ? 'Dark' : 'Light'})
 *         </Text>
 *       </TouchableOpacity>
 *     </View>
 *   );
 * };
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *   },
 *   button: {
 *     marginTop: 20,
 *   },
 * });
 * ```
 *
 * Advanced usage with StyleSheet:
 *
 * ```tsx
 * import { useTheme } from '@hooks/useTheme';
 *
 * const MyComponent = () => {
 *   const { theme } = useTheme();
 *   const styles = createStyles(theme);
 *
 *   return (
 *     <View style={styles.container}>
 *       <Text style={styles.title}>Styled Text</Text>
 *     </View>
 *   );
 * };
 *
 * const createStyles = (theme: Theme) => StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing.lg,
 *   },
 *   title: {
 *     ...theme.typography.h1,
 *     color: theme.colors.text,
 *     marginBottom: theme.spacing.md,
 *   },
 * });
 * ```
 */
