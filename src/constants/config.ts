// ============================================
// App Configuration
// ============================================

export const Config = {
  // API Configuration
  API_URL: __DEV__ 
    ? 'http://localhost:3000/api' 
    : 'https://api.minirestaurantpro.com',
  
  API_TIMEOUT: 10000,
  
  // App Information
  APP_NAME: 'MiniRestaurantPro',
  APP_VERSION: '0.0.1',
  
  // Feature Flags
  ENABLE_ANALYTICS: !__DEV__,
  ENABLE_CRASH_REPORTING: !__DEV__,
  
  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: '@auth_token',
    REFRESH_TOKEN: '@refresh_token',
    USER_DATA: '@user_data',
    THEME: '@theme',
    LANGUAGE: '@language',
  },
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  
  // Cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Menu
  MENU_LIST: '/menu',
  MENU_ITEM: '/menu/:id',
  MENU_CATEGORIES: '/menu/categories',
  
  // Orders
  ORDERS_LIST: '/orders',
  ORDER_DETAIL: '/orders/:id',
  CREATE_ORDER: '/orders',
  UPDATE_ORDER: '/orders/:id',
  
  // User
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
};

export default Config;
