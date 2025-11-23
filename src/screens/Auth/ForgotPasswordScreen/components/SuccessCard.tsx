// ============================================
// Forgot Password Screen - Success Card Component
// ============================================

import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

interface SuccessCardProps {
  email: string;
}

export const SuccessCard: React.FC<SuccessCardProps> = React.memo(
  ({ email }) => {
    const { t } = useTranslation();

    return (
      <View style={styles.successCard}>
        <Text style={styles.successIcon}>✉️</Text>
        <Text style={styles.successTitle}>
          {t('auth.check_email', { defaultValue: 'Check your email' })}
        </Text>
        <Text style={styles.successText}>
          {t('auth.reset_link_sent', {
            defaultValue: 'We have sent a password reset link to',
          })}
        </Text>
        <Text style={styles.successEmail}>{email}</Text>
      </View>
    );
  },
);

SuccessCard.displayName = 'SuccessCard';
