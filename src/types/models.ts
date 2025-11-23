// ============================================
// Global Type Definitions
// ============================================

// ============================================
// User & Authentication
// ============================================
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  CUSTOMER = 'customer',
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// ============================================
// Menu Items
// ============================================
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image?: string;
  available: boolean;
  preparationTime?: number; // in minutes
  ingredients?: string[];
  allergens?: string[];
  createdAt: string;
  updatedAt: string;
}

export enum MenuCategory {
  APPETIZER = 'appetizer',
  MAIN_COURSE = 'main_course',
  DESSERT = 'dessert',
  BEVERAGE = 'beverage',
  SIDE_DISH = 'side_dish',
}

export interface MenuCategoryInfo {
  id: MenuCategory;
  name: string;
  icon: string;
  description: string;
}

// ============================================
// Orders
// ============================================
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer?: User;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  notes?: string;
  tableNumber?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItem?: MenuItem;
  quantity: number;
  price: number;
  notes?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface CreateOrderData {
  items: Array<{
    menuItemId: string;
    quantity: number;
    notes?: string;
  }>;
  tableNumber?: string;
  notes?: string;
}

// ============================================
// API Response Types
// ============================================
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Form Types
// ============================================
export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

export interface LoginFormData {
  email: FormField;
  password: FormField;
}

export interface MenuItemFormData {
  name: FormField;
  description: FormField;
  price: FormField;
  category: FormField;
  image?: FormField;
}

// ============================================
// Navigation Types
// ============================================
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Menu: undefined;
  MenuDetail: { itemId: string };
  Orders: undefined;
  OrderDetail: { orderId: string };
  CreateOrder: undefined;
  Settings: undefined;
  Profile: undefined;
};

// ============================================
// State Types
// ============================================
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface MenuState {
  items: MenuItem[];
  categories: MenuCategoryInfo[];
  selectedCategory: MenuCategory | null;
  loading: boolean;
  error: string | null;
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

// ============================================
// Utility Types
// ============================================
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T = void> = () => Promise<T>;
export type VoidFunction = () => void;

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface SelectOption {
  label: string;
  value: string | number;
}
