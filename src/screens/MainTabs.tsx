import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@screens/home';
import { MenuScreen } from '@screens/menu';
import { OrdersScreen } from '@screens/orders';
import { SettingScreen } from '@screens/setting';
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { icons, icons as Icons } from '@/assets/icon';

export type MainTabsParamList = {
  HomeTab: undefined;
  MenuTab: undefined;
  OrdersTab: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export const MainTabs: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: t('navigation.home'),
          tabBarIcon: ({ color }) => {
            const HomeIcon = icons.shop;
            return <HomeIcon width={24} height={24} fill={color} />;
          },
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuScreen}
        options={{
          tabBarLabel: t('navigation.menu'),
          tabBarIcon: ({ color }) => {
            const MenuIcon = Icons.menuBurger;
            return <MenuIcon width={24} height={24} fill={color} />;
          },
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersScreen}
        options={{
          tabBarLabel: t('navigation.orders'),
          tabBarIcon: ({ color }) => {
            const OrdersIcon = icons.shoppingCart;
            return <OrdersIcon width={24} height={24} fill={color} />;
          },
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingScreen}
        options={{
          tabBarLabel: t('navigation.settings'),
          tabBarIcon: ({ color }) => {
            const SettingsIcon = icons.settings;
            return <SettingsIcon width={24} height={24} fill={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
