import actionType from "../actions/actionType";
const initState = {
  msg: "",
  categories: [],
  prices: [],
  acreages: [],
  provinces: [],
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories || [],
        msg: action.msg || "",
      };
    case actionType.GET_PRICE:
      return {
        ...state,
        prices: action.prices || [],
        msg: action.msg || "",
      };
    case actionType.GET_ACREAGE:
      return {
        ...state,
        acreages: action.acreages || [],
        msg: action.msg || "",
      };
    case actionType.GET_PROVINCES:
      return {
        ...state,
        provinces: action.provinces || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};
export default appReducer;
