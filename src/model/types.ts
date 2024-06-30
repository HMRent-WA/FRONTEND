// 각각의 데이터 타입 정의
export type COMPQCDataType = {
  ASSETNO: string;
  GUBUN: '신차' | '재렌트';
  CARNO: string;
  MODEL: string;
  STATUS: '상품화' | 'D' | string;
};

export type INQCNDataType = {
  ASSETNO: string;
  차대번호: string;
  MODEL: string;
  색상: string;
};

export type INQCRDataType = {
  ASSETNO: string;
  CARNO: string;
  MODEL: string;
  CNAME: string;
  실행번호: string;
  입고사유: '만기종료' | '중도반납' | '중도회수' | '기타' | string;
};

export type ResvlistDataType = {
  ASSETNO: string;
  CARNO: string;
  MODEL: string;
};

export type RetvDataType = {
  ASSETNO: string;
  CARNO: string;
  CNAME: string;
  MODEL: string;
  PHONE: string;
  RCOMPDATE: string;
  RQDATE: string;
  RQDDAY: string;
  RQNAME: string;
  RRSON: string;
  RRSONDTL: string;
  STATUS: string;
  RTLMTHD?: string;
};

// 제네릭 응답 타입 정의
export type BaseResponseType<T> = {
  data: {
    result: { MSGE: string; CODE: string };
    data?: { REPT?: T[] } | T;
  };
  // FIXME: any 타입 수정 필요
  reqCode: [{ HR58: string[] }, any[]];
};

// 제네릭 응답 타입 정의
export type COMPQCDataResponse = BaseResponseType<COMPQCDataType>;
export type INQCNDataResponse = BaseResponseType<INQCNDataType>;
export type INQCRDataResponse = BaseResponseType<INQCRDataType>;
export type ResvlistDataResponse = BaseResponseType<ResvlistDataType>;
export type RetvDataResponse = BaseResponseType<RetvDataType>;

export type AllResponses =
  | COMPQCDataResponse
  | INQCNDataResponse
  | INQCRDataResponse
  | ResvlistDataResponse
  | RetvDataResponse;

// 타입 가드 함수 정의
export function isArrayResponse<T>(
  data: { REPT?: T[] } | T | undefined
): data is { REPT: T[] } {
  return (data as { REPT: T[] })?.REPT !== undefined;
}

// 함수 예제 사용
// FIXME: any 타입 수정 필요
export function handleResponse<T>(response: BaseResponseType<T>, array: any[]) {
  const { data } = response;
  if (data.data) {
    if (isArrayResponse(data.data)) {
      array.push(...data.data.REPT);
    } else {
      // 데이터가 단일 객체일 때의 처리 로직
      array.push(data.data);
    }
  }
}

// 사용 예제
const exampleResponse: INQCNDataResponse = {
  data: {
    result: { MSGE: 'Success', CODE: '200' },
    data: {
      REPT: [
        { ASSETNO: '123', 차대번호: 'ABC123', MODEL: 'ModelX', 색상: 'Red' },
      ],
    },
  },
  reqCode: [{ HR58: ['code1'] }, []],
};

// FIXME: any 타입 수정 필요
const exampleArray: any[] = [];

handleResponse(exampleResponse, exampleArray);
