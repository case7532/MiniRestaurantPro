// ============================================
// Home Screen
// ============================================

import React, { useEffect, useState, useCallback } from 'react';
import { Alert, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import type { MainTabParamList } from '@navigation/types';
import { HomeHeader, StatsCards, QuickActions, RecentActivity } from './components';
import { styles } from './styles';
import { View } from 'react-native';
import { Colors } from '@styles/theme';

type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

interface Stats {
  totalOrders: number;
  todayRevenue: number;
  activeOrders: number;
  menuItems: number;
}

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    todayRevenue: 0,
    activeOrders: 0,
    menuItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      // TODO: Fetch real stats from API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setStats({
        totalOrders: 156,
        todayRevenue: 12450000, // VND
        activeOrders: 8,
        menuItems: 45,
      });
    } catch (error: any) {
      Alert.alert(
        t('common.error'),
        error.message || t('errors.unknown_error')
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  const handleNavigateToOrders = () => {
    navigation.navigate('Orders');
  };

  const handleNavigateToMenu = () => {
    navigation.navigate('Menu');
  };

  const handleNavigateToSettings = () => {
    navigation.navigate('Settings');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        <HomeHeader user={user} onSettingsPress={handleNavigateToSettings} />

        <StatsCards
          totalOrders={stats.totalOrders}
          todayRevenue={stats.todayRevenue}
          activeOrders={stats.activeOrders}
          menuItems={stats.menuItems}
        />

        <QuickActions
          onOrdersPress={handleNavigateToOrders}
          onMenuPress={handleNavigateToMenu}
        />

        <RecentActivity />
      </ScrollView>
    </SafeAreaView>
  );
};
