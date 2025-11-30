import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { registerStyles } from './styles';
import { RegisterScreenProps } from './type';

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  navigation,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = registerStyles(theme);

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.register')}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToLogin}>
        <Text style={styles.buttonText}>
          {t('auth.go_to_login') || 'Go to Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
