import actionType from "../actions/actionType";
const initState = {
  isLogin: false,
  token: null,
  msg: "",
  update: false,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.REGISTER_SUCCES:
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
      };
    default:
      return state;
  }
};
export default authReducer;
