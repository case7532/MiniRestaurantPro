import { Theme } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const headerStyles = (theme: Theme) => StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'flex-start',
        backgroundColor: theme.colors.background,
        ... theme.shadows.md,
    },
    containerCentered: {
        width: '100%',
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    backButton: {
        padding: theme.spacing.sm,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
});