import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { headerStyles } from './styles';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { HeaderProps } from './types';
import { icons } from '@assets/icon';

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showNavButton = false,
  onBackPress,
  logoUrl,
  options,
  onOptionsPress,
}) => {
  const theme = useTheme().theme;
  const { t } = useTranslation();
  const styles = headerStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} disabled={!showBackButton}>
        {showBackButton && (
          <View style={styles.backButton}>
            <icons.arrowSmallLeft color={theme.colors.text} />
          </View>
        )}
      </TouchableOpacity>
      {logoUrl && logoUrl.trim().length > 0 ? (
        <Image source={{ uri: logoUrl }} style={styles.logo} />
      ) : (
        <icons.caretUp width={50} height={50} color={theme.colors.text} />
      )}
      <Text style={styles.title}>{t(title)}</Text>
      {showNavButton && options ? (
        <TouchableOpacity onPress={onOptionsPress}>{options}</TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};
