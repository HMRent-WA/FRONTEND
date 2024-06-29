import { useState, useEffect, useCallback } from 'react';
import { useCacheStore } from '../store/cache-store';

const CACHE_DURATION = 1000 * 60 * 5; // 캐시 유효 기간: 5분

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  revalidate: () => void;
}

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  headers?: { [key: string]: string };
  body?: any;
}

function useFetch<T>(
  url: string,
  params?: { [key: string]: any },
  options?: FetchOptions
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { getCache, setCache } = useCacheStore();

  const fetchData = useCallback(
    async (ignoreCache = false) => {
      setLoading(true);
      setError(null);

      try {
        const urlWithParams = new URL(url, window.location.origin);
        if (params) {
          Object.keys(params).forEach((key) =>
            urlWithParams.searchParams.append(key, params[key])
          );
        }

        const finalUrl = urlWithParams.toString();
        const fetchOptions: RequestInit = {
          method: options?.method || 'GET',
          headers: options?.headers,
          body: options?.body ? JSON.stringify(options.body) : undefined,
        };

        // 캐시 처리 (GET 요청일 때만)
        if (!ignoreCache && fetchOptions.method === 'GET') {
          const cached = getCache(finalUrl);
          const now = new Date().getTime();
          if (cached && cached.expiry > now) {
            setData(cached.data);
            setLoading(false);
            return;
          }
        }

        const response = await fetch(finalUrl, fetchOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: T = await response.json();

        // 캐시에 데이터 저장 (GET 요청일 때만)
        if (fetchOptions.method === 'GET') {
          setCache(finalUrl, data, new Date().getTime() + CACHE_DURATION);
        }
        setData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [url, params, options, getCache, setCache]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const revalidate = useCallback(() => {
    fetchData(true); // 캐시를 무시하고 데이터 다시 가져오기
  }, [fetchData]);

  return { data, loading, error, revalidate };
}

export default useFetch;
