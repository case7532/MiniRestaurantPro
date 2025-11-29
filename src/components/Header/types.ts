export interface HeaderProps {
    title: string;
    showBackButton?: boolean;
    onBackPress?: () => void;
    logoUrl?: string;
    options?: React.ReactNode;
    onOptionsPress?: () => void;
};