export type QCDataType = {
  ASSETNO: string;
  GUBUN: '신차' | '재렌트';
  CARNO: string;
  MODEL: string;
  STATUS: '상품화' | 'D' | string;
};

export type QCDataResponse = {
  data: {
    result: { MSGE: string; CODE: string };
    // data: { REPT: QCDataType[] };
    data: QCDataType[];
  };
  reqCode: [{ HR58: string[] }, any[]];
};
