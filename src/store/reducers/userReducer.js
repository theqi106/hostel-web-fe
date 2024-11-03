import actionType from "../actions/actionType";

const initState = {
  currentData: {},
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_CURRENT:
      return {
        ...state,
        currentData: action.currentData || {},
      };
    case actionType.LOGOUT:
      return {
        ...state,
        currentData: {},
      };

    default:
      return state;
  }
};
export default userReducer;
