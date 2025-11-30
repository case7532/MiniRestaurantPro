
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { AuthStack } from '../screens/auth/AuthStack';
import { useAuth } from '@hooks/useAuth';
import { AdminStack } from './AdminStack';

export type RootStackParamList = {
  MenuAdmin: undefined;
  StaffManagement: undefined;
  InventoryManagement: undefined;
  SalesManagement: undefined;
  ReportScreen: undefined;
  SettingsScreen: undefined;
};

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AdminStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
