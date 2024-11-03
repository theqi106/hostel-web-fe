import actionType from "../actions/actionType";
const initState = {
  isLogin: false,
  token: null,
  msg: "",
  update: false,
  msgSuccess: "",
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.REGISTER_SUCCES:
      return {
        ...state,
        isLogin: false,
        token: action.data,
        msg: "",
        msgSuccess: "Register succesfully!",
        update: !state.update,
      };
    case actionType.RESET_MSG_SUCCESS:
      return {
        ...state,
        msgSuccess: "",
      };
    case actionType.LOGIN_SUCCES:
      return {
        ...state,
        isLogin: true,
        token: action.data,
        msg: "",
      };
    case actionType.REGISTER_FAILED:
    case actionType.LOGIN_FAILED:
      return {
        ...state,
        isLogin: false,
        msg: action.data,
        token: null,
        update: !state.update,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        isLogin: false,
        token: null,
        msg: "",
        msgSuccess: "",
      };
    default:
      return state;
  }
};
export default authReducer;
