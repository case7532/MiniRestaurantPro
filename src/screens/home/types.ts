import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabsParamList } from '../MainTabs';

export type HomeScreenProps = {
  navigation: BottomTabNavigationProp<MainTabsParamList, 'HomeTab'>;
};