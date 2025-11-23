// ============================================
// Login Screen - Form Component
// ============================================

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

interface LoginFormProps {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
  loading: boolean;
  showPassword: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onTogglePassword: () => void;
  onLogin: () => void;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = React.memo(
  ({
    email,
    password,
    errors,
    loading,
    showPassword,
    onEmailChange,
    onPasswordChange,
    onTogglePassword,
    onLogin,
    onForgotPassword,
  }) => {
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
          error={errors.email}
          editable={!loading}
        />

        <Input
          label={t('auth.password')}
          value={password}
          onChangeText={onPasswordChange}
          placeholder={t('auth.password')}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoComplete="password"
          error={errors.password}
          editable={!loading}
          rightIcon={
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          }
          onRightIconPress={onTogglePassword}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={onForgotPassword}
          disabled={loading}
        >
          <Text style={styles.forgotPasswordText}>
            {t('auth.forgot_password')}
          </Text>
        </TouchableOpacity>

        <Button
          title={t('auth.login')}
          onPress={onLogin}
          loading={loading}
          disabled={loading}
          size="large"
          fullWidth
        />
      </View>
    );
  },
);

LoginForm.displayName = 'LoginForm';
