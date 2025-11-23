// ============================================
// i18n Configuration
// ============================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Import translation files
import en from './locales/en.json';
import vi from './locales/vi.json';

// Get device language
const getDeviceLanguage = (): string => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    const languageCode = locales[0].languageCode;
    // Return 'vi' for Vietnamese, 'en' for English, default to 'en'
    return ['vi', 'en'].includes(languageCode) ? languageCode : 'en';
  }
  return 'en';
};

// Available languages
export const LANGUAGES = {
  en: { name: 'English', flag: '🇬🇧' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
};

// i18n configuration
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: getDeviceLanguage(), // Default language
  fallbackLng: 'vi', // Fallback language
  compatibilityJSON: 'v4', // Use v4 for latest i18next
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false, // Disable suspense for React Native
  },
});

export default i18n;
