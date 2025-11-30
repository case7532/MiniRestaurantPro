import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { registerStyles } from './styles';
import { RegisterScreenProps } from './type';
import { useAuth } from '@hooks/useAuth';
import { saveUserProfile } from '@services/api/database';

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = registerStyles(theme);
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError(null);
    setLoading(true);
    try {
      await register(email, password);
      // Lấy uid từ currentUser
      const uid = require('@react-native-firebase/auth').default().currentUser?.uid;
      if (uid) {
        await saveUserProfile(uid, {
          fullName,
          birthDate,
          gender,
          email,
        });
      }
      navigation.navigate('Login');
    } catch (err: any) {
      setError(err.message || t('common.errors.unknown'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.register')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('auth.full_name')}
        value={fullName}
        onChangeText={setFullName}
        accessibilityLabel={t('auth.full_name')}
      />
      <TextInput
        style={styles.input}
        placeholder={t('auth.birth_date')}
        value={birthDate}
        onChangeText={setBirthDate}
        accessibilityLabel={t('auth.birth_date')}
      />
      <TextInput
        style={styles.input}
        placeholder={t('auth.gender')}
        value={gender}
        onChangeText={setGender}
        accessibilityLabel={t('auth.gender')}
      />
      <TextInput
        style={styles.input}
        placeholder={t('auth.email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel={t('auth.email')}
      />
      <TextInput
        style={styles.input}
        placeholder={t('auth.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessibilityLabel={t('auth.password')}
      />
      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? t('common.loading') : t('auth.register')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.title} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>{t('auth.go_to_login') || 'Go to Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};
