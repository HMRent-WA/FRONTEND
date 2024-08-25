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
import { RetvDataResponse, RetvDataType } from '@/model/types';
import LoadingPage from '@/components/loading-page';
import { handleResponse } from '@/model/types';
import { useRetvDateRange } from '@/providers/retv-date-range-provider';

const Retvlist: React.FC = () => {
  const router = useRouter();
  const { retvDateRange, setRetvDateRange } = useRetvDateRange(); // 컨텍스트 값 사용

  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('전체');
  const [selectedASSETNO, setSelectedASSETNO] = useState<string>('');
  const [selectedRQDATE, setSelectedRQDATE] = useState<string>('');

  const {
    data: response,
    loading,
    error,
    revalidate,
  } = useFetch<RetvDataResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/retrieval`
  );

  if (loading) return <LoadingPage />;
  if (error) return <p className="px-4">Error: {error.message}</p>;
  if (!response) return <p className="px-4">No data</p>;

  const retvdata: RetvDataType[] = [];
  handleResponse(response, retvdata);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  // console.log('retvlist -> ', retvdata);

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const assetno = e.currentTarget.getAttribute('data-assetno');
    const rqdate = e.currentTarget.getAttribute('data-rqdate');
    const data = retvdata.find(
      (data) => data.ASSETNO === assetno && data.RQDATE === rqdate
    );

    if (!data) return;

    if (selectedASSETNO === data.ASSETNO && selectedRQDATE === data.RQDATE) {
      router.push(`/retvlist/${data.ASSETNO}/${data.RQDATE}`);
    } else {
      setSelectedASSETNO(data.ASSETNO);
      setSelectedRQDATE(data.RQDATE);
    }
  };

  const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedASSETNO) {
      router.push(`/retvlist/${selectedASSETNO}/${selectedRQDATE}`);
    }
  };

  const parseDate = (dateString: string): Date => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return new Date(`${year}-${month}-${day}`);
  };

  const isWithinDateRange = (
    dateString: string,
    datePickerRange: DateRange | undefined
  ) => {
    const date = parseDate(dateString);
    if (!datePickerRange?.from || !datePickerRange?.to) return true;

    // 연월일만 비교하기 위해 시간을 제외한 새로운 날짜 객체 생성
    const fromDate = new Date(
      datePickerRange.from.getFullYear(),
      datePickerRange.from.getMonth(),
      datePickerRange.from.getDate()
    );
    const toDate = new Date(
      datePickerRange.to.getFullYear(),
      datePickerRange.to.getMonth(),
      datePickerRange.to.getDate()
    );
    const compareDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    return compareDate >= fromDate && compareDate <= toDate;
  };

  const filteredData = retvdata
    .filter((data) => {
      if (search && !data.CARNO.includes(search)) return false;
      if (selectedValue !== '전체' && data.STATUS !== selectedValue)
        return false;
      if (!isWithinDateRange(data.RQDATE, retvDateRange)) return false; // 컨텍스트 값 사용
      return true;
    })
    .sort((a, b) => a.RQDATE.localeCompare(b.RQDATE));

  // console.log('필터된 데이터 -> ', filteredData);

  return (
    <article className="relative">
      <h1 className="px-4 text-center font-medium text-xl my-8 text-[#1B1B1B]/90">
        회수 대상 리스트
      </h1>
      <div className="px-4 flex flex-col my-4 gap-4">
        <RadioGroupButton
          options={['회수요청', '전체', '회수완료']}
          onClick={handleRadioChange}
          selectedValue={selectedValue}
          buttonClassName="font-medium"
        />
        <DatePickerWithRange onChange={setRetvDateRange} className="" />{' '}
        {/* 컨텍스트 값 사용 */}
        <Input
          placeholder="차량번호로 검색하기"
          name="search"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="px-4 w-full">
        <Table className="px-4 mb-24">
          <TableHeader>
            <TableRow className="bg-primary/35 hover:bg-primary/20">
              <TableHead className="w-[4.375rem] text-center rounded-tl-lg px-1">
                요청 일시
              </TableHead>
              <TableHead className="text-center px-1">차량 번호</TableHead>
              <TableHead className="text-center px-1">
                고객
                <br />
                모델
              </TableHead>
              <TableHead className="w-[4.375rem] text-center rounded-tr-lg px-1">
                회수사유
                <br />
                진행상태
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((data) => (
              <TableRow
                key={data.ASSETNO + data.RQDATE}
                data-assetno={data.ASSETNO}
                data-rqdate={data.RQDATE}
                onClick={handleRowClick}
                className={
                  data.ASSETNO === selectedASSETNO ? 'text-primary/80' : ''
                }
              >
                <TableCell className="font-medium text-center px-1">
                  {data.RQDATE}
                </TableCell>
                <TableCell className="text-center px-1">{data.CARNO}</TableCell>
                <TableCell className="text-center px-1">
                  {data.CNAME}
                  <br />
                  {data.MODEL}
                </TableCell>
                <TableCell className="w-[4.375rem] text-center px-1">
                  {data.RRSON}
                  <br />
                  {data.STATUS}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {(filteredData.length === 0 || !filteredData) && (
        <div className={'w-screen h-40 flex items-center justify-center'}>
          조건에 해당하는 데이터가 없습니다.
        </div>
      )}
      <div className="flex fixed bottom-0 left-0 w-full p-4 bg-white z-10">
        <Button className="w-full h-12 rounded-lg" onClick={handleDetailClick}>
          상세 조회
        </Button>
      </div>
    </article>
  );
};

export default Retvlist;
