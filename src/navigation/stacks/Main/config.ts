// ============================================
// Main Tab Configuration
// ============================================

import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Colors, FontSizes, Spacing } from '@styles/theme';

export const tabBarOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.text.secondary,
  tabBarStyle: {
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    height: 60,
    paddingBottom: Spacing.xs,
    paddingTop: Spacing.xs,
    backgroundColor: '#FFFFFF',
  },
  tabBarLabelStyle: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  tabBarItemStyle: {
    paddingVertical: 4,
  },
};
