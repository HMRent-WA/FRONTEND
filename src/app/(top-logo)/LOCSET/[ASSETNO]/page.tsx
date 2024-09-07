'use client';

import React, { useEffect } from 'react';
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
import {
  LOCSETDataResponse,
  LOCSETDataType,
  handleResponse,
} from '@/model/types';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import LoadingPage from '@/components/loading-page';
import { LoadingModal } from '@/components/modal/loading-modal';
import { FormMessage } from '@/components/ui/form';

const LOCSETSchema = z.object({
  ENTRYLOCATION: z.string().nonempty('차량 입고 위치를 선택해 주세요.'),
  DETAILLOCATION: z.string().optional(),
});

type LOCSETSchemaType = z.infer<typeof LOCSETSchema>;

const LOCSETDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const {
    data: fetchedData,
    loading,
    error,
    revalidate,
  } = useFetch<LOCSETDataResponse>(`${process.env.NEXT_PUBLIC_API_URL}/LOCSET`);

  const lOCSETForm = useForm<LOCSETSchemaType>({
    resolver: zodResolver(LOCSETSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (fetchedData) {
      const apiData: LOCSETDataType[] = [];
      handleResponse(fetchedData, apiData);
      const selectedData = apiData.find(
        (data) => data.ASSETNO === params.ASSETNO
      );
      if (selectedData) {
        lOCSETForm.reset({
          ENTRYLOCATION: selectedData.ENTRYLOCATION,
          DETAILLOCATION: selectedData.DETAILLOCATION,
        });
      }
    }
  }, [fetchedData, params.ASSETNO, lOCSETForm]);

  if (loading) return <LoadingPage />;
  if (error) return <p className="px-4">Error: {error.message}</p>;
  if (!fetchedData) return <p className="px-4">No data</p>;

  const entryLocationList = fetchedData.reqCode[0].HR58;
  const apiData: LOCSETDataType[] = [];

  handleResponse(fetchedData, apiData);

  const selectedData = apiData.find((data) => data.ASSETNO === params.ASSETNO);

  console.log(selectedData);

  if (!selectedData || !entryLocationList) {
    return <p className="px-4">해당 데이터가 없습니다.</p>;
  }

  const onLOCSETFormSubmit = async (data: LOCSETSchemaType) => {
    const formData = new FormData();

    formData.append('ENTRYLOCATION', data.ENTRYLOCATION);
    formData.append('DETAILLOCATION', data.DETAILLOCATION || '');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/LOCSET/${params.ASSETNO}`,
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

      const result = await response.json();
      showSuccessToast('완료되었습니다.');

      revalidate();
      router.replace('/LOCSET');
    } catch (error) {
      showErrorToast('요청에 실패하였습니다.');
    }
  };

  return (
    <div className="px-4 flex justify-center items-center">
      <Card className="w-full rounded-xl border-slate-200 border-2 mb-24">
        <CardHeader>
          <CardTitle>위치 변경 입력 (공사 중)</CardTitle>
          <CardDescription>
            <span className="ml-0.5 text-[#F31515] text-sm font-medium">*</span>
            {' 표시된 곳은 반드시 입력해 주셔야 합니다.'}
          </CardDescription>
        </CardHeader>
        <FormWrapper form={lOCSETForm} onSubmit={onLOCSETFormSubmit}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">자산 번호</Label>
                <p>{selectedData.ASSETNO}</p>
              </div>
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">차량 번호</Label>
                <p>{selectedData.CARNO}</p>
              </div>
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">모델명</Label>
                <p>{selectedData.MODEL}</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 mt-6">
              <FormElement
                formControl={lOCSETForm.control}
                name="ENTRYLOCATION"
                label="차량 입고 위치"
                required
              >
                <Controller
                  name="ENTRYLOCATION"
                  control={lOCSETForm.control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                      {fieldState.error && <FormMessage />}
                    </>
                  )}
                />
              </FormElement>
              <FormElement
                formControl={lOCSETForm.control}
                name="DETAILLOCATION"
                label="차량 상세 위치"
              >
                <Input placeholder="" className="h-10" />
              </FormElement>
            </div>
          </CardContent>
          <CardFooter className="fixed bottom-0 left-0 w-full p-4 z-10 bg-white">
            <Button
              className="w-full h-12 rounded-lg"
              type="submit"
              disabled={
                !lOCSETForm.formState.isValid ||
                lOCSETForm.formState.isSubmitting
              }
            >
              상품화 완료 (QC)
            </Button>
          </CardFooter>
        </FormWrapper>
      </Card>
      <LoadingModal open={lOCSETForm.formState.isSubmitting} />
    </div>
  );
};

export default LOCSETDetail;
