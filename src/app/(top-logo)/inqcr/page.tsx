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
  CARNO: string;
  MODEL: string;
  CNAME: string;
  실행번호: string;
  입고사유: '만기종료' | '중도반납' | '중도회수' | '기타' | string;
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
    CARNO: '177호5232',
    MODEL: '소나타',
    CNAME: '이강인',
    실행번호: 'LT23120283001',
    입고사유: '만기종료',
  },
  {
    ASSETNO: 'AST20240700302',
    CARNO: '104호7290',
    MODEL: '그렌저',
    CNAME: '손흥민',
    실행번호: 'LT23120283002',
    입고사유: '중도반납',
  },
  {
    ASSETNO: 'AST20240700303',
    CARNO: '172하3251',
    MODEL: '스포티지',
    CNAME: '김민재',
    실행번호: 'LT23120283003',
    입고사유: '중도회수',
  },
  {
    ASSETNO: 'AST20240700304',
    CARNO: '128하2322',
    MODEL: '쏘렌토',
    CNAME: '박지성',
    실행번호: 'LT23120283004',
    입고사유: '만기종료',
  },
  {
    ASSETNO: 'AST20240700305',
    CARNO: '212호2992',
    MODEL: '펠리세이드',
    CNAME: '안정환',
    실행번호: 'LT23120283005',
    입고사유: '만기종료',
  },
  {
    ASSETNO: 'AST20240700306',
    CARNO: '172후3827',
    MODEL: '아반떼',
    CNAME: '이승우',
    실행번호: 'LT23120283006',
    입고사유: '중도반납',
  },
  {
    ASSETNO: 'AST20240700307',
    CARNO: '160하2977',
    MODEL: 'K5',
    CNAME: '왕궁참숯갈비',
    실행번호: 'LT23120283007',
    입고사유: '중도회수',
  },
  {
    ASSETNO: 'AST20240700308',
    CARNO: '147후2850',
    MODEL: '아반떼',
    CNAME: '황희찬',
    실행번호: 'LT23120283008',
    입고사유: '기타',
  },
  {
    ASSETNO: 'AST20240700309',
    CARNO: '177호4711',
    MODEL: 'K3',
    CNAME: '조현우',
    실행번호: 'LT23120283009',
    입고사유: '기타',
  },
];

const InQCR: React.FC = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedASSETNO, setSelectedASSETNO] = useState<string>('');

  // FIXME: 아래 코드는 실제 API 데이터를 받아오는 코드입니다.
  // const {
  //   data: response,
  //   loading,
  //   error,
  //   revalidate,
  // } = useFetch<QCDataResponse>(`${process.env.NEXT_PUBLIC_API_URL}/InQCR/D`);

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
      router.push(`/inqcr/${selectedASSETNO}`);
    }
  };

  const filteredData = qcdata.filter((datum) => {
    // FIXME: 아래 코드는 실제 API 데이터를 받아오는 코드입니다.
    // const filteredData = apiData.filter((datum) => {
    return datum.CARNO.includes(search);
  });

  return (
    <article className="px-4 relative">
      <h1 className="text-center font-medium text-xl my-8 text-[#1B1B1B]/90">
        재렌트 입고 QC
      </h1>
      <div className="flex flex-col my-4 gap-4">
        <Input
          placeholder="차량번호로 검색하기"
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
                {data.CARNO}
              </TableCell>
              <TableCell className="text-center px-1">{data.CNAME}</TableCell>
              <TableCell className="text-center px-1">
                {data.입고사유}
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

export default InQCR;
