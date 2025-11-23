// ============================================
// Home Screen - Stats Card Component
// ============================================

import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import { formatCurrency } from '@utils/helpers';
import { styles } from '../styles';

interface StatsCardsProps {
  totalOrders: number;
  todayRevenue: number;
  activeOrders: number;
  menuItems: number;
}

export const StatsCards: React.FC<StatsCardsProps> = React.memo(({
  totalOrders,
  todayRevenue,
  activeOrders,
  menuItems,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.statCardLarge]}>
          <Text style={styles.statIcon}>💰</Text>
          <Text style={styles.statLabel}>
            {t('home.today_revenue', { defaultValue: "Today's Revenue" })}
          </Text>
          <Text style={styles.statValue}>
            {formatCurrency(todayRevenue, 'VND')}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.statCardSmall]}>
          <Text style={styles.statIconSmall}>📋</Text>
          <Text style={styles.statLabelSmall}>
            {t('home.active_orders', { defaultValue: 'Active' })}
          </Text>
          <Text style={styles.statValueSmall}>{activeOrders}</Text>
        </View>

        <View style={[styles.statCard, styles.statCardSmall]}>
          <Text style={styles.statIconSmall}>✅</Text>
          <Text style={styles.statLabelSmall}>
            {t('home.total_orders', { defaultValue: 'Total' })}
          </Text>
          <Text style={styles.statValueSmall}>{totalOrders}</Text>
        </View>

        <View style={[styles.statCard, styles.statCardSmall]}>
          <Text style={styles.statIconSmall}>🍽️</Text>
          <Text style={styles.statLabelSmall}>
            {t('home.menu_items', { defaultValue: 'Menu' })}
          </Text>
          <Text style={styles.statValueSmall}>{menuItems}</Text>
        </View>
      </View>
    </View>
  );
});

StatsCards.displayName = 'StatsCards';
