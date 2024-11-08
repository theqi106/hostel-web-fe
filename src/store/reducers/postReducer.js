import actionType from "../actions/actionType";
const initState = {
  posts: [],
  msg: "",
  count: 0,
  newPosts: [],
  postsOfCurrent: [],
  dataEdit: null,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_POSTS:
    case actionType.GET_POSTS_LIMIT:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionType.GET_NEW_POST:
      return {
        ...state,
        msg: action.msg || "",
        newPosts: action.newPosts || [],
      };
    case actionType.GET_POSTS_LIMIT_ADMIN:
      return {
        ...state,
        msg: action.msg || "",
        postsOfCurrent: action.posts || [],
      };
    case actionType.EDIT_DATA:
      return {
        ...state,
        dataEdit: action.dataEdit || null,
      };
    case actionType.RESET_DATA_EDIT:
      return {
        ...state,
        dataEdit: null,
      };
    default:
      return state;
  }
};
export default postReducer;
