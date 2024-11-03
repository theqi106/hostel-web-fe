import actionType from "./actionType";
import {
  apiGetPosts,
  apiGetPostLimit,
  apiGetNewPost,
  apiGetPostLimitAdmin,
} from "../../services/post";
export const getPosts = () => async (dispath) => {
  try {
    const response = await apiGetPosts();
    if (response?.data.err === 0) {
      dispath({
        type: actionType.GET_POSTS,
        posts: response.data.response,
      });
    } else {
      dispath({
        type: actionType.GET_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (e) {
    dispath({
      type: actionType.GET_POSTS,
      posts: null,
    });
  }
};

export const getPostsLimit = (query) => async (dispath) => {
  try {
    const response = await apiGetPostLimit(query);
    if (response?.data.err === 0) {
      dispath({
        type: actionType.GET_POSTS_LIMIT,
        posts: response.data.response,
        count: response.data.totalCount,
      });
    } else {
      dispath({
        type: actionType.GET_POSTS_LIMIT,
        msg: response.data.msg,
      });
    }
  } catch (e) {
    dispath({
      type: actionType.GET_POSTS_LIMIT,
      posts: null,
    });
  }
};
export const getPostsLimitAdmin = (query) => async (dispath) => {
  try {
    const response = await apiGetPostLimitAdmin(query);
    if (response?.data.err === 0) {
      dispath({
        type: actionType.GET_POSTS_LIMIT_ADMIN,
        posts: response.data.response,
        count: response.data.totalCount,
      });
    } else {
      dispath({
        type: actionType.GET_POSTS_LIMIT_ADMIN,
        msg: response.data.msg,
        posts: null,
      });
    }
  } catch (e) {
    dispath({
      type: actionType.GET_POSTS_LIMIT_ADMIN,
      posts: null,
    });
  }
};

export const getNewPost = () => async (dispath) => {
  try {
    const response = await apiGetNewPost();
    if (response?.data.err === 0) {
      dispath({
        type: actionType.GET_NEW_POST,
        newPosts: response.data.response,
      });
    } else {
      dispath({
        type: actionType.GET_NEW_POST,
        msg: response.data.msg,
        newPosts: null,
      });
    }
  } catch (e) {
    dispath({
      type: actionType.GET_NEW_POST,
      newPosts: null,
    });
  }
};
export const editData = (dataEdit) => ({
  type: actionType.EDIT_DATA,
  dataEdit,
});
export const resetEditData = () => ({
  type: actionType.RESET_DATA_EDIT,
});
