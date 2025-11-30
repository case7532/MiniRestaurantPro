import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseStorageResult<T> {
  getByKey: (namespace: string, key: string) => Promise<T | null>;
  setByKey: (namespace: string, key: string, value: T) => Promise<void>;
  updateByKey: (namespace: string, key: string, value: Partial<T>) => Promise<void>;
  deleteByKey: (namespace: string, key: string) => Promise<void>;
}

const buildKey = (namespace: string, key: string) => `${namespace}:${key}`;

export const useStorage = <T = any>(): UseStorageResult<T> => {
  const getByKey = useCallback(async (namespace: string, key: string): Promise<T | null> => {
    const raw = await AsyncStorage.getItem(buildKey(namespace, key));
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }, []);

  const setByKey = useCallback(
    async (namespace: string, key: string, value: T): Promise<void> => {
      await AsyncStorage.setItem(buildKey(namespace, key), JSON.stringify(value));
    },
    [],
  );

  const updateByKey = useCallback(
    async (namespace: string, key: string, value: Partial<T>): Promise<void> => {
      const current = await getByKey(namespace, key);
      const next = { ...(current as object), ...(value as object) } as T;
      await setByKey(namespace, key, next);
    },
    [getByKey, setByKey],
  );

  const deleteByKey = useCallback(async (namespace: string, key: string): Promise<void> => {
    await AsyncStorage.removeItem(buildKey(namespace, key));
  }, []);

  return { getByKey, setByKey, updateByKey, deleteByKey };
};
