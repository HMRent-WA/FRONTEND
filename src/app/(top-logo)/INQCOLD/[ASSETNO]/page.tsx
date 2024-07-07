'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import FormElement from '@/components/form/form-element';
import FormWrapper from '@/components/form/form-wrapper';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams, useRouter } from 'next/navigation';
import useFetch from '@/hooks/use-fetch';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import {
  INQCOLDDataResponse,
  INQCOLDDataType,
  handleResponse,
} from '@/model/types';
import LoadingPage from '@/components/loading-page';

const INQCOLDSchema = z.object({
  MILEAGE: z.string().refine((val) => !isNaN(Number(val)), {
    message: '주행 거리는 숫자만 입력할 수 있습니다.',
  }),
  ENTRYLOCATION: z.string().nonempty('차량 입고 위치를 선택해 주세요.'),
  DETAILLOCATION: z.string().optional(),
  // FIXME: any는 개선할 수 있으면 좋을 듯.
  IMGLIST: z.any(),
});

type INQCOLDSchemaType = z.infer<typeof INQCOLDSchema>;

const INQCOLDDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const INQCOLDForm = useForm<INQCOLDSchemaType>({
    resolver: zodResolver(INQCOLDSchema),
    mode: 'onChange',
  });

  // FIXME: 아래는 dummy data
  // const fetchedData: INQCOLDDataResponse = {
  //   data: {
  //     result: {
  //       MSGE: 'Request successful',
  //       CODE: '200',
  //     },
  //     data: {
  //       REPT: [
  //         {
  //           SEQNO: '001',
  //           EXENO: 'EX12345',
  //           INRSON: 'John Doe',
  //           ASSETNO: '12345',
  //           CNAME: 'Company A',
  //           CARNO: 'CAR123',
  //           MODEL: 'ModelX',
  //         },
  //         {
  //           SEQNO: '002',
  //           EXENO: 'EX67890',
  //           INRSON: 'Jane Smith',
  //           ASSETNO: '67890',
  //           CNAME: 'Company B',
  //           CARNO: 'CAR456',
  //           MODEL: 'ModelY',
  //         },
  //       ],
  //     },
  //   },
  //   reqCode: [
  //     {
  //       HR58: ['item1', 'item2', 'item3'],
  //     },
  //     {
  //       HR65: ['item4', 'item5', 'item6'],
  //     },
  //   ],
  // };

  const {
    data: fetchedData,
    loading,
    error,
    revalidate,
  } = useFetch<INQCOLDDataResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/INQCOLD`
  );

  if (loading) return <LoadingPage />;
  if (error) return <p className="px-4">Error: {error.message}</p>;
  if (!fetchedData) return <p className="px-4">No data</p>;

  console.log(fetchedData);

  const entryLocationList = fetchedData.reqCode[0].HR58;

  const apiData: INQCOLDDataType[] = [];

  handleResponse(fetchedData, apiData);

  const selectedData = apiData.find((data) => data.ASSETNO === params.ASSETNO);

  if (!selectedData || !entryLocationList) {
    return <p className="px-4">해당 데이터가 없습니다.</p>;
  }

  // FIXME: POST 요청, API 명세서 (swagger) 나온 대로 수정 해야 함. + 스키마도

  // FIXME: INQCOLD POST req
  // ASSETNO
  // SEQNO: string (렌트 횟수 같은 거)
  // MILEAGE
  // ENTRYLOCATION
  // DETAILLOCATION (optional)
  // IMGLIST : string[]

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File change event triggered');
    if (e.target.files) {
      console.log('Files selected: ', e.target.files);
      setSelectedFiles(Array.from(e.target.files));
      console.log('Selected files: ', selectedFiles);
    }
  };

  // FIXME: POST 요청 예시
  const onINQCOLDFormSubmit = async (data: INQCOLDSchemaType) => {
    const formData = new FormData();

    formData.append('ASSETNO', params.ASSETNO.toString());
    formData.append('SEQNO', selectedData.SEQNO);
    formData.append('MILEAGE', data.MILEAGE);
    formData.append('ENTRYLOCATION', data.ENTRYLOCATION);
    formData.append('DETAILLOCATION', data.DETAILLOCATION || '');

    selectedFiles.forEach((image) => {
      formData.append('IMGLIST', image);
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/INQCOLD`,
        {
          method: 'POST',
          body: formData,
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
      router.push('/INQCOLD');
    } catch (error) {
      console.error('Fetch error:', error);
      showErrorToast('요청에 실패하였습니다.');
    }
  };

  return (
    <div className="px-4 flex justify-center items-center">
      <Card className="w-full rounded-xl border-slate-200 border-2 mb-24">
        <CardHeader>
          <CardTitle>재렌트 입고 상세 조회</CardTitle>
          <CardDescription>
            <span className="ml-0.5 text-[#F31515] text-sm font-medium">*</span>
            {' 표시된 곳은 반드시 입력해 주셔야 합니다.'}
          </CardDescription>
        </CardHeader>
        <FormWrapper form={INQCOLDForm} onSubmit={onINQCOLDFormSubmit}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">차량번호</Label>
                <p>{selectedData.CARNO}</p>
              </div>
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">모델명</Label>
                <p>{selectedData.MODEL}</p>
              </div>
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">실행번호</Label>
                <p>{selectedData.EXENO}</p>
              </div>
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">고객명</Label>
                <p>{selectedData.CNAME}</p>
              </div>
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">입고사유</Label>
                <p>{selectedData.INRSON}</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 mt-6">
              <FormElement
                formControl={INQCOLDForm.control}
                name="MILEAGE"
                label="주행 거리 (km)"
                required
              >
                <Input
                  type="number"
                  placeholder="주행거리를 입력해주세요."
                  className="h-10"
                />
              </FormElement>
              <FormElement
                formControl={INQCOLDForm.control}
                name="ENTRYLOCATION"
                label="차량 입고 위치"
                required
              >
                <Controller
                  name="ENTRYLOCATION"
                  control={INQCOLDForm.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="차량 입고 위치를 선택해 주세요." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {entryLocationList.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormElement>
              <FormElement
                formControl={INQCOLDForm.control}
                name="DETAILLOCATION"
                label="차량 상세 위치"
              >
                <Input placeholder="" className="h-10" />
              </FormElement>
              <FormElement
                formControl={INQCOLDForm.control}
                name="IMGLIST"
                label="차량 사진"
                required
                onChange={onFileChange}
              >
                <Input type="file" multiple />
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
              disabled={!INQCOLDForm.formState.isValid || !selectedFiles.length}
            >
              입력 완료
            </Button>
          </CardFooter>
        </FormWrapper>
      </Card>
    </div>
  );
};

export default INQCOLDDetail;
