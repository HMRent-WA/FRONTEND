// 각각의 데이터 타입 정의
export type COMPQCDataType = {
  ASSETNO: string;
  CARNO: string;
  CHADAENO: string;
  DETAILLOCATION: string;
  ENTRYLOCATION: string;
  GUBUN: '신차' | '재렌트';
  KEYLOCATION: string;
  KEYQUANT: number;
  KEYTOTAL: number;
  MILEAGE: number;
  MODEL: string;
  STATUS: '상품화' | 'D' | string;
};

export type LOCSETDataType = {
  ASSETNO: string;
  CARNO: string;
  GUBUN: '신차' | '재렌트';
  MODEL: string;
  STATUS: '정비완료' | string;
  DETAILLOCATION: string;
  ENTRYLOCATION: string;
};

export type INQCNEWDataType = {
  COLOR: string;
  ASSETNO: string;
  MODEL: string;
  VIDNO: string;
};

export type INQCOLDDataType = {
  SEQNO: string;
  EXENO: string;
  INRSON: string;
  ASSETNO: string;
  CNAME: string;
  CARNO: string;
  MODEL: string;
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
  RTLMTHD: string;
  MIDTERMDAT: string;
  RETRIEVLOC: string;
  TRANSPCOMP: string;
  TRANSPCOST: string;
  BIGO: string;
  SEQNO: string;
};

// 제네릭 응답 타입 정의
export type BaseResponseType<T> = {
  data: {
    result: { MSGE: string; CODE: string };
    data?: { REPT?: T[] } | T;
  };
  reqCode: [{ HR58: string[] }, { HR65: string[] }];
};

// 제네릭 응답 타입 정의
export type COMPQCDataResponse = BaseResponseType<COMPQCDataType>;
export type LOCSETDataResponse = BaseResponseType<LOCSETDataType>;
export type INQCNEWDataResponse = BaseResponseType<INQCNEWDataType>;
export type INQCOLDDataResponse = BaseResponseType<INQCOLDDataType>;
export type ResvlistDataResponse = BaseResponseType<ResvlistDataType>;
export type RetvDataResponse = BaseResponseType<RetvDataType>;

export type AllResponses =
  | COMPQCDataResponse
  | LOCSETDataResponse
  | INQCNEWDataResponse
  | INQCOLDDataResponse
  | ResvlistDataResponse
  | RetvDataResponse;

// 타입 가드 함수 정의
export function isArrayResponse<T>(
  data: { REPT?: T[] } | T | undefined
): data is { REPT: T[] } {
  return (data as { REPT: T[] })?.REPT !== undefined;
}

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
const exampleResponse: INQCOLDDataResponse = {
  data: {
    result: { MSGE: 'Success', CODE: '200' },
    data: {
      REPT: [
        {
          SEQNO: 'string',
          EXENO: 'string',
          INRSON: 'string',
          ASSETNO: 'string',
          CNAME: 'string',
          CARNO: 'string',
          MODEL: 'string',
        },
      ],
    },
  },
  reqCode: [{ HR58: ['code1'] }, { HR65: ['code2'] }],
};

// FIXME: any 타입 수정 필요
const exampleArray: any[] = [];

handleResponse(exampleResponse, exampleArray);
