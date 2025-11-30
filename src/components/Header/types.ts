export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showNavButton?: boolean;
  onBackPress?: () => void;
  logoUrl?: string;
  options?: React.ReactNode;
  onOptionsPress?: () => void;
}
