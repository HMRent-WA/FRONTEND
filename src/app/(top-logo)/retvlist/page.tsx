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
import useFetch from '@/hooks/use-fetch';
import { DateRange } from 'react-day-picker';
import { RetvDataResponse } from './types';

const Retvlist: React.FC = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('전체');
  const [selectedASSETNO, setSelectedASSETNO] = useState<string>('');
  const [selectedRQDATE, setSelectedRQDATE] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const {
    data: response,
    loading,
    error,
    revalidate,
  } = useFetch<RetvDataResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/retrieval`
  );

  if (loading) return <p className="px-4">Loading...</p>;
  if (error) return <p className="px-4">Error: {error.message}</p>;
  if (!response) return <p className="px-4">No data</p>;

  console.log(response);

  const retvdata = response.data.data.REPT;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  console.log(retvdata);

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const assetno = e.currentTarget.getAttribute('data-assetno');
    const data = retvdata.find((data) => data.ASSETNO === assetno);
    setSelectedASSETNO(data?.ASSETNO || '');
    setSelectedRQDATE(data?.RQDATE || '');
  };

  const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedASSETNO) {
      router.push(`/retvlist/${selectedASSETNO}/${selectedRQDATE}`);
    }
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const parseDate = (dateString: string): Date => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return new Date(`${year}-${month}-${day}`);
  };

  const isWithinDateRange = (
    dateString: Date,
    datePickerRange: DateRange | undefined
  ) => {
    if (!datePickerRange?.from || !datePickerRange?.to) return true;
    const date = new Date(dateString);
    return date >= datePickerRange.from && date <= datePickerRange.to;
  };

  const filteredData = retvdata.filter((data) => {
    if (search && !data.CARNO.includes(search)) return false;
    if (selectedValue !== '전체' && data.STATUS !== selectedValue) return false;
    if (!isWithinDateRange(parseDate(data.RQDATE), dateRange)) return false;
    return true;
  });

  console.log('필터한 데이터 -> ', filteredData);

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
        <DatePickerWithRange onChange={handleDateChange} />
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
            <TableHead className="w-[4.375rem] text-center rounded-tl-lg px-1">
              차량 번호
            </TableHead>
            <TableHead className="text-center px-1">모델</TableHead>
            <TableHead className="text-center px-1">고객</TableHead>
            <TableHead className="text-center px-1">회수사유</TableHead>
            <TableHead className="w-[4.375rem] text-center rounded-tr-lg px-1">
              진행상태
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((data, idx) => (
            <TableRow
              key={data.ASSETNO + idx}
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
              <TableCell className="text-center px-1">{data.CNAME}</TableCell>
              <TableCell className="text-center px-1">{data.RRSON}</TableCell>
              <TableCell className="w-[4.375rem] text-center px-1">
                {data.STATUS}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex fixed bottom-4 left-0 w-full px-4">
        <Button className="w-full h-12 rounded-lgs" onClick={handleDetailClick}>
          상세 조회
        </Button>
      </div>
    </article>
  );
};

export default Retvlist;
