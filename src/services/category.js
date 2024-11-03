import axiosConfig from "../axiosConfig";

export const apiGetCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/category/all",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
