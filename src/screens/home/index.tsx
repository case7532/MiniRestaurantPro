import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { homeStyles } from './styles';
import type { HomeScreenProps } from './types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@components/Header';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = homeStyles(theme);

  const handleNavigateToSettings = () => {
    navigation.navigate('SettingsTab');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header logoUrl="" title="Home" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToSettings}
        >
          <Text style={styles.buttonText}>{t('navigation.settings')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
