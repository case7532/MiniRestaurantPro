// ============================================
// Register Screen
// ============================================

import React, { useState } from 'react';
import { Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import {
  validateEmail,
  validateRequired,
  validatePassword,
  validatePhone,
} from '@utils/validation';
import type { RegisterData } from '@types';
import type { RegisterScreenNavigationProp } from '@navigation/types';
import { RegisterHeader, RegisterForm, RegisterFooter } from './components';
import { styles } from './styles';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export const RegisterScreen: React.FC = () => {
  const { t } = useTranslation();
  const { register: registerUser, loading } = useAuth();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameValidation = validateRequired(name, t('auth.name'));
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    if (phone) {
      const phoneValidation = validatePhone(phone);
      if (!phoneValidation.isValid) {
        newErrors.phone = phoneValidation.error;
      }
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('auth.password_mismatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const data: RegisterData = {
        name,
        email,
        password,
        phone: phone || undefined,
      };

      await registerUser(data);
      
      // Show success message
      Alert.alert(
        t('common.success'),
        t('auth.register_success') + '\n\n' + 
        'Email xác thực đã được gửi. Vui lòng kiểm tra hộp thư của bạn.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        t('common.error'),
        error.message || t('errors.unknown_error')
      );
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
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
          <RegisterHeader />

          <RegisterForm
            name={name}
            email={email}
            phone={phone}
            password={password}
            confirmPassword={confirmPassword}
            errors={errors}
            loading={loading}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPhoneChange={setPhone}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            onRegister={handleRegister}
          />

          <RegisterFooter loading={loading} onLogin={handleLogin} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
