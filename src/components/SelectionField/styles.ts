import { StyleSheet } from 'react-native';
import { Theme } from '@styles/theme';

export const SelectionFieldStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        marginTop: theme.spacing.sm,
    },
    enabled: {
        borderColor: theme.colors.border,
        borderWidth: 1,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.sm,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pressed: {
        borderColor: theme.colors.border,
        borderWidth: 1,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.sm,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    focused: {
        borderColor: theme.colors.border,
        borderWidth: 1,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.sm,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    disabled: {
        borderColor: theme.colors.border,
        borderWidth: 1,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.sm,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    error: {
        borderColor: theme.colors.border,
        borderWidth: 1,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.sm,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '800',
        lineHeight: 20,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    value: {
        fontSize: 14,
        lineHeight: 20,
        color: theme.colors.text,
    },
    icon: {
        width: 20,
        height: 20,
    }
});