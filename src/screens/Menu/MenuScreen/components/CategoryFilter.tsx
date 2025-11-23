// ============================================
// CategoryFilter Component
// ============================================

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Colors,
  BorderRadius,
  FontSizes,
  FontWeights,
  Spacing,
} from '@styles/theme';
import { useTranslation } from '@hooks/useTranslation';
import { MenuCategory } from '@/types/models';

interface CategoryFilterProps {
  selectedCategory: MenuCategory | null;
  onSelectCategory: (category: MenuCategory | null) => void;
}

const categories = [
  { id: null, key: 'all' },
  { id: MenuCategory.APPETIZER, key: 'appetizer' },
  { id: MenuCategory.MAIN_COURSE, key: 'main_course' },
  { id: MenuCategory.DESSERT, key: 'dessert' },
  { id: MenuCategory.BEVERAGE, key: 'beverage' },
  { id: MenuCategory.SIDE_DISH, key: 'side_dish' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = React.memo(
  ({ selectedCategory, onSelectCategory }) => {
    const { t } = useTranslation();

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {categories.map(category => {
            const isSelected = selectedCategory === category.id;
            const label =
              category.key === 'all'
                ? t('common.all')
                : t(`menu.categories.${category.key}`);

            return (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryChip,
                  isSelected && styles.categoryChipActive,
                ]}
                onPress={() => onSelectCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray[100],
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: Colors.text.secondary,
  },
  categoryTextActive: {
    color: Colors.white,
  },
});
