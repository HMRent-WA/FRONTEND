// import { useState, useEffect, useCallback } from 'react';

// interface QueryOptions<T> {
//   queryKey: string;
//   queryFn: () => Promise<T>;
//   cacheTime?: number;
//   staleTime?: number;
//   enabled?: boolean;
// }

// interface QueryResult<T> {
//   data: T | null;
//   isLoading: boolean;
//   isError: boolean;
//   refetch: () => void;
//   mutate: (
//     updater: T | ((prevData: T | null) => T | null) | null,
//     options?: { rollbackOnError?: boolean; revalidate?: boolean }
//   ) => void;
// }

// const queryCache: { [key: string]: { data: any; timestamp: number } } = {};

// function useQuery<T>({
//   queryKey,
//   queryFn,
//   cacheTime = 1000 * 60 * 5, // Default cache time: 5 minutes
//   staleTime = 0, // Default stale time: 0 (immediately stale)
//   enabled = true,
// }: QueryOptions<T>): QueryResult<T> {
//   const [data, setData] = useState<T | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isError, setIsError] = useState<boolean>(false);

//   const fetchData = useCallback(async () => {
//     if (!enabled) return;

//     setIsLoading(true);
//     setIsError(false);

//     const cached = queryCache[queryKey];

//     if (cached && Date.now() - cached.timestamp < cacheTime) {
//       setData(cached.data);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const fetchedData = await queryFn();
//       setData(fetchedData);
//       queryCache[queryKey] = { data: fetchedData, timestamp: Date.now() };
//     } catch (error) {
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [queryKey, queryFn, cacheTime, enabled]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const refetch = useCallback(() => {
//     fetchData();
//   }, [fetchData]);

//   const mutate = useCallback(
//     (
//       updater: T | ((prevData: T | null) => T | null) | null,
//       options: { rollbackOnError?: boolean; revalidate?: boolean } = {}
//     ) => {
//       const previousData = data;
//       const newData: T | null =
//         typeof updater === 'function'
//           ? (updater as (prevData: T | null) => T | null)(data)
//           : updater;

//       setData(newData);
//       queryCache[queryKey] = { data: newData, timestamp: Date.now() };

//       if (options.revalidate) {
//         fetchData();
//       }

//       if (options.rollbackOnError && previousData !== newData) {
//         try {
//           // Assume optimistic update succeeded, if we need to rollback we'll do so below
//         } catch (error) {
//           setData(previousData); // Rollback to the previous state if mutation fails
//           setIsError(true);
//         }
//       }
//     },
//     [data, queryKey, fetchData]
//   );

//   return { data, isLoading, isError, refetch, mutate };
// }

// export default useQuery;
