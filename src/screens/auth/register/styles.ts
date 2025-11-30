import { StyleSheet } from 'react-native';
import { Theme } from '@styles/theme';

export const registerStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    },
    title: {
      ...theme.typography.h1,
      color: theme.colors.text,
      marginBottom: theme.spacing.xl,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.sm,
    },
    buttonText: {
      ...theme.typography.button,
      color: theme.colors.onPrimary,
    },
    input: {
      width: '100%',
      backgroundColor: theme.colors.surface,
      color: theme.colors.text,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.sm,
      marginBottom: theme.spacing.md,
      ...theme.typography.body,
    },
  });
