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
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import useFetch from '@/hooks/use-fetch';

import {
  INQCNEWDataResponse,
  INQCNEWDataType,
  handleResponse,
} from '@/model/types';
import LoadingPage from '@/components/loading-page';
import { LoadingModal } from '@/components/modal/loading-modal';
import Compressor from 'compressorjs';

const INQCNEWSchema = z.object({
  MILEAGE: z.string().refine((val) => !isNaN(Number(val)), {
    message: '주행 거리는 숫자만 입력할 수 있습니다.',
  }),
  DEPARTLOCATION: z.string().nonempty('차량 출고 위치를 선택해 주세요.'),
  ENTRYLOCATION: z.string().nonempty('차량 입고 위치를 선택해 주세요.'),
  DETAILLOCATION: z.string().optional(),
  // FIXME: any는 개선할 수 있으면 좋을 듯.
  IMGLIST: z.any(),
});

type INQCNEWSchemaType = z.infer<typeof INQCNEWSchema>;

const INQCNEWDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [resizedImages, setResizedImages] = useState<File[]>([]);

  const INQCNEWForm = useForm<INQCNEWSchemaType>({
    resolver: zodResolver(INQCNEWSchema),
    mode: 'onChange',
  });

  // FIXME: 아래는 더미데이터
  // const fetchedData: INQCNEWDataResponse = {
  //   data: {
  //     result: {
  //       MSGE: 'Request successful',
  //       CODE: '200',
  //     },
  //     data: {
  //       REPT: [
  //         {
  //           COLOR: 'Red',
  //           ASSETNO: '12345',
  //           MODEL: 'ModelX',
  //           VIDNO: 'VID123456',
  //         },
  //         {
  //           COLOR: 'Blue',
  //           ASSETNO: '67890',
  //           MODEL: 'ModelY',
  //           VIDNO: 'VID789012',
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
  } = useFetch<INQCNEWDataResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/INQCNEW`
  );

  if (loading) return <LoadingPage />;
  if (error) return <p className="px-4">Error: {error.message}</p>;
  if (!fetchedData) return <p className="px-4">No data</p>;

  console.log(fetchedData);

  const entryLocationList = fetchedData.reqCode[0].HR58;
  const departLocationList = fetchedData.reqCode[1].HR65;

  const apiData: INQCNEWDataType[] = [];

  handleResponse(fetchedData, apiData);

  const selectedData = apiData.find((data) => data.ASSETNO === params.ASSETNO);

  if (!selectedData || !entryLocationList) {
    return <p className="px-4">해당 데이터가 없습니다.</p>;
  }

  // FIXME: POST 요청, API 명세서 (swagger) 나온 대로 수정 해야 함. + 스키마도

  // FIXME: INQCNEW POST req
  // ASSETNO
  // MILEAGE
  // DEPARTLOCATION
  // ENTRYLOCATION
  // DETAILLOCATION
  // IMGLIST: string[]

  let imageUploadLoading: boolean = false;

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    imageUploadLoading = true;

    if (e.target.files) {
      const files = Array.from(e.target.files);
      const promises = files.map(
        (file) =>
          new Promise<File>((resolve, reject) => {
            new Compressor(file, {
              quality: 0.8, // 이미지 품질 설정
              maxWidth: 800, // 최대 너비 설정
              success(result) {
                // 원본 파일의 확장자를 추출 (기본값을 'jpg'로 설정)
                const extension = file.name.split('.').pop() || 'jpg';

                // 새로운 파일 이름 생성
                const baseName =
                  file.name.substring(0, file.name.lastIndexOf('.')) ||
                  file.name;
                const newName = `${baseName}.${extension}`;

                // 새로운 파일 객체 생성
                const renamedFile = new File([result], newName, {
                  type: result.type,
                  lastModified: Date.now(),
                });

                resolve(renamedFile);
              },
              error(err) {
                reject(err);
                showErrorToast('이미지 처리 중 오류가 발생했습니다.');
              },
            });
          })
      );

      // 리사이징이 완료될 때까지 대기
      const resizedImages = await Promise.all(promises);
      setResizedImages(resizedImages);
      imageUploadLoading = false;
    }
  };

  const onINQCNEWFormSubmit = async (data: INQCNEWSchemaType) => {
    if (imageUploadLoading) {
      showErrorToast('이미지 처리중입니다. 잠시만 기다려주세요');
      return;
    }

    const formData = new FormData();

    formData.append('ASSETNO', params.ASSETNO.toString());
    formData.append('MILEAGE', data.MILEAGE);
    formData.append('DEPARTLOCATION', data.DEPARTLOCATION);
    formData.append('ENTRYLOCATION', data.ENTRYLOCATION);
    formData.append('DETAILLOCATION', data.DETAILLOCATION || '');

    resizedImages.forEach((image) => {
      formData.append('IMGLIST', image);
    });

    console.log(data);
    console.log(data.IMGLIST);
    console.log(typeof data.IMGLIST);

    console.log('FormData IMGLIST: ', formData.getAll('IMGLIST'));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/INQCNEW`,
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
      router.replace('/INQCNEW');
    } catch (error) {
      console.error('Fetch error:', error);
      showErrorToast('요청에 실패하였습니다.');
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
        <FormWrapper form={INQCNEWForm} onSubmit={onINQCNEWFormSubmit}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between h-10">
                <Label className="font-semibold">차대번호</Label>
                <p>{selectedData.VIDNO}</p>
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
                <p>{selectedData.COLOR}</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 mt-6">
              <FormElement
                formControl={INQCNEWForm.control}
                name="IMGLIST"
                label="차량 사진"
                required
                onChange={onFileChange}
              >
                <Input type="file" multiple />
              </FormElement>
              <FormElement
                formControl={INQCNEWForm.control}
                name="MILEAGE"
                label="주행 거리 (km)"
                required
              >
                <Input placeholder="" className="h-10" />
              </FormElement>
              <FormElement
                formControl={INQCNEWForm.control}
                name="DEPARTLOCATION"
                label="차량 출고 위치"
                required
              >
                <Controller
                  name="DEPARTLOCATION"
                  control={INQCNEWForm.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="차량 출고 위치를 선택해 주세요." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {departLocationList.map((item) => (
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
                formControl={INQCNEWForm.control}
                name="ENTRYLOCATION"
                label="차량 입고 위치"
                required
              >
                <Controller
                  name="ENTRYLOCATION"
                  control={INQCNEWForm.control}
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
                formControl={INQCNEWForm.control}
                name="DETAILLOCATION"
                label="차량 상세 위치"
              >
                <Input placeholder="" className="h-10" />
              </FormElement>
              {resizedImages.length > 0 && (
                <div className="mt-4">
                  <Label className="font-semibold">업로드된 이미지:</Label>
                  <ul className="list-disc list-inside">
                    {resizedImages.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="fixed bottom-0 left-0 w-full p-4 z-10 bg-white">
            <Button
              className="w-full h-12 rounded-lg"
              type="submit"
              disabled={
                !INQCNEWForm.formState.isValid ||
                !resizedImages.length ||
                INQCNEWForm.formState.isSubmitting ||
                imageUploadLoading
              }
            >
              {imageUploadLoading ? '이미지 업로드 중입니다.' : '입력 완료'}
            </Button>
          </CardFooter>
        </FormWrapper>
      </Card>
      <LoadingModal open={INQCNEWForm.formState.isSubmitting} />
    </div>
  );
};

export default INQCNEWDetail;
