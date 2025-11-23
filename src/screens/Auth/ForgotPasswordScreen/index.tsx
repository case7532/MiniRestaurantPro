// ============================================
// Forgot Password Screen
// ============================================

import React, { useState } from 'react';
import { Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import { validateEmail } from '@utils/validation';
import type { ForgotPasswordScreenNavigationProp } from '@navigation/types';
import {
  ForgotPasswordHeader,
  SuccessCard,
  ResetForm,
  ForgotPasswordFooter,
} from './components';
import { styles } from './styles';

interface FormErrors {
  email?: string;
}

export const ForgotPasswordScreen: React.FC = () => {
  const { t } = useTranslation();
  const { sendPasswordResetEmail } = useAuth();
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendResetLink = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(email);
      
      setSent(true);
      Alert.alert(
        t('common.success'),
        'Email khôi phục mật khẩu đã được gửi.\n\nVui lòng kiểm tra hộp thư và làm theo hướng dẫn để đặt lại mật khẩu của bạn.'
      );
    } catch (error: any) {
      Alert.alert(
        t('common.error'),
        error.message || t('errors.unknown_error')
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
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
          <ForgotPasswordHeader />

          {sent ? (
            <SuccessCard email={email} />
          ) : (
            <ResetForm
              email={email}
              error={errors.email}
              loading={loading}
              onEmailChange={setEmail}
              onSendResetLink={handleSendResetLink}
            />
          )}

          <ForgotPasswordFooter
            loading={loading}
            onBackToLogin={handleBackToLogin}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
