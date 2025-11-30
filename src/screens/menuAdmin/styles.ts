import { StyleSheet } from 'react-native';
import { Theme } from '@styles/theme';

export const menuAdminStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.lg,
    },
    button: {
      width: 120,
      height: 120,
      margin: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      justifyContent: 'center',
      alignItems: 'center',
      ...theme.shadows.md,
    },
    image: {
      width: 56,
      height: 56,
      marginBottom: theme.spacing.sm,
    },
    label: {
      ...theme.typography.button,
      color: theme.colors.text,
      textAlign: 'center',
    },
  });
