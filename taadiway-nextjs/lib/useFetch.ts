/**
 * Data fetching hook with caching, deduplication, and optimistic updates
 */

import { useState, useEffect, useCallback, useRef } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  isValidating: boolean;
}

interface UseFetchOptions<T> {
  revalidateOnFocus?: boolean;
  revalidateInterval?: number;
  dedupingInterval?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  initialData?: T;
  enabled?: boolean;
}

// Global cache for request deduplication
const requestCache = new Map<string, Promise<any>>();
const dataCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Custom hook for data fetching with SWR-like features
 */
export function useFetch<T = any>(
  key: string | null,
  fetcher: () => Promise<T>,
  options: UseFetchOptions<T> = {}
): FetchState<T> & {
  mutate: (data?: T | ((current: T | null) => T), revalidate?: boolean) => Promise<void>;
  refresh: () => Promise<void>;
} {
  const {
    revalidateOnFocus = false,
    revalidateInterval,
    dedupingInterval = 2000,
    onSuccess,
    onError,
    initialData = null,
    enabled = true,
  } = options;

  const [state, setState] = useState<FetchState<T>>({
    data: initialData,
    error: null,
    loading: !initialData,
    isValidating: false,
  });

  const fetcherRef = useRef(fetcher);
  const mountedRef = useRef(true);
  const revalidateTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (revalidateTimerRef.current) {
        clearInterval(revalidateTimerRef.current);
      }
    };
  }, []);

  const fetchData = useCallback(
    async (isRevalidating = false) => {
      if (!key || !enabled) return;

      // Check cache first
      const cached = dataCache.get(key);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL && !isRevalidating) {
        setState((prev) => ({ ...prev, data: cached.data, loading: false }));
        return;
      }

      // Request deduplication
      const now = Date.now();
      const existingRequest = requestCache.get(key);
      
      if (existingRequest && now - (existingRequest as any).timestamp < dedupingInterval) {
        try {
          const data = await existingRequest;
          if (mountedRef.current) {
            setState({ data, error: null, loading: false, isValidating: false });
          }
        } catch (error) {
          if (mountedRef.current) {
            setState((prev) => ({
              ...prev,
              error: error as Error,
              loading: false,
              isValidating: false,
            }));
          }
        }
        return;
      }

      setState((prev) => ({
        ...prev,
        loading: !isRevalidating && !prev.data,
        isValidating: isRevalidating,
      }));

      const request = fetcherRef.current();
      (request as any).timestamp = now;
      requestCache.set(key, request);

      try {
        const data = await request;
        
        if (mountedRef.current) {
          setState({ data, error: null, loading: false, isValidating: false });
          dataCache.set(key, { data, timestamp: Date.now() });
          onSuccess?.(data);
        }
      } catch (error) {
        if (mountedRef.current) {
          const err = error as Error;
          setState((prev) => ({
            ...prev,
            error: err,
            loading: false,
            isValidating: false,
          }));
          onError?.(err);
        }
      } finally {
        requestCache.delete(key);
      }
    },
    [key, enabled, dedupingInterval, onSuccess, onError]
  );

  // Initial fetch
  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [key, enabled]); // Only re-fetch when key or enabled changes

  // Revalidate on focus
  useEffect(() => {
    if (!revalidateOnFocus || !enabled) return;

    const handleFocus = () => {
      fetchData(true);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [revalidateOnFocus, enabled, fetchData]);

  // Revalidate on interval
  useEffect(() => {
    if (!revalidateInterval || !enabled) return;

    revalidateTimerRef.current = setInterval(() => {
      fetchData(true);
    }, revalidateInterval);

    return () => {
      if (revalidateTimerRef.current) {
        clearInterval(revalidateTimerRef.current);
      }
    };
  }, [revalidateInterval, enabled, fetchData]);

  // Mutate function for optimistic updates
  const mutate = useCallback(
    async (data?: T | ((current: T | null) => T), revalidate = true) => {
      if (!key) return;

      if (typeof data === 'function') {
        const fn = data as (current: T | null) => T;
        const newData = fn(state.data);
        setState((prev) => ({ ...prev, data: newData }));
        dataCache.set(key, { data: newData, timestamp: Date.now() });
      } else if (data !== undefined) {
        setState((prev) => ({ ...prev, data }));
        dataCache.set(key, { data, timestamp: Date.now() });
      }

      if (revalidate) {
        await fetchData(true);
      }
    },
    [key, state.data, fetchData]
  );

  // Refresh function
  const refresh = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  return {
    ...state,
    mutate,
    refresh,
  };
}

/**
 * Clear cache for a specific key or all keys
 */
export function clearCache(key?: string) {
  if (key) {
    dataCache.delete(key);
    requestCache.delete(key);
  } else {
    dataCache.clear();
    requestCache.clear();
  }
}

/**
 * Prefetch data
 */
export async function prefetch<T>(key: string, fetcher: () => Promise<T>): Promise<void> {
  const cached = dataCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return;
  }

  try {
    const data = await fetcher();
    dataCache.set(key, { data, timestamp: Date.now() });
  } catch (error) {
    console.error('Prefetch error:', error);
  }
}
