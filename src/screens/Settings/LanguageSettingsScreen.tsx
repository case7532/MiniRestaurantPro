// ============================================
// Example Screen: Language Settings
// ============================================

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useTranslation } from '@hooks/useTranslation';
import { Colors, Spacing, BorderRadius, FontSizes } from '@styles/theme';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

export const LanguageSettingsScreen: React.FC = () => {
  const { t, changeLanguage, getCurrentLanguage, getAvailableLanguages, getLanguageInfo } = useTranslation();
  
  const currentLang = getCurrentLanguage();
  
  const languages: LanguageOption[] = getAvailableLanguages().map(code => ({
    code,
    ...getLanguageInfo(code),
  }));

  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode);
  };

  const renderLanguageItem = ({ item }: { item: LanguageOption }) => {
    const isSelected = currentLang === item.code;
    
    return (
      <TouchableOpacity
        style={[styles.languageItem, isSelected && styles.selectedLanguage]}
        onPress={() => handleLanguageChange(item.code)}
      >
        <Text style={styles.flag}>{item.flag}</Text>
        <Text style={[styles.languageName, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
        {isSelected && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.change_language')}</Text>
      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  listContainer: {
    gap: Spacing.md,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  selectedLanguage: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + '20',
  },
  flag: {
    fontSize: FontSizes.xxl,
    marginRight: Spacing.md,
  },
  languageName: {
    flex: 1,
    fontSize: FontSizes.lg,
    color: Colors.text.primary,
  },
  selectedText: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  checkmark: {
    fontSize: FontSizes.xl,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
