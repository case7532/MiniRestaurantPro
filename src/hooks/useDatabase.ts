import { useCallback } from 'react';
import database from '@react-native-firebase/database';

interface UseDatabaseResult<T> {
  getByKey: (path: string, key: string) => Promise<T | null>;
  setByKey: (path: string, key: string, value: T) => Promise<void>;
  updateByKey: (path: string, key: string, value: Partial<T>) => Promise<void>;
  deleteByKey: (path: string, key: string) => Promise<void>;
}

export const useDatabase = <T = any>(): UseDatabaseResult<T> => {
  const getByKey = useCallback(async (path: string, key: string): Promise<T | null> => {
    const snapshot = await database().ref(`${path}/${key}`).once('value');
    return snapshot.exists() ? (snapshot.val() as T) : null;
  }, []);

  const setByKey = useCallback(async (path: string, key: string, value: T): Promise<void> => {
    await database().ref(`${path}/${key}`).set(value);
  }, []);

  const updateByKey = useCallback(
    async (path: string, key: string, value: Partial<T>): Promise<void> => {
      await database().ref(`${path}/${key}`).update(value);
    },
    [],
  );

  const deleteByKey = useCallback(async (path: string, key: string): Promise<void> => {
    await database().ref(`${path}/${key}`).remove();
  }, []);

  return { getByKey, setByKey, updateByKey, deleteByKey };
};
