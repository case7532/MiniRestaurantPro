// ============================================
// Home Screen - Recent Activity Component
// ============================================

import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

export const RecentActivity: React.FC = React.memo(() => {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {t('home.recent_activity', { defaultValue: 'Recent Activity' })}
      </Text>
      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>📊</Text>
        <Text style={styles.emptyText}>
          {t('home.no_recent_activity', {
            defaultValue: 'No recent activity',
          })}
        </Text>
      </View>
    </View>
  );
});

RecentActivity.displayName = 'RecentActivity';
