# 🌐 RESTful API System - Documentation

## 📋 Tổng quan

Hệ thống API service được xây dựng với kiến trúc modular, type-safe và dễ sử dụng. Thiết kế tập trung vào:

- **Dễ sử dụng**: API rõ ràng, trực quan
- **Type-safe**: Full TypeScript support
- **Linh hoạt**: Dễ dàng tuỳ biến và mở rộng
- **Robust**: Error handling, retry, cancellation
- **Developer-friendly**: Logging, debugging support

---

## 🏗️ Kiến trúc

```
┌─────────────────────────────────────────────┐
│         React Components/Screens            │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│            Custom Hooks (useApi)            │
│          Quản lý state & side effects       │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│         API Services (Auth, Menu, etc)      │
│         Business logic & data mapping        │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│              API Client Core                │
│    Interceptors, Error handling, Auth       │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│           HTTP Client (Axios)               │
│          Network communication              │
└─────────────────────────────────────────────┘
```

---

## 📁 Cấu trúc Files

```
src/
├── services/
│   ├── api/
│   │   ├── client.ts       # API Client core
│   │   ├── auth.ts         # Authentication service
│   │   ├── menu.ts         # Menu service
│   │   ├── orders.ts       # Orders service
│   │   └── index.ts        # Barrel export
│   └── storage/
│       └── asyncStorage.ts # Storage service
├── hooks/
│   └── useApi.ts           # Universal API hook
├── types/
│   ├── models.ts           # Data models
│   └── api.ts              # API types
└── constants/
    └── config.ts           # API configuration
```

---

## 🔧 Core Components

### 1. API Client (`client.ts`)

**Features:**
- ✅ Automatic token management
- ✅ Request/Response interceptors
- ✅ Automatic token refresh
- ✅ Error normalization
- ✅ Request cancellation
- ✅ File upload support
- ✅ Custom headers
- ✅ Development logging

**Basic Usage:**

```typescript
import { apiClient } from '@services/api';

// GET request
const users = await apiClient.get<User[]>('/users');

// POST request
const newUser = await apiClient.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// PUT request
const updated = await apiClient.put<User>('/users/123', data);

// DELETE request
await apiClient.delete('/users/123');
```

**Advanced Features:**

```typescript
// Skip authentication
const data = await apiClient.get('/public-endpoint', {
  skipAuth: true
});

// Custom headers
const data = await apiClient.post('/endpoint', data, {
  customHeaders: {
    'X-Custom-Header': 'value'
  }
});

// File upload với progress
const formData = new FormData();
formData.append('file', file);

const result = await apiClient.upload('/upload', formData, (progress) => {
  console.log(`Uploading: ${progress}%`);
});

// Request cancellation
const controller = apiClient.createCancelToken();
apiClient.get('/users', { signal: controller.signal });
// Cancel: controller.abort();
```

---

### 2. Authentication Service (`auth.ts`)

**Features:**
- Login/Register/Logout
- Token management (auto refresh)
- Password reset flow
- Email verification
- Profile management

**Usage:**

```typescript
import { AuthService } from '@services/api';

// Login
const { user, token } = await AuthService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Register
const response = await AuthService.register({
  email: 'new@example.com',
  password: 'password123',
  name: 'John Doe',
  phone: '+1234567890'
});

// Check authentication
const isAuth = await AuthService.isAuthenticated();
const user = await AuthService.getCurrentUser();

// Password reset
await AuthService.requestPasswordReset('user@example.com');
await AuthService.resetPassword(token, 'newPassword123');

// Logout
await AuthService.logout();
```

---

### 3. Menu Service (`menu.ts`)

**Features:**
- CRUD operations
- Category management
- Search & filters
- Image upload
- Bulk operations

**Usage:**

```typescript
import { MenuService } from '@services/api';

// Get menu items với pagination
const result = await MenuService.getMenuItems({
  page: 1,
  pageSize: 20,
  category: 'main_course',
  available: true,
  search: 'pasta'
});

// Create item
const newItem = await MenuService.createMenuItem({
  name: 'Spaghetti Carbonara',
  description: 'Classic Italian pasta',
  price: 14.99,
  category: 'main_course',
  preparationTime: 20,
  ingredients: ['pasta', 'bacon', 'eggs', 'parmesan']
});

// Update item
const updated = await MenuService.updateMenuItem(itemId, {
  price: 15.99,
  available: true
});

// Upload image
const imageResult = await MenuService.uploadImage(
  imageFile,
  (progress) => console.log(`Upload: ${progress}%`)
);

// Search
const results = await MenuService.searchMenuItems('pizza');

// Get by category
const appetizers = await MenuService.getItemsByCategory('appetizer');

// Bulk operations
await MenuService.bulkDelete(['id1', 'id2', 'id3']);
```

