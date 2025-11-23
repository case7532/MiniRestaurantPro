// ============================================
// Forgot Password Screen - Footer Component
// ============================================

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

interface ForgotPasswordFooterProps {
  loading: boolean;
  onBackToLogin: () => void;
}

export const ForgotPasswordFooter: React.FC<ForgotPasswordFooterProps> =
  React.memo(({ loading, onBackToLogin }) => {
    const { t } = useTranslation();

    return (
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackToLogin}
          disabled={loading}
        >
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>
            {t('auth.back_to_login', { defaultValue: 'Back to Login' })}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });

ForgotPasswordFooter.displayName = 'ForgotPasswordFooter';
