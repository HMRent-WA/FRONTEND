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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { ResvlistDataResponse, ResvlistDataType } from './types';

// FIXME: 더미데이터, useFetch 사용 시 주석 처리
// import { resvlistData } from './mock-data';
import { showErrorToast, showSuccessToast } from '@/lib/toast';

const Resvlist: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedASSETNO, setSelectedASSETNO] = useState<string>('');
  const [selectedData, setSelectedData] = useState<ResvlistDataType>();

  const {
    data: response,
    loading,
    error,
    revalidate,
  } = useFetch<ResvlistDataResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/reservation`
  );

  if (loading) return <p className="px-4">Loading...</p>;
  if (error) return <p className="px-4">Error: {error.message}</p>;
  if (!response) return <p className="px-4">No data</p>;

  console.log(response);

  // FIXME: 실제 API call 시 주석 해제, 현재 데이터가 없어서 테스트용 dummydata 사용
  const resvlistData = response.data.data.REPT;

  if (!resvlistData) {
    return <p className="px-4">해당 데이터가 없습니다.</p>;
  }

  // FIXME: 검색이 필요하다면 사용
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // };

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const assetno = e.currentTarget.getAttribute('data-assetno');
    const data = resvlistData.find((data) => data.ASSETNO === assetno);
    if (!data) return;

    setSelectedASSETNO(data.ASSETNO);
    setSelectedData(data);
  };

  const filteredData = resvlistData.filter((data) => {
    return data.CARNO.includes(search);
  });

  const handleClick = async () => {
    try {
      // FIXME: 실제 API call 시, 엔드포인트와 body 데이터 수정 필요
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reservation/${selectedASSETNO}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        // showErrorToast('예약 해제에 실패했습니다.');
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Reservation delete successful:', result);
      revalidate();
      showSuccessToast('예약이 해제되었습니다.');
    } catch (err) {
      console.error('Reservation delete failed:', err);
      showErrorToast('예약 해제에 실패했습니다.');
    }
  };

  return (
    <article className="px-4 relative">
      <h1 className="text-center font-medium text-xl my-8 text-[#1B1B1B]/90">
        차량 예약 리스트
      </h1>
      {/* <div className="flex flex-col my-4 gap-4">
        <Input
          placeholder="차량번호로 검색하기"
          name="search"
          value={search}
          onChange={handleSearch}
        />
      </div> */}
      <Table className="mb-24">
        <TableHeader>
          <TableRow className="bg-red-400/50 hover:bg-red-400/35">
            <TableHead className="text-center rounded-tl-lg px-1">
              자산 번호
            </TableHead>
            <TableHead className="text-center px-1">차량번호</TableHead>
            <TableHead className="text-center rounded-tr-lg px-1 pr-2">
              모델
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
                {data.ASSETNO}
              </TableCell>
              <TableCell className="text-center px-1">{data.CARNO}</TableCell>
              <TableCell className="text-center px-1 pr-2">
                {data.MODEL}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex fixed bottom-4 left-0 w-full px-4">
            <Button className="w-full h-12" disabled={!selectedASSETNO}>
              예약 해제
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[90%] rounded-2xl">
          <DialogHeader className="py-4 gap-2">
            <DialogTitle>정말 예약을 해제하시겠습니까?</DialogTitle>
            <DialogDescription className="flex justify-center items-center gap-2">
              <span>{selectedData?.CARNO}</span>
              <span>{selectedData?.MODEL}</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="w-full flex gap-4">
              <Button
                type="submit"
                className="w-full"
                disabled={!selectedASSETNO}
                onClick={handleClick}
              >
                예약 해제
              </Button>
              <DialogClose className="w-full">
                <Button
                  type="submit"
                  className="w-full"
                  variant={'destructive'}
                >
                  취소
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default Resvlist;
