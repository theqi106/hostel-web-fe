import React, { memo, useEffect, useState } from "react";
import { Select, InputReadOnly } from "../components";
import { apiGetPublicDistrict, apiGetPublicProvince } from "../services";
import { useSelector } from "react-redux";
const Address = ({ setPayload, invalidField, setInvalidField }) => {
  const { dataEdit } = useSelector((state) => state.post);
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [reset, setReset] = useState(false);
  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address ? dataEdit?.address?.split(",") : [];
      let foundProvince =
        provinces?.length > 0 &&
        provinces?.find(
          (item) =>
            item?.province_name === addressArr[addressArr?.length - 1]?.trim()
        );
      setProvince(foundProvince ? foundProvince.province_id : "");
    }
  }, [provinces, dataEdit]);
  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address ? dataEdit?.address?.split(",") : [];
      let foundDistrict =
        districts?.length > 0 &&
        districts?.find(
          (item) =>
            item.district_name === addressArr[addressArr?.length - 2]?.trim()
        );
      setDistrict(foundDistrict ? foundDistrict.district_id : "");
    }
  }, [districts, dataEdit]);
  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvince();
      if (response?.status === 200) {
        setProvinces(response?.data?.results);
      }
    };
    fetchPublicProvince();
  }, []);
  useEffect(() => {
    setDistrict("");
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response?.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name
            },`
          : ""
      }${
        province
          ? provinces?.find((item) => item.province_id === province)
              ?.province_name
          : ""
      }`,
      province: province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : "",
      categoryCode: prev.categoryCode || "",
      title: prev.title || "",
      priceNumber: prev.priceNumber || 0,
      acreageNumber: prev.acreageNumber || 0,
      images: prev.images || "",
      priceCode: prev.priceCode || "",
      acreageCode: prev.acreageCode || "",
      description: prev.description || "",
      target: prev.target || "",
      category: prev.category || "",
      label: prev.label || "",
    }));
  }, [province, district]);
  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Select
            type="province"
            value={province}
            setValue={setProvince}
            options={provinces}
            label="Tỉnh/Thành phố "
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
          <Select
            reset={reset}
            type="district"
            value={district}
            options={districts}
            setValue={setDistrict}
            label="Quận/Huyện"
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
        </div>
        <InputReadOnly
          label="Địa chỉ chính xác"
          value={`${
            district
              ? `${
                  districts?.find((item) => item?.district_id === district)
                    ?.district_name
                }, `
              : ""
          }${
            province
              ? `${
                  provinces?.find((item) => item?.province_id === province)
                    ?.province_name
                }`
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default memo(Address);
