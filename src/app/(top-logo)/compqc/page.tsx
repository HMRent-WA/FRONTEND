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
import {
  COMPQCDataResponse,
  COMPQCDataType,
  handleResponse,
} from '@/model/types';
import LoadingPage from '@/components/loading-page';

const CompQC: React.FC = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('전체');
  const [selectedASSETNO, setSelectedASSETNO] = useState<string>('');

  const {
    data: response,
    loading,
    error,
    revalidate,
  } = useFetch<COMPQCDataResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/CompQC/D`
  );

  if (loading) return <LoadingPage />;
  if (error) return <p className="px-4">Error: {error.message}</p>;
  if (!response) return <p className="px-4">No data</p>;

  console.log(response);

  const apiData: COMPQCDataType[] = [];
  handleResponse(response, apiData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const assetno = e.currentTarget.getAttribute('data-assetno');
    const data = apiData.find((datum) => datum.ASSETNO === assetno);
    if (data) {
      selectedASSETNO === data.ASSETNO
        ? router.push(`/compqc/${data.ASSETNO}`)
        : setSelectedASSETNO(data.ASSETNO);
    }
  };

  const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedASSETNO) {
      router.push(`/compqc/${selectedASSETNO}`);
    }
  };

  const filteredData = apiData.filter((datum) => {
    return (
      (selectedValue === '전체' || datum.GUBUN === selectedValue) &&
      (datum.CARNO.includes(search) || datum.CHADAENO.includes(search))
    );
  });

  return (
    <article className="px-4 relative">
      <h1 className="text-center font-medium text-xl my-8 text-[#1B1B1B]/90">
        상품화 완료 QC
      </h1>
      <div className="flex flex-col my-4 gap-4">
        <Input
          placeholder="차량번호 / 차대번호로 검색하기"
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
      <div className="flex fixed bottom-4 left-0 w-full px-4 bg-white z-10">
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
