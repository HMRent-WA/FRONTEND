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
import { DatePickerWithRange } from '@/components/date-picker-with-range';

// CARNO에 search validation이 필요함 -> r'^\d{2,3}[가-힣]\d{4}$' -> 가-힣 ? 하-힣 ?

type ResvDataType = {
  ASSETNO: string;
  CARNO: string;
  MODEL: string;
  CLIENT: string;
  ghltntkdb: string;
  wlsgodtkdxo: string;
};

const resvdata: ResvDataType[] = [
  {
    ASSETNO: 'AST20240700301',
    CARNO: '11하1111',
    MODEL: '쏘렌토',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST20240700302',
    CARNO: '22후2222',
    MODEL: '아반떼',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST20240700303',
    CARNO: '22후2222',
    MODEL: '아반떼',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST20240700304',
    CARNO: '222후2222',
    MODEL: '아반떼',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST20240700305',
    CARNO: '222후2222',
    MODEL: '아반떼',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST20240700306',
    CARNO: '222후2222',
    MODEL: '아반떼',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST20240700307',
    CARNO: '222후2222',
    MODEL: '아반떼',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST20240700308',
    CARNO: '222후2222',
    MODEL: '아반떼',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST20240700309',
    CARNO: '22후2222',
    MODEL: '아반떼',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST202407003010',
    CARNO: '222후2222',
    MODEL: '아반떼',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST202407003011',
    CARNO: '222후2222',
    MODEL: '펠리세이드',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST202407003012',
    CARNO: '22후2222',
    MODEL: '펠리세이드',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST202407003013',
    CARNO: '22후2222',
    MODEL: '펠리세이드',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST202407003014',
    CARNO: '22후2222',
    MODEL: '펠리세이드',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST202407003015',
    CARNO: '22후2222',
    MODEL: '펠리세이드',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST202407003016',
    CARNO: '22후2222',
    MODEL: '펠리세이드',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST202407003017',
    CARNO: '222후2222',
    MODEL: '펠리세이드',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
  {
    ASSETNO: 'AST202407003018',
    CARNO: '222후2222',
    MODEL: '펠리세이드',
    CLIENT: '홍길동',
    ghltntkdb: '중도반납',
    wlsgodtkdxo: '회수요청',
  },
];

const Resvlist: React.FC = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('전체');
  const [selectedASSETNO, setSelectedASSETNO] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const assetno = e.currentTarget.getAttribute('data-assetno');
    const data = resvdata.find((data) => data.ASSETNO === assetno);
    setSelectedASSETNO(data?.ASSETNO || '');
  };

  const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedASSETNO) {
      router.push(`/resvlist/${selectedASSETNO}`);
    }
  };

  const filteredData = resvdata.filter((data) => {
    return (
      (selectedValue === '전체' || data.wlsgodtkdxo === selectedValue) &&
      data.CARNO.includes(search)
    );
  });

  return (
    <article className="px-4 relative">
      <h1 className="text-center font-medium text-xl my-8 text-[#1B1B1B]/90">
        회수 대상 리스트
      </h1>
      <div className="flex flex-col my-4 gap-4">
        <RadioGroupButton
          options={['회수요청', '전체', '회수완료']}
          onClick={handleRadioChange}
          selectedValue={selectedValue}
          buttonClassName="font-medium"
        />
        <DatePickerWithRange />
        <Input
          placeholder="차량번호로 검색하기"
          name="search"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <Table className="mb-24">
        <TableHeader>
          <TableRow className="bg-primary/35 hover:bg-primary/20">
            <TableHead className="w-[4.375rem] text-center rounded-tl-lg px-1 pl-2">
              차량 번호
            </TableHead>
            <TableHead className="text-center">모델</TableHead>
            <TableHead className="text-center">고객</TableHead>
            <TableHead className="text-center px-1">회수사유</TableHead>
            <TableHead className="w-[4.375rem] text-center rounded-tr-lg px-1 pr-2">
              진행상태
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
              <TableCell className="text-center px-1">{data.MODEL}</TableCell>
              <TableCell className="text-center px-1">{data.CLIENT}</TableCell>
              <TableCell className="text-center px-1">
                {data.ghltntkdb}
              </TableCell>
              <TableCell className="w-[4.375rem] text-center px-1 pr-2">
                {data.wlsgodtkdxo}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex fixed bottom-4 left-0 w-full px-4">
        <Button className="w-full h-12" onClick={handleDetailClick}>
          상세 조회
        </Button>
      </div>
    </article>
  );
};

export default Resvlist;
