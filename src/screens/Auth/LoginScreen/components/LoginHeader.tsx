// ============================================
// Login Screen - Header Component
// ============================================

import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

export const LoginHeader: React.FC = React.memo(() => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>🍽️</Text>
      <Text style={styles.title}>{t('common.app_name')}</Text>
      <Text style={styles.subtitle}>{t('common.welcome')}</Text>
    </View>
  );
});

LoginHeader.displayName = 'LoginHeader';
