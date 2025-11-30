import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { useAuth } from '@hooks/useAuth';
import { settingStyles } from './styles';
import type { SettingScreenProps } from './types';
import SelectionField from '@components/SelectionField';
import { icons } from '@/assets/icon';

export const SettingScreen: React.FC<SettingScreenProps> = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { logout } = useAuth();
  const styles = settingStyles(theme);
  const items = ['Abc', 'Def', 'Ghi'];
  const handleLogout = async () => {
    try {
      await logout();
      // Navigation will happen automatically via AuthContext
    } catch (error) {
      console.error('Logout failed:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <SelectionField
          key={index}
          label={t('settings.profile')}
          state="enabled"
          value={item}
          disabled={false}
          icon={<icons.caretDown width={20} height={20} />}
          onPress={() => {}}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>{t('auth.logout')}</Text>
      </TouchableOpacity>
    </View>
  );
};
