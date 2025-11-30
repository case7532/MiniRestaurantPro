import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { salesStyles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigation';
import { Header } from '@components/Header';

type Props = NativeStackScreenProps<RootStackParamList, 'SalesManagement'>;

export const SalesManagementScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = salesStyles(theme);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={t('menu_admin.sales')}
        showBackButton = {true}
        showNavButton={false}
        onBackPress={() => navigation.navigate('MenuAdmin')}
      />
      <View style={styles.container}>
        
      </View>
    </SafeAreaView>
  );
};
