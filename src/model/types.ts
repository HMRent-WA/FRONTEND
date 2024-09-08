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

export type GPSCHKDataType = {
  ASSETNO: string;
  SEQNO: string;
  REQOUTDT: string;
  REQOUTTM: string;
  CARNO: string;
  CARKND: string;
  LSTRCVDAT: string;
  IGNCTRLCHK: 'T' | 'F';
  FULCTRLCHK: 'T' | 'F';
  CARCHKDAT: string;
  BIGO: string;
};
// "ASSETNO" (자산번호) : "AST2024010101",
// "SEQNO" (탁송순번) : "11",
// "REQOUTDT" (출고희망일자) : "YYYYMMDD",
// "REQOUTTM" (출고희망시간) : "24",
// "CARNO" (차량번호) : "111하1111",
// "CARKND" (차종) : "베뉴",
// "LSTRCVDAT" (최종수신일) : "2024/08/29 00:21:19",
// "IGNCTRLCHK" (시동제어점검) : "T/F",
// "FULCTRLCHK" (점검완료여부) : "T/F",
// "CARCHKDAT" (점검일자) : "YYYYMMDD",
// "BIGO" (비고) : "비고"

// /CARNO (차량번호): 가장 중요한 식별 정보로, 첫 번째로 배치하여 사용자가 쉽게 차량을 식별할 수 있도록 합니다.
// /REQOUTDT (출고희망일자): 차량 출고와 관련된 중요한 정보이므로 두 번째로 배치합니다.
// /REQOUTTM (출고희망시간): 출고 시간을 보여주는 정보로, 출고 희망일자 바로 옆에 배치하면 좋습니다.
// /CARKND (차종): 차량의 종류를 나타내는 정보로, 네 번째로 배치합니다.
// SEQNO (탁송순번): 출고 또는 탁송의 순번으로, 중간 정도에 배치하여 출고 관련 정보를 보충합니다.
// IGNCTRLCHK (시동제어점검): 차량의 시동제어 점검 여부는 안전과 직결된 중요한 정보이므로 그 다음 순위로 배치합니다.
// FULCTRLCHK (점검완료여부): 점검이 완료되었는지 확인할 수 있는 정보로, 시동제어 점검 다음에 배치합니다.
// /LSTRCVDAT (최종수신일): 데이터의 최신성을 확인할 수 있는 정보로, 이후 배치합니다.
// /CARCHKDAT (점검일자): 점검이 이루어진 날짜로, 최종 수신일 이후에 배치합니다.
// BIGO (비고): 기타 메모나 주석은 가장 마지막에 배치합니다.

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
export type GPSCHKDataResponse = BaseResponseType<GPSCHKDataType>;
export type INQCNEWDataResponse = BaseResponseType<INQCNEWDataType>;
export type INQCOLDDataResponse = BaseResponseType<INQCOLDDataType>;
export type ResvlistDataResponse = BaseResponseType<ResvlistDataType>;
export type RetvDataResponse = BaseResponseType<RetvDataType>;

export type AllResponses =
  | COMPQCDataResponse
  | LOCSETDataResponse
  | GPSCHKDataResponse
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
