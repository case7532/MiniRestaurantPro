// ============================================
// Register Screen - Footer Component
// ============================================

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

interface RegisterFooterProps {
  loading: boolean;
  onLogin: () => void;
}

export const RegisterFooter: React.FC<RegisterFooterProps> = React.memo(({
  loading,
  onLogin,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        {t('auth.have_account', { defaultValue: 'Already have an account?' })}
      </Text>
      <TouchableOpacity onPress={onLogin} disabled={loading}>
        <Text style={styles.loginLink}>{t('auth.login')}</Text>
      </TouchableOpacity>
    </View>
  );
});

RegisterFooter.displayName = 'RegisterFooter';
