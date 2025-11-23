// ============================================
// Login Screen
// ============================================

import React, { useState } from 'react';
import { Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import { validateEmail, validateRequired } from '@utils/validation';
import type { LoginCredentials } from '@types';
import type { LoginScreenNavigationProp } from '@navigation/types';
import { LoginHeader, LoginForm, LoginFooter } from './components';
import { styles } from './styles';

interface FormErrors {
  email?: string;
  password?: string;
}

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const { login, loading } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    const passwordValidation = validateRequired(password, t('auth.password'));
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const credentials: LoginCredentials = { email, password };
      await login(credentials);
    } catch (error: any) {
      Alert.alert(
        t('common.error'),
        error.message || t('auth.invalid_credentials')
      );
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <LoginHeader />

          <LoginForm
            email={email}
            password={password}
            errors={errors}
            loading={loading}
            showPassword={showPassword}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
          />

          <LoginFooter loading={loading} onRegister={handleRegister} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
