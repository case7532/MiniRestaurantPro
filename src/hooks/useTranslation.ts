// ============================================
// Custom Hook: useTranslation
// Re-export from react-i18next with additional utilities
// ============================================

import { useTranslation as useI18nTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      // You can add AsyncStorage persistence here
      // await AsyncStorage.setItem(Config.STORAGE_KEYS.LANGUAGE, language);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const getCurrentLanguage = () => i18n.language;

  const getAvailableLanguages = () => Object.keys(LANGUAGES);

  const getLanguageInfo = (code: string) => LANGUAGES[code as keyof typeof LANGUAGES];

  return {
    t,
    i18n,
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
    getLanguageInfo,
  };
};

/**
 * Usage example:
 * 
 * ```tsx
 * import { useTranslation } from '@hooks/useTranslation';
 * 
 * const MyComponent = () => {
 *   const { t, changeLanguage, getCurrentLanguage } = useTranslation();
 *   
 *   return (
 *     <View>
 *       <Text>{t('common.welcome')}</Text>
 *       <Button 
 *         title={t('auth.login')} 
 *         onPress={() => {}} 
 *       />
 *       <Button 
 *         title="Switch to Vietnamese" 
 *         onPress={() => changeLanguage('vi')} 
 *       />
 *     </View>
 *   );
 * };
 * ```
 */
