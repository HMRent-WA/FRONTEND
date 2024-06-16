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
import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/use-fetch';

export type QCDataType = {
  ASSETNO: string;
  차대번호: string;
  MODEL: string;
  색상: string;
};

export type QCDataResponse = {
  data: {
    result: { MSGE: string; CODE: string };
    data: { REPT: QCDataType[] };
  };
  reqCode: [{ HR58: string[] }, any[]];
};

export const qcdata: QCDataType[] = [
  {
    ASSETNO: 'AST20240700301',
    차대번호: 'KNAPU81BGRK318499',
    MODEL: '스포티지',
    색상: '스노우 화이트 펄',
  },
  {
    ASSETNO: 'AST20240700302',
    차대번호: 'KNAPU81BGRK318486',
    MODEL: '스포티지',
    색상: '스노우 화이트 펄',
  },
  {
    ASSETNO: 'AST20240700303',
    차대번호: 'KNAPU81BGRK318465',
    MODEL: '스포티지',
    색상: '스노우 화이트 펄',
  },
  {
    ASSETNO: 'AST20240700304',
    차대번호: 'KMHJB81BGRU357155',
    MODEL: '포터',
    색상: '오닉스 블루',
  },
  {
    ASSETNO: 'AST20240700305',
    차대번호: 'KNACG811BRT398243',
    MODEL: '아반떼',
    색상: '아마존 그레이 메탈릭',
  },
  {
    ASSETNO: 'AST20240700306',
    차대번호: 'KNAPU81BGRK318465',
    MODEL: '포터',
    색상: '크리미 화이트',
  },
  {
    ASSETNO: 'AST20240700307',
    차대번호: 'KMFZCZ78BRU146594',
    MODEL: '아반떼',
    색상: '아틀라스 화이트',
  },
  {
    ASSETNO: 'AST20240700308',
    차대번호: 'KMFZCZ78BRU145759',
    MODEL: '래이',
    색상: '클리어 화이트',
  },
  {
    ASSETNO: 'AST20240700308',
    차대번호: 'KMFZCZ78BRU145760',
    MODEL: '팰리세이드',
    색상: '사파이어 블랙 아쿠아',
  },
];

const InQCN: React.FC = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedASSETNO, setSelectedASSETNO] = useState<string>('');

  // FIXME: 아래 코드는 실제 API 데이터를 받아오는 코드입니다.
  // const {
  //   data: response,
  //   loading,
  //   error,
  //   revalidate,
  // } = useFetch<QCDataResponse>(`${process.env.NEXT_PUBLIC_API_URL}/InQCN/D`);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  // if (!response) return <p>No data</p>;

  // console.log(response);

  // FIXME: 아래 코드는 실제 API 데이터를 받아오는 코드입니다.
  // const apiData = response.data.data.REPT;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const assetno = e.currentTarget.getAttribute('data-assetno');
    const data = qcdata.find((data) => data.ASSETNO === assetno);
    // FIXME: 아래 코드는 실제 API 데이터를 받아오는 코드입니다.
    // const data = apiData.find((datum) => datum.ASSETNO === assetno);
    setSelectedASSETNO(data?.ASSETNO || '');
  };

  const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedASSETNO) {
      router.push(`/inqcn/${selectedASSETNO}`);
    }
  };

  const filteredData = qcdata.filter((datum) => {
    // FIXME: 아래 코드는 실제 API 데이터를 받아오는 코드입니다.
    // const filteredData = apiData.filter((datum) => {
    return datum.차대번호.includes(search);
  });

  return (
    <article className="px-4 relative">
      <h1 className="text-center font-medium text-xl my-8 text-[#1B1B1B]/90">
        신차 입고 QC
      </h1>
      <div className="flex flex-col my-4 gap-4">
        <Input
          placeholder="차대번호로 검색하기"
          name="search"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <Table className="mb-24">
        <TableHeader>
          <TableRow className="bg-green-500/50 hover:bg-green-500/35">
            <TableHead className="text-center rounded-tl-lg px-1">
              차량번호
            </TableHead>
            <TableHead className="text-center px-1">고객명</TableHead>
            <TableHead className="text-center rounded-tr-lg px-1">
              입고사유
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
              <TableCell className="font-medium text-center px-1">
                {data.차대번호}
              </TableCell>
              <TableCell className="text-center px-1">{data.MODEL}</TableCell>
              <TableCell className="text-center px-1">{data.색상}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex fixed bottom-4 left-0 w-full px-4">
        <Button className="w-full h-12 rounded-lg" onClick={handleDetailClick}>
          입력
        </Button>
      </div>
    </article>
  );
};

export default InQCN;
