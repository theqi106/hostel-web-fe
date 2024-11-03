import axios from "../axiosConfig";
import axiosDefault from "axios";
export const apiGetPrice = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: "/price/all",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiGetAcreage = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: "/acreage/all",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiGetProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: "/province/all",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiGetPublicProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "GET",
        url: "https://vapi.vnappmob.com/api/province/",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiGetPublicDistrict = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "GET",
        url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
