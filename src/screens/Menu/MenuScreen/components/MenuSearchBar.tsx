// ============================================
// MenuSearchBar Component
// ============================================

import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, BorderRadius, FontSizes, Spacing } from '@styles/theme';
import { useTranslation } from '@hooks/useTranslation';

interface MenuSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const MenuSearchBar: React.FC<MenuSearchBarProps> = React.memo(({ 
  value, 
  onChangeText,
  onClear,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('menu.search_placeholder')}
          placeholderTextColor={Colors.text.disabled}
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: FontSizes.md,
    color: Colors.text.primary,
  },
  clearButton: {
    padding: Spacing.xs,
  },
  clearText: {
    fontSize: FontSizes.lg,
    color: Colors.text.secondary,
  },
});
