export type QCDataType = {
  ASSETNO: string;
  CARNO: string;
  MODEL: string;
  CNAME: string;
  실행번호: string;
  입고사유: '만기종료' | '중도반납' | '중도회수' | '기타' | string;
};

export type QCDataResponse = {
  data: {
    result: { MSGE: string; CODE: string };
    data: { REPT: QCDataType[] };
  };
  reqCode: [{ HR58: string[] }, any[]];
};
