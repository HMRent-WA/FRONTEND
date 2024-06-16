'use client';

import React from 'react';
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

// FIXME: 더미데이터, useFetch 사용 시 주석 처리
import { qcdata } from '../mock-data';

const InQCNSchema = z.object({
  ENTRYLOCATION: z.string().nonempty('차량 입고 위치를 선택해 주세요.'),
  DETAILLOCATION: z.string().optional(),
  비고: z.string().optional(),
});

type InQCNSchemaType = z.infer<typeof InQCNSchema>;

const InQCNDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const inQCNForm = useForm<InQCNSchemaType>({
    resolver: zodResolver(InQCNSchema),
    defaultValues: {
      ENTRYLOCATION: '',
    },
    mode: 'onChange',
  });

  //   FIXME: 더미데이터, useFetch 사용 시 주석 처리
  const selectedData = qcdata.find((data) => data.ASSETNO === params.ASSETNO);

  if (!selectedData) {
    return <p>해당 데이터가 없습니다.</p>;
  }

  //   FIXME: useFetch 사용 시 주석 해제
  //   const {
  //     data: fetchedData,
  //     loading,
  //     error,
  //     revalidate,
  //   } = useFetch<QCDataResponse>(`${process.env.NEXT_PUBLIC_API_URL}/InQCN/D`);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error.message}</p>;
  //   if (!fetchedData) return <p>No data</p>;

  //   console.log(fetchedData);

  //   const entryLocationList = fetchedData.reqCode[0].HR58;
  //   const apiData: QCDataType[] = fetchedData.data.data.REPT;
  //   const selectedData = apiData.find((data) => data.ASSETNO === params.ASSETNO);

  //   if (!selectedData || !entryLocationList) {
  //     return <p>해당 데이터가 없습니다.</p>;
  //   }

  // POST 요청 예시
  const onInQCNFormSubmit = async (data: InQCNSchemaType) => {
    const formData = new FormData();
    formData.append('ENTRYLOCATION', data.ENTRYLOCATION);
    formData.append('DETAILLOCATION', data.DETAILLOCATION || '');
    formData.append('비고', data.비고 || '');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/InQCN/${params.ASSETNO}`,
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
      // TODO: 토스트 메시지 추가, router.push('/inqcn')
      console.log('Success:', result);
      // revalidate();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="px-4 flex justify-center items-center">
      <Card className="w-full rounded-xl border-slate-200 border-2 mb-24">
        <CardHeader>
          <CardTitle>신차 입고 상세 조회</CardTitle>
          <CardDescription>
            <span className="ml-0.5 text-[#F31515] text-sm font-medium">*</span>
            {' 표시된 곳은 반드시 입력해 주셔야 합니다.'}
          </CardDescription>
        </CardHeader>
        <FormWrapper form={inQCNForm} onSubmit={onInQCNFormSubmit}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">차대번호</Label>
                <p>{selectedData.차대번호}</p>
              </div>
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">자산번호</Label>
                <p>{selectedData.ASSETNO}</p>
              </div>
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">모델명</Label>
                <p>{selectedData.MODEL}</p>
              </div>
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">색상</Label>
                <p>{selectedData.색상}</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 mt-6">
              <FormElement
                formControl={inQCNForm.control}
                name="ENTRYLOCATION"
                label="차량 입고 위치"
                required
              >
                <Controller
                  name="ENTRYLOCATION"
                  control={inQCNForm.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="차량 입고 위치를 선택해 주세요." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem key={'apple'} value={'apple'}>
                            apple
                          </SelectItem>
                          {/* FIXME: useFetch API call */}
                          {/* {entryLocationList.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))} */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormElement>
              <FormElement
                formControl={inQCNForm.control}
                name="DETAILLOCATION"
                label="차량 상세 위치"
              >
                <Input placeholder="" className="h-10" />
              </FormElement>
              <FormElement
                formControl={inQCNForm.control}
                name="비고"
                label="비고"
              >
                <Input placeholder="" className="h-10" />
              </FormElement>
            </div>
          </CardContent>
          <CardFooter className="fixed bottom-0 left-0 w-full p-4">
            <Button
              className="w-full h-12 rounded-lg"
              type="submit"
              disabled={!inQCNForm.formState.isValid}
            >
              입력 완료
            </Button>
          </CardFooter>
        </FormWrapper>
      </Card>
    </div>
  );
};

export default InQCNDetail;
