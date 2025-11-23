// ============================================
// Main Tab Navigator
// ============================================

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@screens/Home/HomeScreen';
import { MenuScreen } from '@screens/Menu/MenuScreen';
import { useTranslation } from '@hooks/useTranslation';
import { tabBarOptions } from './config';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Placeholder screens
const OrdersScreen = () => null;
const SettingsScreen = () => null;

// Tab icons
const HomeIcon = () => <Text style={styles.icon}>🏠</Text>;
const MenuIcon = () => <Text style={styles.icon}>🍜</Text>;
const OrdersIcon = () => <Text style={styles.icon}>📦</Text>;
const SettingsIcon = () => <Text style={styles.icon}>⚙️</Text>;

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
  },
});

export const MainTabs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={tabBarOptions} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('navigation.home'),
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarLabel: t('navigation.menu'),
          tabBarIcon: MenuIcon,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: t('navigation.orders'),
          tabBarIcon: OrdersIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: t('navigation.settings'),
          tabBarIcon: SettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};
