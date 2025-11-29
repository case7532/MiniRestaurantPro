type SelectionFieldState = 'enabled' | 'pressed' | 'focused' | 'disabled' | 'error';

export interface SelectionFieldProps {
    state: SelectionFieldState;
    disabled?: boolean;
    label: string;
    value?: string;
    loading?: boolean;
    icon?: React.ReactNode;
    onPress: () => void;
};