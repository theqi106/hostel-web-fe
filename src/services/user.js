import axios from "../axiosConfig";

export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: "/user/get-current",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiUpdateUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: "/user/",
        data: payload,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
