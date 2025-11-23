import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '@styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
    padding: Spacing.lg,
  },
  settingOption: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderColor: Colors.gray[300],
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    marginTop: Spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 14,
    color: Colors.text.primary,
  },
});
