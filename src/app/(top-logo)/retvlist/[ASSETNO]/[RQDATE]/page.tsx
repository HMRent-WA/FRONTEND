'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import useFetch from '@/hooks/use-fetch';
import { useParams, useRouter } from 'next/navigation';
import { RetvDataResponse, RetvDataType, handleResponse } from '@/model/types';
import LoadingPage from '@/components/loading-page';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import FormElement from '@/components/form/form-element';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormWrapper from '@/components/form/form-wrapper';
import { Button } from '@/components/ui/button';

const RETVDetailSchema = z.object({
  // FIXME: any는 개선할 수 있으면 좋을 듯.
  IMGLIST: z.any(),
  BIGO: z.string().optional(),
});

type RETVDetailSchemaType = z.infer<typeof RETVDetailSchema>;

const RetvlistDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const RETVDetailForm = useForm<RETVDetailSchemaType>({
    resolver: zodResolver(RETVDetailSchema),
    mode: 'onChange',
  });

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

  const retvdata: RetvDataType[] = [];
  handleResponse(response, retvdata);

  const selectedData = retvdata.find(
    (data) => data.ASSETNO === params.ASSETNO && data.RQDATE === params.RQDATE
  );

  if (!selectedData) {
    return <p className="px-4">해당 데이터가 없습니다.</p>;
  }

  // console.log(selectedData);

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
  //   "SEQNO" (순번) : "1",
  // "MIDTERMDAT" (중도해지일) : "YYYYMMDD",
  // "RETRIEVLOC" (회수장소) : "충청북도 충주시 번영대로 118, 세원연수아파트 101동과 편의점 사이",
  // "TRANSPCOMP" (탁송회사) : "해피콜서비스",
  // "TRANSPCOST" (탁송비용) : "10000)
  // "BIGO" (비고) : "비고 예시"

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File change event triggered');
    if (e.target.files) {
      console.log('Files selected: ', e.target.files);
      setSelectedFiles(Array.from(e.target.files));
      console.log('Selected files: ', selectedFiles);
    }
  };

  const onRETVDetailFormSubmit = async (data: RETVDetailSchemaType) => {
    const formData = new FormData();

    // FIXME: 이외에 다른 데이터도 같이 POST 해야 하는지??

    formData.append('ASSETNO', params.ASSETNO.toString());
    formData.append('SEQNO', selectedData.SEQNO);
    formData.append('BIGO', data.BIGO || '');

    selectedFiles.forEach((image) => {
      formData.append('IMGLIST', image);
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/retrieval/${params.ASSETNO}/${selectedData.SEQNO}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('요청 완료');
      const result = await response.json();

      console.log('Success:', result);
      showSuccessToast('완료되었습니다.');

      revalidate();
      router.replace('/retvlist');
    } catch (error) {
      console.error('Fetch error:', error);
      showErrorToast('요청에 실패하였습니다.');
    }
  };

  return (
    <div className="px-4 flex justify-center items-center">
      <Card className="w-full rounded-xl border-slate-200 border-2 mb-24">
        <FormWrapper form={RETVDetailForm} onSubmit={onRETVDetailFormSubmit}>
          <CardHeader>
            <CardTitle>회수 대상 상세 조회</CardTitle>
            <CardDescription>
              회수 대상 차량의 상세 정보를 조회합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormElement
              formControl={RETVDetailForm.control}
              name="IMGLIST"
              label="차량 사진"
              // required
              onChange={onFileChange}
            >
              <Input type="file" multiple />
            </FormElement>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">자산 상태</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.STATUS}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">렌탈 방식</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.RTLMTHD}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">차량 번호</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.CARNO}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">고객명</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.CNAME}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">연락처</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.PHONE}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">중도해지일</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.MIDTERMDAT}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">회수 사유</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.RRSON}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">
                  회수 상세 사유
                </Label>
                <p className={'text-balance text-right'}>
                  {selectedData.RRSONDTL}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">회수 장소</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.RETRIEVLOC}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">탁송회사</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.TRANSPCOMP}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">탁송비용</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.TRANSPCOST}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">요청자</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.RQNAME}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">요청 일시</Label>
                <p className={'text-balance text-right'}>
                  {selectedData.RQDATE}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">
                  회수 요청 경과일
                </Label>
                <p className={'text-balance text-right'}>
                  {selectedData.RQDDAY}
                </p>
              </div>
              <div className="flex items-center justify-between gap-x-6 h-10">
                <Label className="font-semibold min-w-fit">
                  회수 완료 일시
                </Label>
                <p className={'text-balance text-right'}>
                  {selectedData.RCOMPDATE}
                </p>
              </div>
              {/* TODO: */}
              <FormElement
                formControl={RETVDetailForm.control}
                name="BIGO"
                label="비고"
              >
                {/* <div className="flex items-center justify-between gap-x-6 h-10 w-full mt-4"> */}
                {/* <Label className="font-semibold min-w-fit">비고</Label> */}
                <Input defaultValue={selectedData.BIGO} className={'w-full'} />
                {/* </div> */}
              </FormElement>
              {selectedFiles.length > 0 && (
                <div className="mt-4">
                  <Label className="font-semibold">업로드된 이미지:</Label>
                  <ul className="list-disc list-inside">
                    {selectedFiles.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="fixed bottom-0 left-0 w-full p-4">
            <Button
              className="w-full h-12 rounded-lg"
              type="submit"
              disabled={
                !RETVDetailForm.formState.isValid ||
                RETVDetailForm.formState.isSubmitting
              }
            >
              입력 완료
            </Button>
          </CardFooter>
        </FormWrapper>
      </Card>
    </div>
  );
};

export default RetvlistDetail;
