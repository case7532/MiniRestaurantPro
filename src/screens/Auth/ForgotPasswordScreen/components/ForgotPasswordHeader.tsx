// ============================================
// Forgot Password Screen - Header Component
// ============================================

import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

export const ForgotPasswordHeader: React.FC = React.memo(() => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <Text style={styles.icon}>🔒</Text>
      <Text style={styles.title}>
        {t('auth.forgot_password_title', { defaultValue: 'Forgot Password?' })}
      </Text>
      <Text style={styles.subtitle}>
        {t('auth.forgot_password_subtitle', {
          defaultValue:
            'Enter your email address and we will send you a link to reset your password',
        })}
      </Text>
    </View>
  );
});

ForgotPasswordHeader.displayName = 'ForgotPasswordHeader';
