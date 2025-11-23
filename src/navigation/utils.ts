// ============================================
// Navigation Utilities
// All navigation helpers in one place
// ============================================

import { createNavigationContainerRef } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { AuthStackParamList } from './stacks/Auth/types';
import type { MainTabParamList } from './stacks/Main/types';

// ============================================
// Types
// ============================================

export type { AuthStackParamList, MainTabParamList };

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// ============================================
// Navigation Service
// ============================================

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const NavigationService = {
  navigate<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName],
  ) {
    if (navigationRef.isReady()) {
      // @ts-expect-error - React Navigation types are complex with generic constraints
      navigationRef.navigate(name, params);
    }
  },

  goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  },

  resetRoot<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName],
  ) {
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name, params }],
      });
    }
  },

  getCurrentRoute() {
    if (navigationRef.isReady()) {
      return navigationRef.getCurrentRoute()?.name;
    }
    return undefined;
  },

  isReady() {
    return navigationRef.isReady();
  },
};

// ============================================
// Route Helpers
// ============================================

export function getRouteDisplayName(routeName?: string): string {
  if (!routeName) {
    return 'Unknown';
  }
  return routeName.replace(/([A-Z])/g, ' $1').trim();
}

// ============================================
// Navigation Hooks
// ============================================

export function useAuthNavigation() {
  return useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
}

export function useMainNavigation() {
  return useNavigation<BottomTabNavigationProp<MainTabParamList>>();
}

export function useCurrentRouteName() {
  const route = useRoute();
  return route.name;
}

export function useRouteParams<T = unknown>(): T | undefined {
  const route = useRoute();
  return route.params as T;
}

export { useIsFocused } from '@react-navigation/native';
