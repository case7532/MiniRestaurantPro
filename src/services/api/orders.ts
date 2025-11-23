// ============================================
// Orders Service
// ============================================
// Service để quản lý orders với:
// - CRUD operations
// - Order status management
// - Order history
// - Real-time updates (webhook ready)
// ============================================

import { apiClient } from './client';
import { API_ENDPOINTS } from '@constants/config';
import type {
  Order,
  OrderStatus,
  PaginatedResponse,
  CreateOrderData,
} from '@/types/models';
import type { OrderListParams, UpdateOrderStatusData } from '@/types/api';

/**
 * Orders Service
 */
export class OrdersService {
  // ============================================
  // Orders CRUD
  // ============================================

  /**
   * Get all orders với pagination và filters
   */
  static async getOrders(
    params?: OrderListParams,
  ): Promise<PaginatedResponse<Order>> {
    try {
      const response = await apiClient.get<PaginatedResponse<Order>>(
        API_ENDPOINTS.ORDERS_LIST,
        { params },
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get single order by ID
   */
  static async getOrder(id: string): Promise<Order> {
    try {
      const url = API_ENDPOINTS.ORDER_DETAIL.replace(':id', id);
      const response = await apiClient.get<Order>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new order
   */
  static async createOrder(data: CreateOrderData): Promise<Order> {
    try {
      const response = await apiClient.post<Order>(
        API_ENDPOINTS.CREATE_ORDER,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update order (general update)
   */
  static async updateOrder(
    id: string,
    data: Partial<CreateOrderData>,
  ): Promise<Order> {
    try {
      const url = API_ENDPOINTS.UPDATE_ORDER.replace(':id', id);
      const response = await apiClient.put<Order>(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cancel order
   */
  static async cancelOrder(id: string, reason?: string): Promise<Order> {
    try {
      const url = API_ENDPOINTS.UPDATE_ORDER.replace(':id', id);
      const response = await apiClient.patch<Order>(`${url}/cancel`, {
        reason,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // ============================================
  // Order Status Management
  // ============================================

  /**
   * Update order status
   */
  static async updateOrderStatus(
    id: string,
    data: UpdateOrderStatusData,
  ): Promise<Order> {
    try {
      const url = API_ENDPOINTS.UPDATE_ORDER.replace(':id', id);
      const response = await apiClient.patch<Order>(`${url}/status`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mark order as confirmed
   */
  static async confirmOrder(id: string): Promise<Order> {
    return this.updateOrderStatus(id, { status: 'confirmed' });
  }

  /**
   * Mark order as preparing
   */
  static async startPreparing(id: string): Promise<Order> {
    return this.updateOrderStatus(id, { status: 'preparing' });
  }

  /**
   * Mark order as ready
   */
  static async markAsReady(id: string): Promise<Order> {
    return this.updateOrderStatus(id, { status: 'ready' });
  }

  /**
   * Mark order as delivered
   */
  static async markAsDelivered(id: string): Promise<Order> {
    return this.updateOrderStatus(id, { status: 'delivered' });
  }

  /**
   * Mark order as completed
   */
  static async completeOrder(id: string): Promise<Order> {
    return this.updateOrderStatus(id, { status: 'completed' });
  }

  // ============================================
  // Order Queries & Filters
  // ============================================

  /**
   * Get orders by status
   */
  static async getOrdersByStatus(
    status: OrderStatus,
    params?: Omit<OrderListParams, 'status'>,
  ): Promise<PaginatedResponse<Order>> {
    try {
      const response = await apiClient.get<PaginatedResponse<Order>>(
        API_ENDPOINTS.ORDERS_LIST,
        { params: { ...params, status } },
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get pending orders
   */
  static async getPendingOrders(
    params?: Omit<OrderListParams, 'status'>,
  ): Promise<PaginatedResponse<Order>> {
    return this.getOrdersByStatus('pending', params);
  }

  /**
   * Get active orders (confirmed, preparing, ready)
   */
  static async getActiveOrders(
    params?: OrderListParams,
  ): Promise<PaginatedResponse<Order>> {
    try {
      const response = await apiClient.get<PaginatedResponse<Order>>(
        `${API_ENDPOINTS.ORDERS_LIST}/active`,
        { params },
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get order history (completed/cancelled)
   */
  static async getOrderHistory(
    params?: OrderListParams,
  ): Promise<PaginatedResponse<Order>> {
    try {
      const response = await apiClient.get<PaginatedResponse<Order>>(
        `${API_ENDPOINTS.ORDERS_LIST}/history`,
        { params },
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get customer orders
   */
  static async getCustomerOrders(
    customerId: string,
    params?: Omit<OrderListParams, 'customerId'>,
  ): Promise<PaginatedResponse<Order>> {
    return this.getOrders({ ...params, customerId });
  }

  /**
   * Get today's orders
   */
  static async getTodayOrders(
    params?: OrderListParams,
  ): Promise<PaginatedResponse<Order>> {
    const today = new Date().toISOString().split('T')[0];
    return this.getOrders({
      ...params,
      dateFrom: today,
      dateTo: today,
    });
  }

  // ============================================
  // Order Statistics
  // ============================================

  /**
   * Get order statistics
   */
  static async getOrderStats(
    dateFrom?: string,
    dateTo?: string,
  ): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    preparing: number;
    ready: number;
    delivered: number;
    completed: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.ORDERS_LIST}/stats`,
        {
          params: { dateFrom, dateTo },
        },
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // ============================================
  // Order Items Management
  // ============================================

  /**
   * Add item to order
   */
  static async addOrderItem(
    orderId: string,
    item: { menuItemId: string; quantity: number; notes?: string },
  ): Promise<Order> {
    try {
      const url = API_ENDPOINTS.UPDATE_ORDER.replace(':id', orderId);
      const response = await apiClient.post<Order>(`${url}/items`, item);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove item from order
   */
  static async removeOrderItem(
    orderId: string,
    itemId: string,
  ): Promise<Order> {
    try {
      const url = API_ENDPOINTS.UPDATE_ORDER.replace(':id', orderId);
      const response = await apiClient.delete<Order>(`${url}/items/${itemId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update order item quantity
   */
  static async updateOrderItemQuantity(
    orderId: string,
    itemId: string,
    quantity: number,
  ): Promise<Order> {
    try {
      const url = API_ENDPOINTS.UPDATE_ORDER.replace(':id', orderId);
      const response = await apiClient.patch<Order>(`${url}/items/${itemId}`, {
        quantity,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * USAGE EXAMPLES:
 *
 * 1. Create new order:
 * ```typescript
 * const order = await OrdersService.createOrder({
 *   items: [
 *     { menuItemId: '123', quantity: 2, notes: 'No onions' },
 *     { menuItemId: '456', quantity: 1 }
 *   ],
 *   tableNumber: 'T5',
 *   notes: 'Customer allergic to peanuts'
 * });
 * ```
 *
 * 2. Get orders with filters:
 * ```typescript
 * const orders = await OrdersService.getOrders({
 *   page: 1,
 *   pageSize: 20,
 *   status: 'pending',
 *   dateFrom: '2025-01-01',
 *   dateTo: '2025-01-31'
 * });
 * ```
 *
 * 3. Update order status:
 * ```typescript
 * // Confirm order
 * await OrdersService.confirmOrder(orderId);
 *
 * // Start preparing
 * await OrdersService.startPreparing(orderId);
 *
 * // Mark as ready
 * await OrdersService.markAsReady(orderId);
 *
 * // Complete order
 * await OrdersService.completeOrder(orderId);
 * ```
 *
 * 4. Get active orders:
 * ```typescript
 * const activeOrders = await OrdersService.getActiveOrders();
 * ```
 *
 * 5. Get order statistics:
 * ```typescript
 * const stats = await OrdersService.getOrderStats(
 *   '2025-01-01',
 *   '2025-01-31'
 * );
 * console.log('Total revenue:', stats.totalRevenue);
 * console.log('Completed orders:', stats.completed);
 * ```
 *
 * 6. Manage order items:
 * ```typescript
 * // Add item
 * await OrdersService.addOrderItem(orderId, {
 *   menuItemId: '789',
 *   quantity: 1,
 *   notes: 'Extra spicy'
 * });
 *
 * // Update quantity
 * await OrdersService.updateOrderItemQuantity(orderId, itemId, 3);
 *
 * // Remove item
 * await OrdersService.removeOrderItem(orderId, itemId);
 * ```
 */
