// ============================================
// MenuList Component
// ============================================

import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Colors, Spacing } from '@styles/theme';
import { MenuItemCard } from './MenuItemCard';
import { MenuEmptyState } from './MenuEmptyState';
import type { MenuItem } from '@/types/models';

interface MenuListProps {
  items: MenuItem[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onItemPress: (item: MenuItem) => void;
}

export const MenuList: React.FC<MenuListProps> = React.memo(
  ({ items, loading, refreshing, onRefresh, onItemPress }) => {
    const renderItem = ({ item }: { item: MenuItem }) => (
      <MenuItemCard item={item} onPress={onItemPress} />
    );

    const keyExtractor = (item: MenuItem) => item.id;

    if (!loading && items.length === 0) {
      return <MenuEmptyState />;
    }

    return (
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={5}
      />
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
});
