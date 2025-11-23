// ============================================
// Register Screen - Header Component
// ============================================

import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

export const RegisterHeader: React.FC = React.memo(() => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>🍽️</Text>
      <Text style={styles.title}>{t('auth.register')}</Text>
      <Text style={styles.subtitle}>
        {t('auth.create_account', { defaultValue: 'Create your account' })}
      </Text>
    </View>
  );
});

RegisterHeader.displayName = 'RegisterHeader';
