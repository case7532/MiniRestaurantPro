// ============================================
// Login Screen - Footer Component
// ============================================

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

interface LoginFooterProps {
  loading: boolean;
  onRegister: () => void;
}

export const LoginFooter: React.FC<LoginFooterProps> = React.memo(
  ({ loading, onRegister }) => {
    const { t } = useTranslation();

    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {t('auth.no_account', { defaultValue: "Don't have an account?" })}
        </Text>
        <TouchableOpacity onPress={onRegister} disabled={loading}>
          <Text style={styles.registerLink}>{t('auth.register')}</Text>
        </TouchableOpacity>
      </View>
    );
  },
);

LoginFooter.displayName = 'LoginFooter';
