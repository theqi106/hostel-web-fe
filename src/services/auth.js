import axiosConfig from "../axiosConfig";

export const apiRegister = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/auth/register",
        data: payload,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiLogin = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/auth/login",
        data: payload,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
