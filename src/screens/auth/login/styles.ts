import { StyleSheet } from 'react-native';
import { Theme } from '@styles/theme';

export const loginStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: theme.spacing.md,
    },
    title: {
      ...theme.typography.h1,
      color: theme.colors.text,
      marginBottom: theme.spacing.xl,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.sm,
      ...theme.shadows.md,
      marginTop: theme.spacing.md,
    },
    buttonText: {
      ...theme.typography.button,
      color: theme.colors.onPrimary,
    },
    inputContainer: {
      flexDirection: 'row',
      borderRadius: theme.borderRadius.md,
      borderColor: theme.colors.border,
      borderWidth: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginTop: theme.spacing.sm,
      alignContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginLeft: theme.spacing.xs,
    },
    textInputEmail: {
      width: '100%',
      fontSize: 14,
      lineHeight: 20,
    },
    textInputPassword: {
      width: '100%',
      fontSize: 14,
      lineHeight: 20,
      marginLeft: theme.spacing.xs,
    },
    registerLink: {
      marginTop: theme.spacing.md,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'flex-end',
    },
  });
