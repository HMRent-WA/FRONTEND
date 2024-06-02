'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';

const ResvlistDetail: React.FC = () => {
  const [apiData, setApiData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // GET 요청 예시
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data'); // API 엔드포인트를 적절히 변경하세요.
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        setError('There was a problem with the fetch operation.');
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

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
              <p>출고(실행)</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">차량 번호</Label>
              <p>175호1234</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">고객명</Label>
              <p>김철수</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">연락처</Label>
              <p>01012341234</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">회수 사유</Label>
              <p>중도회수</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">회수 상세 사유</Label>
              <p>연체</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">요청자</Label>
              <p>이연수</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">요청 일시</Label>
              <p>2024. 05. 15.</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">회수 요청 경과일</Label>
              <p>+1</p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">회수 완료 일시</Label>
              <p></p>
            </div>
            <div className="flex items-center justify-between h-10">
              <Label className="font-semibold">렌탈 방식</Label>
              <p>장기렌트</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResvlistDetail;
