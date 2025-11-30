import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { useTranslation } from '@hooks/useTranslation';
import { menuAdminStyles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigation';
import { icons } from '@assets/icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
export type MenuAdminScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MenuAdmin'
>;

type AdminButton = {
  key: string;
  labelKey: string;
  Icon: React.FC<any> | null;
  navigateTo: keyof RootStackParamList;
};

const BUTTONS: AdminButton[] = [
  {
    key: 'staff',
    labelKey: 'menu_admin.staff',
    Icon: icons.user,
    navigateTo: 'StaffManagement',
  },
  {
    key: 'inventory',
    labelKey: 'menu_admin.inventory',
    Icon: icons.menuBurger,
    navigateTo: 'InventoryManagement',
  },
  {
    key: 'sales',
    labelKey: 'menu_admin.sales',
    Icon: icons.shoppingCart,
    navigateTo: 'SalesManagement',
  },
  {
    key: 'report',
    labelKey: 'menu_admin.report',
    Icon: icons.settings,
    navigateTo: 'ReportScreen',
  },
  {
    key: 'settings',
    labelKey: 'menu_admin.settings',
    Icon: icons.settings,
    navigateTo: 'SettingsScreen',
  },
];

export const MenuAdminScreen: React.FC<MenuAdminScreenProps> = ({
  navigation,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = menuAdminStyles(theme);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={t('menu_admin.sales')}
        showBackButton={false}
        showNavButton={false}
      />
      <View style={styles.container}>
        <View style={styles.grid}>
          {BUTTONS.map(btn => (
            <TouchableOpacity
              key={btn.key}
              style={styles.button}
              onPress={() => navigation.navigate(btn.navigateTo)}
              accessibilityRole="button"
              accessibilityLabel={t(btn.labelKey)}
            >
              {btn.Icon ? (
                <btn.Icon width={48} height={48} fill={theme.colors.primary} />
              ) : null}
              <Text style={styles.label}>{t(btn.labelKey)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
