import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { headerStyles } from './styles';
import { useTheme } from '@/hooks/useTheme';
import { HeaderProps } from './types';
import { icons } from '@assets/icon';

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  logoUrl,
  options,
  onOptionsPress,
}) => {
  const theme = useTheme().theme;
  const styles = headerStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} disabled={!showBackButton}>
        {showBackButton && (
          <icons.arrowLeft width={24} height={24} color={theme.colors.text} />
        )}
      </TouchableOpacity>
      {logoUrl && logoUrl.trim().length > 0 ? (
        <Image source={{ uri: logoUrl }} style={styles.logo} />
      ) : (
        <icons.caretUp width={50} height={50} color={theme.colors.text} />
      )}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onOptionsPress} disabled={!options}>
        {options}
      </TouchableOpacity>
    </View>
  );
};
