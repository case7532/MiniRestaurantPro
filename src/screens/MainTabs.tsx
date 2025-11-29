import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@screens/home';
import { MenuScreen } from '@screens/menu';
import { OrdersScreen } from '@screens/orders';
import { SettingScreen } from '@screens/setting';
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { icons } from '@/assets/icon';

export type MainTabsParamList = {
  HomeTab: undefined;
  MenuTab: undefined;
  OrdersTab: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

// Icon components moved outside render to avoid re-creation
const HomeTabIcon = ({ color }: { color: string }) => {
  const HomeIcon = icons.shop;
  return <HomeIcon width={24} height={24} fill={color} />;
};

const MenuTabIcon = ({ color }: { color: string }) => {
  const MenuIcon = icons.menuBurger;
  return <MenuIcon width={24} height={24} fill={color} />;
};

const OrdersTabIcon = ({ color }: { color: string }) => {
  const OrdersIcon = icons.shoppingCart;
  return <OrdersIcon width={24} height={24} fill={color} />;
};

const SettingsTabIcon = ({ color }: { color: string }) => {
  const SettingsIcon = icons.settings;
  return <SettingsIcon width={24} height={24} fill={color} />;
};

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
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuScreen}
        options={{
          tabBarLabel: t('navigation.menu'),
          tabBarIcon: MenuTabIcon,
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersScreen}
        options={{
          tabBarLabel: t('navigation.orders'),
          tabBarIcon: OrdersTabIcon,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingScreen}
        options={{
          tabBarLabel: t('navigation.settings'),
          tabBarIcon: SettingsTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};