---

### 4. Orders Service (`orders.ts`)

**Features:**
- CRUD operations
- Status management
- Order history
- Statistics
- Order items management

**Usage:**

```typescript
import { OrdersService } from '@services/api';

// Create order
const order = await OrdersService.createOrder({
  items: [
    { menuItemId: '123', quantity: 2, notes: 'No onions' },
    { menuItemId: '456', quantity: 1 }
  ],
  tableNumber: 'T5',
  notes: 'Customer allergic to peanuts'
});

// Get orders với filters
const orders = await OrdersService.getOrders({
  page: 1,
  status: 'pending',
  dateFrom: '2025-01-01',
  dateTo: '2025-01-31'
});

// Update status
await OrdersService.confirmOrder(orderId);
await OrdersService.startPreparing(orderId);
await OrdersService.markAsReady(orderId);
await OrdersService.completeOrder(orderId);

// Get active orders
const activeOrders = await OrdersService.getActiveOrders();

// Get statistics
const stats = await OrdersService.getOrderStats(
  '2025-01-01',
  '2025-01-31'
);
console.log('Total revenue:', stats.totalRevenue);

// Manage items
await OrdersService.addOrderItem(orderId, {
  menuItemId: '789',
  quantity: 1
});

await OrdersService.updateOrderItemQuantity(orderId, itemId, 3);
await OrdersService.removeOrderItem(orderId, itemId);
```

---

### 5. Custom Hook - useApi (`useApi.ts`)

**Features:**
- Automatic loading state
- Error handling
- Request cancellation
- Retry mechanism
- Success/Error callbacks

**Basic Usage:**

```typescript
import { useApi } from '@hooks/useApi';
import { MenuService } from '@services/api';

// Manual execution
const LoginScreen = () => {
  const { data, loading, error, execute } = useApi(
    async (credentials: LoginCredentials) => 
      await AuthService.login(credentials)
  );

  const handleLogin = async () => {
    const result = await execute({ email, password });
    if (result) {
      navigation.navigate('Home');
    }
  };

  return (
    <View>
      {error && <Text style={styles.error}>{error}</Text>}
      <Button onPress={handleLogin} loading={loading} />
    </View>
  );
};
```

**Auto-execute on mount:**

```typescript
const MenuScreen = () => {
  const { data: menuItems, loading, error } = useApi(
    async () => await MenuService.getMenuItems(),
    { immediate: true }
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return <FlatList data={menuItems?.data} />;
};
```

**With callbacks:**

```typescript
const { execute } = useApi(
  async (id: string) => await OrdersService.cancelOrder(id),
  {
    onSuccess: (data) => {
      Alert.alert('Success', 'Order cancelled successfully');
      navigation.goBack();
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    }
  }
);
```

**With retry:**

```typescript
const { data, execute } = useApi(
  async () => await MenuService.getMenuItems(),
  { 
    retry: 3,
    retryDelay: 2000 
  }
);
```

**Request cancellation:**

```typescript
const SearchScreen = () => {
  const { data, execute, cancel } = useApi(
    async (query: string) => await MenuService.searchMenuItems(query)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      execute(searchQuery);
    }, 500); // Debounce
    
    return () => {
      clearTimeout(timer);
      cancel(); // Cancel ongoing request
    };
  }, [searchQuery]);

  return <SearchResults data={data} />;
};
```

---

## 🎯 Best Practices

### 1. Error Handling

```typescript
// ✅ Good: Handle errors properly
const handleCreateOrder = async () => {
  try {
    const order = await OrdersService.createOrder(orderData);
    Alert.alert('Success', 'Order created');
    navigation.navigate('OrderDetail', { orderId: order.id });
  } catch (error: any) {
    Alert.alert('Error', error.message);
  }
};

// ✅ Better: Use useApi hook
const { execute, loading, error } = useApi(
  async (data) => await OrdersService.createOrder(data),
  {
    onSuccess: (order) => {
      Alert.alert('Success', 'Order created');
      navigation.navigate('OrderDetail', { orderId: order.id });
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    }
  }
);
```

### 2. Loading States

```typescript
// ✅ Show loading indicator
const MenuScreen = () => {
  const { data, loading, error, execute } = useApi(
    async () => await MenuService.getMenuItems(),
    { immediate: true }
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Button title="Retry" onPress={execute} />
      </View>
    );
  }

  return <FlatList data={data?.data} />;
};
```

### 3. Type Safety

```typescript
// ✅ Always use types
interface CreateOrderParams {
  items: OrderItem[];
  tableNumber?: string;
  notes?: string;
}

const { execute } = useApi<Order, [CreateOrderParams]>(
  async (params) => await OrdersService.createOrder(params)
);

// Execute with type-safe params
await execute({
  items: [{ menuItemId: '123', quantity: 2 }],
  tableNumber: 'T5'
});
```

