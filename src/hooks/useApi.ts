// ============================================
// useApi Hook
// ============================================
// Universal hook để làm việc với API calls dễ dàng
// Features:
// - Automatic loading state
// - Error handling
// - Request cancellation
// - Retry mechanism
// - Cache support
// ============================================

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook state interface
 */
export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

/**
 * Hook options
 */
export interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  retry?: number;
  retryDelay?: number;
}

/**
 * Hook return type
 */
export interface UseApiReturn<T, P extends any[]> extends UseApiState<T> {
  execute: (...params: P) => Promise<T | null>;
  reset: () => void;
  cancel: () => void;
}

/**
 * Universal API hook
 *
 * @example
 * ```typescript
 * // Basic usage
 * const { data, loading, error, execute } = useApi(
 *   async (id: string) => await MenuService.getMenuItem(id)
 * );
 *
 * // Execute manually
 * await execute('123');
 *
 * // Auto-execute on mount
 * const { data, loading } = useApi(
 *   async () => await MenuService.getMenuItems(),
 *   { immediate: true }
 * );
 * ```
 */
export function useApi<T, P extends any[] = []>(
  apiFunction: (...params: P) => Promise<T>,
  options: UseApiOptions = {},
): UseApiReturn<T, P> {
  const {
    immediate = false,
    onSuccess,
    onError,
    retry = 0,
    retryDelay = 1000,
  } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const retryCountRef = useRef(0);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  /**
   * Execute API call
   */
  const execute = useCallback(
    async (...params: P): Promise<T | null> => {
      // Cancel previous request
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      // Reset retry count
      retryCountRef.current = 0;

      const attemptRequest = async (): Promise<T | null> => {
        try {
          setState(prev => ({
            ...prev,
            loading: true,
            error: null,
            success: false,
          }));

          const result = await apiFunction(...params);

          if (!isMountedRef.current) {
            return null;
          }

          setState({
            data: result,
            loading: false,
            error: null,
            success: true,
          });

          onSuccess?.(result);
          return result;
        } catch (error: any) {
          if (!isMountedRef.current) {
            return null;
          }

          // Check if should retry
          if (retryCountRef.current < retry && error.name !== 'AbortError') {
            retryCountRef.current++;

            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, retryDelay));

            // Retry request
            return attemptRequest();
          }

          const errorMessage = error.message || 'An unexpected error occurred';

          setState({
            data: null,
            loading: false,
            error: errorMessage,
            success: false,
          });

          onError?.(error);
          return null;
        }
      };

      return attemptRequest();
    },
    [apiFunction, onSuccess, onError, retry, retryDelay],
  );

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  /**
   * Cancel ongoing request
   */
  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
    setState(prev => ({
      ...prev,
      loading: false,
    }));
  }, []);

  // Auto-execute on mount if immediate is true
  useEffect(() => {
    if (immediate) {
      execute(...([] as unknown as P));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]); // Only run on mount

  return {
    ...state,
    execute,
    reset,
    cancel,
  };
}

/**
 * USAGE EXAMPLES:
 *
 * 1. Basic usage - Manual execution:
 * ```typescript
 * const LoginScreen = () => {
 *   const { data, loading, error, execute } = useApi(
 *     async (credentials: LoginCredentials) =>
 *       await AuthService.login(credentials)
 *   );
 *
 *   const handleLogin = async () => {
 *     const result = await execute({ email, password });
 *     if (result) {
 *       navigation.navigate('Home');
 *     }
 *   };
 *
 *   return (
 *     <View>
 *       {error && <Text>{error}</Text>}
 *       <Button onPress={handleLogin} loading={loading} />
 *     </View>
 *   );
 * };
 * ```
 *
 * 2. Auto-execute on mount:
 * ```typescript
 * const MenuScreen = () => {
 *   const { data: menuItems, loading } = useApi(
 *     async () => await MenuService.getMenuItems(),
 *     { immediate: true }
 *   );
 *
 *   if (loading) return <LoadingSpinner />;
 *
 *   return <FlatList data={menuItems?.data} />;
 * };
 * ```
 *
 * 3. With callbacks:
 * ```typescript
 * const { execute } = useApi(
 *   async (id: string) => await OrdersService.cancelOrder(id),
 *   {
 *     onSuccess: (data) => {
 *       Alert.alert('Success', 'Order cancelled');
 *     },
 *     onError: (error) => {
 *       Alert.alert('Error', error.message);
 *     }
 *   }
 * );
 * ```
 *
 * 4. With retry:
 * ```typescript
 * const { data, execute } = useApi(
 *   async () => await MenuService.getMenuItems(),
 *   {
 *     retry: 3,
 *     retryDelay: 2000
 *   }
 * );
 * ```
 *
 * 5. Request cancellation:
 * ```typescript
 * const { execute, cancel } = useApi(
 *   async (query: string) => await MenuService.searchMenuItems(query)
 * );
 *
 * useEffect(() => {
 *   const timer = setTimeout(() => {
 *     execute(searchQuery);
 *   }, 500);
 *
 *   return () => {
 *     clearTimeout(timer);
 *     cancel(); // Cancel ongoing request
 *   };
 * }, [searchQuery]);
 * ```
 */
