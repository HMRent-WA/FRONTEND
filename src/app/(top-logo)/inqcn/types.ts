export type QCDataType = {
  ASSETNO: string;
  차대번호: string;
  MODEL: string;
  색상: string;
};

export type QCDataResponse = {
  data: {
    result: { MSGE: string; CODE: string };
    data: { REPT: QCDataType[] };
  };
  reqCode: [{ HR58: string[] }, any[]];
};
