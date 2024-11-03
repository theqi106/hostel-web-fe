import actionType from "./actionType";
import * as apis from "../../services/index";

export const getCurrent = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCurrent();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_CURRENT,
        currentData: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_CATEGORIES,
        msg: response.data.msg,
        currentData: null,
      });
      dispatch({
        type: actionType.LOGOUT,
      });
    }
  } catch (e) {
    dispatch({
      type: actionType.GET_CURRENT,
      currentData: null,
      msg: e,
    });
    dispatch({
      type: actionType.LOGOUT,
    });
  }
};
