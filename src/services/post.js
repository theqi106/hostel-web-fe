import axiosConfig from "../axiosConfig";
import axios from "axios";

export const apiGetPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/post/all",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiGetPostLimit = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/post/limit`,
        params: query,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiGetPostLimitAdmin = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/post/limit-admin`,
        params: query,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiGetNewPost = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/post/new-post`,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiUploadImages = (images) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "POST",
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
        data: images,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiCreatePost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/post/create-new`,
        data: payload,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiUpdatePost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/post/update-post`,
        data: payload,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiDeletePost = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/post/delete-post`,
        data: { postId },
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
