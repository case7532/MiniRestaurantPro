import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { inventoryStyles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigation';
import { Header } from '@components/Header';

type Props = NativeStackScreenProps<RootStackParamList, 'InventoryManagement'>;

export const InventoryManagementScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = inventoryStyles(theme);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={t('menu_admin.inventory')}
        showBackButton = {true}
        showNavButton={false}
        onBackPress={() => navigation.navigate('MenuAdmin')}
      />
      <View style={styles.container}>
        
      </View>
    </SafeAreaView>
  );
}