### 4. Request Cancellation

```typescript
// ✅ Cancel requests on unmount
useEffect(() => {
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      const data = await apiClient.get('/endpoint', {
        signal: controller.signal
      });
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    }
  };

  fetchData();

  return () => {
    controller.abort();
  };
}, []);
```

### 5. Caching Strategies

```typescript
// Simple cache implementation
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCachedData = async <T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> => {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  
  return data;
};

// Usage
const data = await getCachedData(
  'menu-items',
  () => MenuService.getMenuItems()
);
```

---

## 🚀 Quick Start Examples

### Complete Login Flow

```typescript
import { useApi } from '@hooks/useApi';
import { AuthService } from '@services/api';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, execute } = useApi(
    async (credentials: LoginCredentials) => 
      await AuthService.login(credentials),
    {
      onSuccess: (response) => {
        // Token automatically saved by AuthService
        navigation.replace('Main');
      }
    }
  );

  const handleLogin = () => {
    execute({ email, password });
  };

  return (
    <View style={styles.container}>
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        title="Login"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
      />
    </View>
  );
};
```

### Menu List với Pagination

```typescript
const MenuListScreen = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<MenuCategory | null>(null);

  const { data, loading, error, execute } = useApi(
    async (params: MenuListParams) => 
      await MenuService.getMenuItems(params),
    { immediate: true }
  );

  useEffect(() => {
    execute({ page, pageSize: 20, category });
  }, [page, category]);

  const renderItem = ({ item }: { item: MenuItem }) => (
    <MenuItemCard item={item} />
  );

  return (
    <View style={styles.container}>
      <CategoryFilter
        selected={category}
        onSelect={setCategory}
      />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      <FlatList
        data={data?.data || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={() => {
          if (data?.pagination.page < data?.pagination.totalPages) {
            setPage(page + 1);
          }
        }}
      />
    </View>
  );
};
```

### Create Order Flow

```typescript
const CreateOrderScreen = () => {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [tableNumber, setTableNumber] = useState('');

  const { loading, execute } = useApi(
    async (data: CreateOrderData) => 
      await OrdersService.createOrder(data),
    {
      onSuccess: (order) => {
        Alert.alert('Success', `Order #${order.orderNumber} created`);
        navigation.navigate('OrderDetail', { orderId: order.id });
      },
      onError: (error) => {
        Alert.alert('Error', error.message);
      }
    }
  );

  const handleCreateOrder = () => {
    execute({
      items: selectedItems,
      tableNumber,
    });
  };

  return (
    <View style={styles.container}>
      <ItemSelector
        selected={selectedItems}
        onChange={setSelectedItems}
      />
      <Input
        value={tableNumber}
        onChangeText={setTableNumber}
        placeholder="Table Number"
      />
      <Button
        title="Create Order"
        onPress={handleCreateOrder}
        loading={loading}
        disabled={loading || selectedItems.length === 0}
      />
    </View>
  );
};
```

---

## 🔌 Mở rộng & Tuỳ biến

### Thêm Service mới

```typescript
// src/services/api/customers.ts
import { apiClient } from './client';
import type { Customer } from '@/types/models';

export class CustomersService {
  static async getCustomers(): Promise<Customer[]> {
    return await apiClient.get<Customer[]>('/customers');
  }

  static async getCustomer(id: string): Promise<Customer> {
    return await apiClient.get<Customer>(`/customers/${id}`);
  }

  static async createCustomer(data: CreateCustomerData): Promise<Customer> {
    return await apiClient.post<Customer>('/customers', data);
  }
}

// Export in index.ts
export { CustomersService } from './customers';
```

### Custom API Client Instance

```typescript
import { ApiClient } from '@services/api';

// Create custom instance cho external API
const externalApi = new ApiClient({
  baseURL: 'https://external-api.com',
  timeout: 15000,
  headers: {
    'X-Api-Key': 'your-api-key'
  }
});

export default externalApi.getAxiosInstance();
```

### Custom Hook cho specific use case

```typescript
// hooks/useMenuItems.ts
import { useApi } from './useApi';
import { MenuService } from '@services/api';

export const useMenuItems = (category?: MenuCategory) => {
  return useApi(
    async () => await MenuService.getMenuItems({ category }),
    { 
      immediate: true,
      retry: 2 
    }
  );
};

// Usage
const { data, loading } = useMenuItems('main_course');
```

---

## 📚 Tài liệu tham khảo

- [Axios Documentation](https://axios-http.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks](https://react.dev/reference/react)
- [REST API Best Practices](https://restfulapi.net/)

---

**Được tạo**: November 23, 2025  
**Version**: 1.0.0  
**Author**: MiniRestaurantPro Team
