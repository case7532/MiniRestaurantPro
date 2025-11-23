// ============================================
// Route Constants
// ============================================

export const ROUTES = {
  ROOT: {
    AUTH: 'Auth' as const,
    MAIN: 'Main' as const,
  },
  AUTH: {
    LOGIN: 'Login' as const,
    REGISTER: 'Register' as const,
    FORGOT_PASSWORD: 'ForgotPassword' as const,
  },
  MAIN: {
    HOME: 'Home' as const,
    MENU: 'Menu' as const,
    ORDERS: 'Orders' as const,
    SETTINGS: 'Settings' as const,
  },
} as const;
