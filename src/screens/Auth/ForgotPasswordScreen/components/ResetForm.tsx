// ============================================
// Forgot Password Screen - Reset Form Component
// ============================================

import React from 'react';
import { View } from 'react-native';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

interface ResetFormProps {
  email: string;
  error?: string;
  loading: boolean;
  onEmailChange: (email: string) => void;
  onSendResetLink: () => void;
}

export const ResetForm: React.FC<ResetFormProps> = React.memo(
  ({ email, error, loading, onEmailChange, onSendResetLink }) => {
    const { t } = useTranslation();

    return (
      <View style={styles.form}>
        <Input
          label={t('auth.email')}
          value={email}
          onChangeText={onEmailChange}
          placeholder={t('auth.email')}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          error={error}
          editable={!loading}
        />

        <Button
          title={t('auth.send_reset_link', { defaultValue: 'Send Reset Link' })}
          onPress={onSendResetLink}
          loading={loading}
          disabled={loading}
          size="large"
          fullWidth
        />
      </View>
    );
  },
);

ResetForm.displayName = 'ResetForm';
