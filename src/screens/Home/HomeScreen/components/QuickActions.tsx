// ============================================
// Home Screen - Quick Actions Component
// ============================================

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

interface QuickActionsProps {
  onOrdersPress: () => void;
  onMenuPress: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = React.memo(
  ({ onOrdersPress, onMenuPress }) => {
    const { t } = useTranslation();

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('home.quick_actions', { defaultValue: 'Quick Actions' })}
        </Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionCard} onPress={onOrdersPress}>
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>📦</Text>
            </View>
            <Text style={styles.actionTitle}>{t('navigation.orders')}</Text>
            <Text style={styles.actionSubtitle}>
              {t('home.manage_orders', { defaultValue: 'View & manage' })}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={onMenuPress}>
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>🍜</Text>
            </View>
            <Text style={styles.actionTitle}>{t('navigation.menu')}</Text>
            <Text style={styles.actionSubtitle}>
              {t('home.manage_menu', { defaultValue: 'Update items' })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

QuickActions.displayName = 'QuickActions';
