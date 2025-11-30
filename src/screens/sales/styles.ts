import { StyleSheet } from 'react-native';
import { Theme } from '@styles/theme';

export const salesStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    backText: {
      ...theme.typography.body,
      color: theme.colors.primary,
      marginLeft: theme.spacing.sm,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
    },
  });
