// ============================================
// Home Screen - Header Component
// ============================================

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import type { User } from '@types';
import { styles } from '../styles';

interface HomeHeaderProps {
  user: User | null;
  onSettingsPress: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = React.memo(
  ({ user, onSettingsPress }) => {
    const { t } = useTranslation();

    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        return t('home.good_morning', { defaultValue: 'Good Morning' });
      }
      if (hour < 18) {
        return t('home.good_afternoon', { defaultValue: 'Good Afternoon' });
      }
      return t('home.good_evening', { defaultValue: 'Good Evening' });
    };

    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onSettingsPress}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    );
  },
);

HomeHeader.displayName = 'HomeHeader';
