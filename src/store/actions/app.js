import actionType from "./actionType";
import * as apis from "../../services/index";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCategories();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_CATEGORIES,
        categories: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_CATEGORIES,
        data: response.data.msg,
        categories: null,
      });
    }
  } catch (e) {
    dispatch({
      type: actionType.GET_CATEGORIES,
      categories: null,
    });
  }
};

export const getPrices = () => async (dispatch) => {
  try {
    const response = await apis.apiGetPrice();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRICE,
        prices: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PRICE,
        msg: response.data.msg,
        prices: null,
      });
    }
  } catch (e) {
    dispatch({
      type: actionType.GET_PRICE,
      prices: null,
      msg: e,
    });
  }
};

export const getAcreage = () => async (dispatch) => {
  try {
    const response = await apis.apiGetAcreage();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_ACREAGE,
        acreages: response.data.response,
        msg: "",
      });
    } else {
      dispatch({
        type: actionType.GET_ACREAGE,
        msg: response.data.msg,
        acreages: null,
      });
    }
  } catch (e) {
    dispatch({
      type: actionType.GET_ACREAGE,
      acreages: null,
      msg: e,
    });
  }
};

export const getProvince = () => async (dispatch) => {
  try {
    const response = await apis.apiGetProvince();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PROVINCES,
        provinces: response.data.response,
        msg: "",
      });
    } else {
      dispatch({
        type: actionType.GET_PROVINCES,
        msg: response.data.msg,
        provinces: null,
      });
    }
  } catch (e) {
    dispatch({
      type: actionType.GET_PROVINCES,
      provinces: null,
      msg: e,
    });
  }
};
