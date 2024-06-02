// 'use client';

// import React, { useState } from 'react';
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
// import { RadioGroupButton } from '@/components/button/radio-group-button';
// import { useRouter } from 'next/navigation';

// type QCDataType = {
//   ASSETNO: string;
//   GUBUN: '신차' | '재렌트';
//   CARNO: string;
//   MODEL: string;
//   STATUS: '상품화' | 'D' | string;
// };

// const qcdata: QCDataType[] = [
//   {
//     ASSETNO: '1',
//     GUBUN: '신차',
//     CARNO: '11하1111',
//     MODEL: '쏘렌토',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '2',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '3',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '4',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '5',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '6',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '7',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '8',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '9',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '10',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '11',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '12',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '13',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '14',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '15',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '16',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '17',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: '18',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
// ];

// const CompQC: React.FC = () => {
//   const router = useRouter();

//   const [search, setSearch] = useState('');
//   const [selectedValue, setSelectedValue] = useState('전체');
//   const [selectedASSETNO, setSelectedASSETNO] = useState<string>('');

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//   };

//   const handleRadioChange = (value: string) => {
//     setSelectedValue(value);
//   };

//   const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
//     const assetno = e.currentTarget.getAttribute('data-assetno');
//     const data = qcdata.find((data) => data.ASSETNO === assetno);
//     setSelectedASSETNO(data?.ASSETNO || '');
//   };

//   const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (selectedASSETNO) {
//       router.push(`/compqc/${selectedASSETNO}`);
//     }
//   };

//   const filteredData = qcdata.filter((data) => {
//     return (
//       (selectedValue === '전체' || data.GUBUN === selectedValue) &&
//       data.CARNO.includes(search)
//     );
//   });

//   return (
//     <article className="px-4 relative">
//       <h1 className="text-center font-medium text-xl my-8 text-[#1B1B1B]/90">
//         상품화 완료 QC
//       </h1>
//       <div className="flex flex-col my-4 gap-4">
//         <Input
//           placeholder="차량번호로 검색하기"
//           name="search"
//           value={search}
//           onChange={handleSearch}
//         />
//         <RadioGroupButton
//           options={['신차', '전체', '재렌트']}
//           onClick={handleRadioChange}
//           selectedValue={selectedValue}
//           buttonClassName="font-medium"
//         />
//       </div>
//       <Table className="mb-20">
//         <TableHeader>
//           <TableRow className="bg-orange-400/50 hover:bg-orange-400/35">
//             <TableHead className="w-[4.375rem] text-center rounded-tl-lg">
//               구분
//             </TableHead>
//             <TableHead className="text-center">차량번호</TableHead>
//             <TableHead className="text-center">모델</TableHead>
//             <TableHead className="w-[4.375rem] text-center rounded-tr-lg">
//               상태
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filteredData.map((data) => (
//             <TableRow
//               key={data.ASSETNO}
//               data-assetno={data.ASSETNO}
//               onClick={handleRowClick}
//               className={
//                 data.ASSETNO === selectedASSETNO ? 'text-primary/80' : ''
//               }
//             >
//               <TableCell className="font-medium text-center">
//                 {data.GUBUN}
//               </TableCell>
//               <TableCell className="text-center">{data.CARNO}</TableCell>
//               <TableCell className="text-center">{data.MODEL}</TableCell>
//               <TableCell className="w-[4.375rem] text-center">
//                 {data.STATUS}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <div className="flex fixed bottom-4 left-0 w-full px-4">
//         <Button className="w-full h-12" onClick={handleDetailClick}>
//           입력
//         </Button>
//       </div>
//     </article>
//   );
// };

// export default CompQC;
