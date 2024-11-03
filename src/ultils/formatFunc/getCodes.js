import { getNumbers, getNumbersAcreage } from "./getNumber";

export const getCodePrice = (totals, min, max) => {
  let arr = [];
  return totals?.map((item) => {
    let arrMaxMin = getNumbers(item.value);
    return {
      ...item,
      min:
        arrMaxMin?.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : max,
      max:
        arrMaxMin?.length === 2
          ? arrMaxMin[1]
          : arrMaxMin[0] === max
          ? 999999
          : arrMaxMin[0],
    };
  });
};
export const getCodeAcreage = (totals, min, max) => {
  let arr = [];
  return totals?.map((item) => {
    let arrMaxMin = getNumbersAcreage(item.value);
    return {
      ...item,
      min:
        arrMaxMin?.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : max,
      max:
        arrMaxMin?.length === 2
          ? arrMaxMin[1]
          : arrMaxMin[0] === max
          ? 999999
          : arrMaxMin[0],
    };
  });
};

export const getCodesForPrice = (entries, prices, min, max) => {
  const pricesWithMinMax = getCodePrice(prices, min, max);
  return pricesWithMinMax.filter(
    (item) => item.min <= entries && entries < item.max
  );
};
export const getCodesForAcreage = (entries, acreages, min, max) => {
  const acreagesWithMinMax = getCodeAcreage(acreages, min, max);
  return acreagesWithMinMax.filter(
    (item) => item.min <= entries && entries < item.max
  );
};
