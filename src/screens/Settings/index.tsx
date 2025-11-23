import {
  ScrollView,
  Switch,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import React, { useEffect, useState } from 'react';
//Hooks
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '@navigation';
// ============================================
// Settings Screen
// ============================================

export const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { navigate } = useNavigation<LoginScreenNavigationProp>();
  const [currentLng, setCurrentLng] = useState('en');
  useEffect(() => {
    console.log('Language changed to:', currentLng);
  }, [currentLng]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>{t('settings.title')}</Text>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.settingOption}>
            <Text style={styles.settingText}>
              {t('settings.change_language')}
            </Text>
            <Switch
              value={currentLng === 'en'}
              onValueChange={() => {
                const newLng = currentLng === 'en' ? 'vi' : 'en';
                setCurrentLng(newLng);
              }}
            />
          </View>
          <Button
            title={t('settings.change_language')}
            onPress={() => {
              logout().then(() => {
                console.log('User logged out');
                navigate('Login');
              });
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
