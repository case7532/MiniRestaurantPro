// ============================================
// MenuScreen - Main Container
// ============================================
// Screen hiển thị danh sách menu items với:
// - Search functionality
// - Category filtering
// - Pull to refresh
// - Loading states
// ============================================

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors } from '@styles/theme';
import { useMenu } from '@hooks/useMenu';
import { useTranslation } from '@hooks/useTranslation';
import type { MenuItem, MenuCategory } from '@/types/models';
import { styles } from './styles';
import {
  MenuHeader,
  MenuSearchBar,
  CategoryFilter,
  MenuList,
} from './components';

export const MenuScreen: React.FC = () => {
  const { t } = useTranslation();

  const {
    filteredItems,
    loading,
    error,
    selectedCategory,
    searchQuery,
    fetchItems,
    filterByCategory,
    searchItems,
  } = useMenu();

  const [refreshing, setRefreshing] = useState(false);

  // Fetch menu items on mount
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchItems();
    } finally {
      setRefreshing(false);
    }
  }, [fetchItems]);

  // Handle search
  const handleSearch = useCallback(
    (query: string) => {
      searchItems(query);
    },
    [searchItems],
  );

  // Handle clear search
  const handleClearSearch = useCallback(() => {
    searchItems('');
  }, [searchItems]);

  // Handle category selection
  const handleCategorySelect = useCallback(
    (category: MenuCategory | null) => {
      filterByCategory(category);
    },
    [filterByCategory],
  );

  // Handle item press
  const handleItemPress = useCallback((item: MenuItem) => {
    // TODO: Navigate to menu detail screen
    // navigation.navigate('MenuDetail', { itemId: item.id });
    console.log('Item pressed:', item.name);
  }, []);

  // Handle retry after error
  const handleRetry = useCallback(() => {
    fetchItems();
  }, [fetchItems]);

  // Loading state
  if (loading && filteredItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <MenuHeader />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error && filteredItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <MenuHeader />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>{t('common.retry')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MenuHeader />

      <MenuSearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={handleClearSearch}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      <MenuList
        items={filteredItems}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onItemPress={handleItemPress}
      />
    </SafeAreaView>
  );
};
