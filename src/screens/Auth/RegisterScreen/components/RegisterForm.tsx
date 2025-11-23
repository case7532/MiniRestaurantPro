// ============================================
// Register Screen - Form Component
// ============================================

import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { useTranslation } from '@hooks/useTranslation';
import { styles } from '../styles';

interface RegisterFormProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  errors: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  };
  loading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (password: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onRegister: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = React.memo(({
  name,
  email,
  phone,
  password,
  confirmPassword,
  errors,
  loading,
  showPassword,
  showConfirmPassword,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onRegister,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Input
        label={t('auth.name')}
        value={name}
        onChangeText={onNameChange}
        placeholder={t('auth.name')}
        autoCapitalize="words"
        autoComplete="name"
        error={errors.name}
        editable={!loading}
      />

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
        label={`${t('auth.phone')} (${t('common.optional', { defaultValue: 'Optional' })})`}
        value={phone}
        onChangeText={onPhoneChange}
        placeholder={t('auth.phone')}
        keyboardType="phone-pad"
        autoComplete="tel"
        error={errors.phone}
        editable={!loading}
      />

      <Input
        label={t('auth.password')}
        value={password}
        onChangeText={onPasswordChange}
        placeholder={t('auth.password')}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoComplete="password-new"
        error={errors.password}
        editable={!loading}
        rightIcon={
          <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
        }
        onRightIconPress={onTogglePassword}
      />

      <Input
        label={t('auth.confirm_password')}
        value={confirmPassword}
        onChangeText={onConfirmPasswordChange}
        placeholder={t('auth.confirm_password')}
        secureTextEntry={!showConfirmPassword}
        autoCapitalize="none"
        autoComplete="password-new"
        error={errors.confirmPassword}
        editable={!loading}
        rightIcon={
          <Text style={styles.eyeIcon}>
            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        }
        onRightIconPress={onToggleConfirmPassword}
      />

      <Button
        title={t('auth.register')}
        onPress={onRegister}
        loading={loading}
        disabled={loading}
        size="large"
        fullWidth
        style={styles.registerButton}
      />
    </View>
  );
});

RegisterForm.displayName = 'RegisterForm';
