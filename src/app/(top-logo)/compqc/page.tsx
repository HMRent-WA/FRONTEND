'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroupButton } from '@/components/button/radio-group-button';
import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/use-fetch';

export type QCDataType = {
  ASSETNO: string;
  GUBUN: '신차' | '재렌트';
  CARNO: string;
  MODEL: string;
  STATUS: '상품화' | 'D' | string;
};

export type QCDataResponse = {
  data: {
    result: { MSGE: string; CODE: string };
    data: { REPT: QCDataType[] };
  };
  reqCode: [{ HR58: string[] }, any[]];
};

// const qcdata: QCDataType[] = [
//   {
//     ASSETNO: 'AST20240700301',
//     GUBUN: '신차',
//     CARNO: '11하1111',
//     MODEL: '쏘렌토',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST20240700302',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST20240700303',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST20240700304',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST20240700305',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST20240700306',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST20240700307',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST20240700308',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST20240700309',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST202407003010',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '아반떼',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST202407003011',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST202407003012',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST202407003013',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST202407003014',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST202407003015',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST202407003016',
//     GUBUN: '재렌트',
//     CARNO: '22후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST202407003017',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
//   {
//     ASSETNO: 'AST202407003018',
//     GUBUN: '재렌트',
//     CARNO: '222후2222',
//     MODEL: '펠리세이드',
//     STATUS: '상품화',
//   },
// ];

const CompQC: React.FC = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('전체');
  const [selectedASSETNO, setSelectedASSETNO] = useState<string>('');
  // const [apiData, setApiData] = useState<any[]>([]);

  const {
    data: response,
    loading,
    error,
    revalidate,
  } = useFetch<QCDataResponse>(`${process.env.NEXT_PUBLIC_API_URL}/CompQC/D`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!response) return <p>No data</p>;

  console.log(response);

  const apiData = response.data.data.REPT;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const assetno = e.currentTarget.getAttribute('data-assetno');
    // const data = qcdata.find((data) => data.ASSETNO === assetno);
    const data = apiData.find((datum) => datum.ASSETNO === assetno);
    setSelectedASSETNO(data?.ASSETNO || '');
  };

  const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedASSETNO) {
      router.push(`/compqc/${selectedASSETNO}`);
    }
  };

  // const filteredData = qcdata.filter((data) => {
  const filteredData = apiData.filter((datum) => {
    return (
      (selectedValue === '전체' || datum.GUBUN === selectedValue) &&
      datum.CARNO.includes(search)
    );
  });

  return (
    <article className="px-4 relative">
      <h1 className="text-center font-medium text-xl my-8 text-[#1B1B1B]/90">
        상품화 완료 QC
      </h1>
      <div className="flex flex-col my-4 gap-4">
        <Input
          placeholder="차량번호로 검색하기"
          name="search"
          value={search}
          onChange={handleSearch}
        />
        <RadioGroupButton
          options={['신차', '전체', '재렌트']}
          onClick={handleRadioChange}
          selectedValue={selectedValue}
          buttonClassName="font-medium"
        />
      </div>
      <Table className="mb-24">
        <TableHeader>
          <TableRow className="bg-orange-400/50 hover:bg-orange-400/35">
            <TableHead className="text-center rounded-tl-lg px-1 pl-2">
              구분
            </TableHead>
            <TableHead className="text-center px-1">차량번호</TableHead>
            <TableHead className="text-center px-1">모델</TableHead>
            <TableHead className="text-center rounded-tr-lg px-1 pr-2">
              상태
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((data) => (
            <TableRow
              key={data.ASSETNO}
              data-assetno={data.ASSETNO}
              onClick={handleRowClick}
              className={
                data.ASSETNO === selectedASSETNO ? 'text-primary/80' : ''
              }
            >
              <TableCell className="font-medium text-center px-1 pl-2">
                {data.GUBUN}
              </TableCell>
              <TableCell className="text-center px-1">{data.CARNO}</TableCell>
              <TableCell className="text-center px-1">{data.MODEL}</TableCell>
              <TableCell className="text-center px-1 pr-2">
                {data.STATUS}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex fixed bottom-4 left-0 w-full px-4">
        <Button
          className="w-full h-12 rounded-lg"
          onClick={handleDetailClick}
          disabled={!selectedASSETNO}
        >
          입력
        </Button>
      </div>
    </article>
  );
};

export default CompQC;
