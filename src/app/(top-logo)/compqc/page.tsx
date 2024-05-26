import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type QCData = {
  ASSETNO: string;
  GUBUN: '신차' | '재렌트';
  CARNO: string;
  MODEL: string;
  STATUS: '상품화' | 'D' | string;
};

const qcdata: QCData[] = [
  {
    ASSETNO: '1',
    GUBUN: '신차',
    CARNO: '11 하 1111',
    MODEL: '쏘렌토',
    STATUS: '상품화',
  },
  {
    ASSETNO: '2',
    GUBUN: '재렌트',
    CARNO: '222 후 2222',
    MODEL: '아반떼',
    STATUS: '상품화',
  },
  {
    ASSETNO: '3',
    GUBUN: '재렌트',
    CARNO: '222 후 2222',
    MODEL: '아반떼',
    STATUS: '상품화',
  },
  {
    ASSETNO: '4',
    GUBUN: '재렌트',
    CARNO: '222 후 2222',
    MODEL: '아반떼',
    STATUS: '상품화',
  },
  {
    ASSETNO: '5',
    GUBUN: '재렌트',
    CARNO: '222 후 2222',
    MODEL: '아반떼',
    STATUS: '상품화',
  },
  {
    ASSETNO: '6',
    GUBUN: '재렌트',
    CARNO: '222 후 2222',
    MODEL: '아반떼',
    STATUS: '상품화',
  },
  {
    ASSETNO: '7',
    GUBUN: '재렌트',
    CARNO: '222 후 2222',
    MODEL: '아반떼',
    STATUS: '상품화',
  },
  {
    ASSETNO: '8',
    GUBUN: '재렌트',
    CARNO: '222 후 2222',
    MODEL: '아반떼',
    STATUS: '상품화',
  },
  {
    ASSETNO: '9',
    GUBUN: '재렌트',
    CARNO: '22후2222',
    MODEL: '아반떼',
    STATUS: '상품화',
  },
  {
    ASSETNO: '10',
    GUBUN: '재렌트',
    CARNO: '222후2222',
    MODEL: '아반떼',
    STATUS: '상품화',
  },
  {
    ASSETNO: '11',
    GUBUN: '재렌트',
    CARNO: '222후2222',
    MODEL: '펠리세이드',
    STATUS: '상품화',
  },
  {
    ASSETNO: '12',
    GUBUN: '재렌트',
    CARNO: '222후2222',
    MODEL: '펠리세이드',
    STATUS: '상품화',
  },
  {
    ASSETNO: '13',
    GUBUN: '재렌트',
    CARNO: '222후2222',
    MODEL: '펠리세이드',
    STATUS: '상품화',
  },
  {
    ASSETNO: '14',
    GUBUN: '재렌트',
    CARNO: '222후2222',
    MODEL: '펠리세이드',
    STATUS: '상품화',
  },
  {
    ASSETNO: '15',
    GUBUN: '재렌트',
    CARNO: '222후2222',
    MODEL: '펠리세이드',
    STATUS: '상품화',
  },
  {
    ASSETNO: '16',
    GUBUN: '재렌트',
    CARNO: '222후2222',
    MODEL: '펠리세이드',
    STATUS: '상품화',
  },
  {
    ASSETNO: '17',
    GUBUN: '재렌트',
    CARNO: '222후2222',
    MODEL: '펠리세이드',
    STATUS: '상품화',
  },
  {
    ASSETNO: '18',
    GUBUN: '재렌트',
    CARNO: '222후2222',
    MODEL: '펠리세이드',
    STATUS: '상품화',
  },
];

const CompQC: React.FC = () => {
  return (
    <div className="px-4 relative">
      <h1 className="text-center font-semibold text-2xl my-8">CompQC</h1>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="bg-primary/30">
            <TableHead className="w-[70px] text-center">구분</TableHead>
            <TableHead className="text-center">차량번호</TableHead>
            <TableHead className="text-center">모델</TableHead>
            <TableHead className="w-[70px] text-center">상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qcdata.map((data) => (
            <TableRow key={data.ASSETNO} className="">
              <TableCell className="font-medium text-center">
                {data.GUBUN}
              </TableCell>
              <TableCell className="text-center">{data.CARNO}</TableCell>
              <TableCell className="text-center">{data.MODEL}</TableCell>
              <TableCell className="w-[70px] text-center">
                {data.STATUS}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex fixed bottom-4 right-4 w-[180px]">
        <Button className="w-[180px]">입력</Button>
      </div>
      <div className="h-14"></div>
    </div>
  );
};

export default CompQC;
