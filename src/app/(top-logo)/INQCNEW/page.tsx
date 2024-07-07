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
import {
  INQCNEWDataResponse,
  INQCNEWDataType,
  handleResponse,
} from '@/model/types';
import LoadingPage from '@/components/loading-page';

const INQCNEW: React.FC = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedASSETNO, setSelectedASSETNO] = useState<string>('');

  const {
    data: fetchedData,
    loading,
    error,
  } = useFetch<INQCNEWDataResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/INQCNEW`
  );

  if (loading) return <LoadingPage />;
  if (error) return <p className="px-4">Error: {error.message}</p>;
  if (!fetchedData) return <p className="px-4">No data</p>;

  console.log(fetchedData);

  const apiData: INQCNEWDataType[] = [];

  handleResponse(fetchedData, apiData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const assetno = e.currentTarget.getAttribute('data-assetno');
    const data = apiData.find((datum) => datum.ASSETNO === assetno);
    setSelectedASSETNO(data?.ASSETNO || '');
  };

  const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedASSETNO) {
      router.push(`/INQCNEW/${selectedASSETNO}`);
    }
  };

  const filteredData = apiData.filter((datum) => {
    return datum.VIDNO.includes(search);
  });

  console.log(filteredData);

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
                {data.VIDNO}
              </TableCell>
              <TableCell className="text-center px-1">{data.MODEL}</TableCell>
              <TableCell className="text-center px-1">{data.COLOR}</TableCell>
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

export default INQCNEW;
