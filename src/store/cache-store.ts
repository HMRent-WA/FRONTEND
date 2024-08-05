import { create } from 'zustand';

interface CacheItem<T> {
  data: T;
  expiry: number;
}

interface CacheState {
  cache: { [url: string]: CacheItem<any> };
  setCache: (url: string, data: any, expiry: number) => void;
  getCache: (url: string) => CacheItem<any> | undefined;
  removeCache: (url: string) => void;
}

export const useCacheStore = create<CacheState>((set, get) => ({
  cache: {},
  setCache: (url, data, expiry) =>
    set((state) => ({
      cache: {
        ...state.cache,
        [url]: { data, expiry },
      },
    })),
  getCache: (url) => get().cache[url],
  removeCache: (url) =>
    set((state) => {
      const newCache = { ...state.cache };
      delete newCache[url];
      return { cache: newCache };
    }),
}));
