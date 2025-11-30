import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { useAuth } from '@hooks/useAuth';
import { loginStyles } from './styles';
import { LoginScreenProps } from './types';
import { TextInput } from 'react-native-gesture-handler';
import { icons } from '@assets/icon';

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { login } = useAuth();
  const styles = loginStyles(theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    try {
      // TODO: Implement actual login logic with form validation
      await login(email, password);
      // Navigation will happen automatically via AuthContext
    } catch (error) {
      console.error('Login failed:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn trở lại</Text>

      <View style={styles.inputContainer}>
        <icons.user width={20} height={20} fill={theme.colors.primary} />
        <TextInput
          style={styles.textInputEmail}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <icons.lock width={20} height={20} fill={theme.colors.primary} />
        <TextInput
          style={styles.textInputPassword}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={handleNavigateToRegister}
        style={styles.registerLink}
      >
        <Text>Bạn chưa có tài khoản?</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{t('auth.login')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
