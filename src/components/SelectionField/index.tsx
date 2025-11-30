import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { SelectionFieldStyles } from './styles';
import { useTheme } from '@/hooks/useTheme';
import { SelectionFieldProps } from './types';

const SelectionField: React.FC<SelectionFieldProps> = props => {
  const theme = useTheme().theme;
  const styles = SelectionFieldStyles(theme);

  const getStyleByState = () => {
    switch (props.state) {
      case 'enabled':
        return styles.enabled;
      case 'pressed':
        return styles.pressed;
      case 'focused':
        return styles.focused;
      case 'disabled':
        return styles.disabled;
      case 'error':
        return styles.error;
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={getStyleByState()}>
        <Text style={styles.value}>{props.value}</Text>
        {props.icon}
      </View>
    </View>
  );
};
export default memo(SelectionField);
