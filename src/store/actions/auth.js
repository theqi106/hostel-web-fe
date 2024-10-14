import actionType from "./actionType";
import { apiLogin, apiRegister } from "../../services/auth";

export const register = (payload) => async (dispath) => {
  try {
    const response = await apiRegister(payload);
    if (response?.data.err === 0) {
      dispath({
        type: actionType.REGISTER_SUCCES,
        data: response.data.token,
      });
    } else {
      dispath({
        type: actionType.REGISTER_FAILED,
        data: response.data.msg,
      });
    }
  } catch (e) {
    dispath({
      type: actionType.REGISTER_FAILED,
      data: null,
    });
  }
};
export const login = (payload) => async (dispath) => {
  try {
    const response = await apiLogin(payload);
    if (response?.data.err === 0) {
      dispath({
        type: actionType.LOGIN_SUCCES,
        data: response.data.token,
      });
    } else {
      dispath({
        type: actionType.LOGIN_FAILED,
        data: response.data.msg,
      });
    }
  } catch (e) {
    dispath({
      type: actionType.LOGIN_FAILED,
      data: null,
    });
  }
};
export const logout = () =>({
    type: actionType.LOGOUT
})
