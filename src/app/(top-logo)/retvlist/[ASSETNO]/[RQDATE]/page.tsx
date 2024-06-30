'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import useFetch from '@/hooks/use-fetch';
import { useParams } from 'next/navigation';
import { RetvDataResponse, RetvDataType } from '../../types';
import LoadingPage from '@/components/loading-page';

const RetvlistDetail: React.FC = () => {
  const params = useParams();

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

  // console.log(response);

  const retvdata: RetvDataType[] = response.data.data.REPT;
  const selectedData = retvdata.find(
    (data) => data.ASSETNO === params.ASSETNO && data.RQDATE === params.RQDATE
  );

  if (!selectedData) {
    return <p className="px-4">해당 데이터가 없습니다.</p>;
  }

  console.log(selectedData);

  // ASSETNO: 'AST2020060043';
  // CARNO: '01호2685';
  // CNAME: '윤명옥';
  // MODEL: '컨버전시리즈';
  // PHONE: '01052455796';
  // RCOMPDATE: '20221214';
  // RQDATE: '20221214';
  // RQDDAY: '';
  // RQNAME: '';
  // RRSON: '중도회수';
  // RRSONDTL: '기타';
  // STATUS: '회수완료';

  return (
    <div className="px-4 flex justify-center items-center">
      <Card className="w-full rounded-xl border-slate-200 border-2 mb-24">
        <CardHeader>
          <CardTitle>회수 대상 상세 조회</CardTitle>
          <CardDescription>
            회수 대상 차량의 상세 정보를 조회합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">자산 상태</Label>
              <p>{selectedData.STATUS}</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">차량 번호</Label>
              <p>{selectedData.CARNO}</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">고객명</Label>
              <p>{selectedData.CNAME}</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">연락처</Label>
              <p>{selectedData.PHONE}</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">회수 사유</Label>
              <p>{selectedData.RRSON}</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">회수 상세 사유</Label>
              <p>{selectedData.RRSONDTL}</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">요청자</Label>
              <p>{selectedData.RQNAME}</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">요청 일시</Label>
              <p>{selectedData.RQDATE}</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">회수 요청 경과일</Label>
              <p>{selectedData.RQDDAY}</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">회수 완료 일시</Label>
              <p>{selectedData.RCOMPDATE}</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">렌탈 방식</Label>
              <p>{selectedData?.RTLMTHD}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetvlistDetail;
