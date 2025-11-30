import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuAdminScreen } from '@screens/menuAdmin';
import { StaffManagementScreen } from '@screens/staff';
import { InventoryManagementScreen } from '@screens/inventory';
import { SalesManagementScreen } from '@screens/sales';
import { ReportScreen } from '@screens/report';
import { SettingScreen } from '@screens/setting';

export type AdminStackParamList = {
  MenuAdmin: undefined;
  StaffManagement: undefined;
  InventoryManagement: undefined;
  SalesManagement: undefined;
  ReportScreen: undefined;
  SettingsScreen: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export const AdminStack: React.FC = () => {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }} initialRouteName="MenuAdmin">
      <Stack.Screen name="MenuAdmin" component={MenuAdminScreen} />
      <Stack.Screen name="StaffManagement" component={StaffManagementScreen} />
      <Stack.Screen name="InventoryManagement" component={InventoryManagementScreen} />
      <Stack.Screen name="SalesManagement" component={SalesManagementScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
};
