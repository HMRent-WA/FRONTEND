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
import { Input } from '@/components/ui/input';
// import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/use-fetch';
import {
  GPSCHKDataResponse,
  GPSCHKDataType,
  handleResponse,
} from '@/model/types';
import LoadingPage from '@/components/loading-page';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const GPSCHKPage: React.FC = () => {
  // const router = useRouter();

  const [search, setSearch] = useState('');

  const {
    data: response,
    loading,
    error,
    revalidate,
  } = useFetch<GPSCHKDataResponse>(`${process.env.NEXT_PUBLIC_API_URL}/Gpschk`);

  if (loading) return <LoadingPage />;
  if (error) return <p className="px-4">Error: {error.message}</p>;
  if (!response) return <p className="px-4">No data</p>;

  console.log(response);

  const apiData: GPSCHKDataType[] = [];
  handleResponse(response, apiData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = async (
    assetno: string,
    seqno: string,
    field: 'IGNCTRLCHK' | 'FULCTRLCHK',
    currentValue: 'T' | 'F'
  ) => {
    const newValue = currentValue === 'T' ? 'N' : 'Y';
    const otherField = field === 'FULCTRLCHK' ? 'IGNCTRLCHK' : 'FULCTRLCHK';

    const selectedData = apiData.find(
      (data) => data.ASSETNO === assetno && data.SEQNO === seqno
    ) as GPSCHKDataType;

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}`;

    const newCARCHKDAT =
      field === 'FULCTRLCHK' && newValue === 'N'
        ? '19900101'
        : field === 'FULCTRLCHK' && newValue === 'Y'
          ? formattedDate
          : selectedData.CARCHKDAT;

    const rest = {
      [otherField]: selectedData[otherField] === 'T' ? 'Y' : 'N',
      CARCHKDAT: newCARCHKDAT,
    };

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/GPSchk/${assetno}/${seqno}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            [field]: newValue,
            ...rest,
          }),
        }
      );

      revalidate();
    } catch (error) {
      console.error('POST 요청 실패:', error);
    }
  };

  const filteredData = apiData.filter((datum) => {
    const searchLower = search.toLowerCase();
    return datum.CARNO.toLowerCase().includes(searchLower);
  });

  console.log('GPSCHK 필터 데이터', filteredData);

  return (
    <article className="px-4 relative">
      <h1 className="text-center font-medium text-xl my-8 text-[#1B1B1B]/90">
        GPS 점검
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
          <TableRow className="bg-orange-400/50 hover:bg-orange-400/35">
            <TableHead className="py-1.5 text-center rounded-tl-lg px-1 pl-2">
              자산번호
              <br />
              출고희망일/시
              <br />
              최종수신일
            </TableHead>
            <TableHead className="py-1.5 text-center px-1">
              차량번호
              <br />
              차종
              <br />
              점검일자
            </TableHead>
            <TableHead className="py-1.5 text-center rounded-tr-lg px-1 pr-2">
              점검체크
              <br />
              비고
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((data, index) => (
            <TableRow
              key={index}
              data-assetno={data.ASSETNO}
              // className={
              //   data.ASSETNO === selectedASSETNO ? 'text-primary/80' : ''
              // }
            >
              <TableCell className="font-medium text-center px-1 pl-2">
                {data.ASSETNO}
                <br />
                {data.REQOUTDT} / {data.REQOUTTM}
                <br />
                {data.LSTRCVDAT}
              </TableCell>
              <TableCell className="text-center px-1">
                {data.CARNO}
                <br />
                {data.CARKND}
                <br />
                {data.CARCHKDAT}
              </TableCell>
              <TableCell className="text-center px-1 pr-2">
                <div className="flex items-center gap-x-1 justify-center">
                  <Checkbox
                    checked={data.IGNCTRLCHK === 'T'}
                    onCheckedChange={() =>
                      handleCheckboxChange(
                        data.ASSETNO,
                        data.SEQNO,
                        'IGNCTRLCHK',
                        data.IGNCTRLCHK
                      )
                    }
                    id={data.ASSETNO + data.SEQNO + 'IGNCTRLCHK'}
                  />
                  <Label htmlFor={data.ASSETNO + data.SEQNO + 'IGNCTRLCHK'}>
                    시동제어점검
                  </Label>
                </div>
                <br />
                <div className="flex items-center gap-x-1 justify-center">
                  <Checkbox
                    checked={data.FULCTRLCHK === 'T'}
                    onCheckedChange={() =>
                      handleCheckboxChange(
                        data.ASSETNO,
                        data.SEQNO,
                        'FULCTRLCHK',
                        data.FULCTRLCHK
                      )
                    }
                    id={data.ASSETNO + data.SEQNO + 'FULCTRLCHK'}
                  />
                  <Label htmlFor={data.ASSETNO + data.SEQNO + 'FULCTRLCHK'}>
                    점검완료여부
                  </Label>
                </div>
                <br />
                {data.BIGO && (
                  <div className="text-balance break-words">{data.BIGO}</div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default GPSCHKPage;
