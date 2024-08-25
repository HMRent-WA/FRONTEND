// import { useRef, useCallback } from 'react';

// type ClickHandler = (params?: any) => void;

// interface UseDoubleClickParams {
//   onSingleClick: ClickHandler;
//   onDoubleClick: ClickHandler;
//   delay?: number;
// }

// function useDoubleClick({
//   onSingleClick,
//   onDoubleClick,
//   delay = 250,
// }: UseDoubleClickParams): ClickHandler {
//   const clickCountRef = useRef<number>(0);
//   const timerRef = useRef<number | null>(null);

//   const handleClick = useCallback(
//     (params: any) => {
//       if (clickCountRef.current === 0) {
//         clickCountRef.current = 1;
//         timerRef.current = window.setTimeout(() => {
//           if (clickCountRef.current === 1) {
//             onSingleClick(params);
//           }
//           clickCountRef.current = 0;
//         }, delay);
//       } else {
//         clickCountRef.current = 0;
//         if (timerRef.current !== null) {
//           clearTimeout(timerRef.current);
//         }
//         onDoubleClick(params);
//       }
//     },
//     [delay, onSingleClick, onDoubleClick]
//   );

//   return handleClick;
// }

// export default useDoubleClick;

// 'use client';

// import React, { useCallback, useState, useMemo } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useRouter } from 'next/navigation';
// import useFetch from '@/hooks/use-fetch';
// import {
//   INQCNEWDataResponse,
//   INQCNEWDataType,
//   handleResponse,
// } from '@/model/types';
// import LoadingPage from '@/components/loading-page';
// import useDoubleClick from '@/hooks/use-double-click';

// const INQCNEW: React.FC = () => {
//   const router = useRouter();

//   const [search, setSearch] = useState('');
//   const [selectedASSETNO, setSelectedASSETNO] = useState<string>('');

//   const {
//     data: fetchedData,
//     loading,
//     error,
//   } = useFetch<INQCNEWDataResponse>(
//     `${process.env.NEXT_PUBLIC_API_URL}/INQCNEW`
//   );

//   const apiData = useMemo(() => {
//     if (!fetchedData) return [];
//     const data: INQCNEWDataType[] = [];
//     handleResponse(fetchedData, data);
//     return data;
//   }, [fetchedData]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//   };

//   const handleRowClick = (assetno: string) => {
//     // const data = apiData.find((datum) => datum.ASSETNO === assetno);
//     // if (data) setSelectedASSETNO(data.ASSETNO);
//     setSelectedASSETNO(assetno);
//   };

//   const handleRowDoubleClick = (assetno: string) => {
//     router.push(`/INQCNEW/${assetno}`);
//   };

//   const handleClick = useDoubleClick({
//     onSingleClick: handleRowClick,
//     onDoubleClick: handleRowDoubleClick,
//     delay: 200,
//   });

//   const handleDetailClick = useCallback(() => {
//     if (selectedASSETNO) {
//       router.push(`/INQCNEW/${selectedASSETNO}`);
//     }
//   }, [selectedASSETNO, router]);

//   const filteredData = useMemo(
//     () => apiData.filter((datum) => datum.VIDNO.includes(search)),
//     [apiData, search]
//   );

//   if (loading) return <LoadingPage />;
//   if (error) return <p className="px-4">Error: {error.message}</p>;
//   if (!fetchedData) return <p className="px-4">No data</p>;

//   return (
//     <article className="px-4 relative">
//       <h1 className="text-center font-medium text-xl my-8 text-[#1B1B1B]/90">
//         신차 입고 QC
//       </h1>
//       <div className="flex flex-col my-4 gap-4">
//         <Input
//           placeholder="차대번호로 검색하기"
//           name="search"
//           value={search}
//           onChange={handleSearch}
//         />
//       </div>
//       <Table className="mb-24">
//         <TableHeader>
//           <TableRow className="bg-green-500/50 hover:bg-green-500/35">
//             <TableHead className="text-center rounded-tl-lg px-1">
//               차대번호
//             </TableHead>
//             <TableHead className="text-center px-1">모델명</TableHead>
//             <TableHead className="text-center rounded-tr-lg px-1">
//               색상
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filteredData.map((data) => (
//             <TableRow
//               key={data.ASSETNO}
//               data-assetno={data.ASSETNO}
//               onClick={() => handleClick(data.ASSETNO)}
//               className={
//                 data.ASSETNO === selectedASSETNO ? 'text-primary/80' : ''
//               }
//             >
//               <TableCell className="font-medium text-center px-1">
//                 {data.VIDNO}
//               </TableCell>
//               <TableCell className="text-center px-1">{data.MODEL}</TableCell>
//               <TableCell className="text-center px-1">{data.COLOR}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <div className="flex fixed bottom-0 left-0 w-full p-4 bg-white z-10">
//         <Button
//           className="w-full h-12 rounded-lg"
//           onClick={handleDetailClick}
//           disabled={!selectedASSETNO}
//         >
//           입력
//         </Button>
//       </div>
//     </article>
//   );
// };

// export default INQCNEW;
