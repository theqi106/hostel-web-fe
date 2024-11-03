import React from "react";
import { Select, InputReadOnly, InputFormV2 } from "./";
import { useSelector } from "react-redux";
const Overview = ({ payload, setPayload, invalidField, setInvalidField }) => {
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const { dataEdit } = useSelector((state) => state.post);
  const target = [
    { code: "Nam", value: "Nam" },
    { code: "Nữ", value: "Nữ" },
    { code: "Tất cả", value: "Tất cả" },
  ];
  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-4">
        <div className="w-1/2">
          <Select
            label="Loại chuyên mục"
            options={categories}
            value={payload.categoryCode}
            setValue={setPayload}
            name="categoryCode"
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
        </div>
        <InputFormV2
          label="Tiêu đề"
          value={payload.title}
          setValue={setPayload}
          name="title"
          invalidField={invalidField}
          setInvalidField={setInvalidField}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="des">Nội dung mô tả</label>
          <textarea
            id="des"
            cols="30"
            rows="10"
            className="w-full rounded-md outline-none border border-gray-300 p-2"
            value={payload.description}
            onFocus={() => setInvalidField([])}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                description: e.target.value,
                categoryCode: prev.categoryCode || "",
                title: prev.title || "",
                priceNumber: prev.priceNumber || 0,
                acreageNumber: prev.acreageNumber || 0,
                images: prev.images || "",
                priceCode: prev.priceCode || "",
                acreageCode: prev.acreageCode || "",
                target: prev.target || "",
                address: prev.address || "",
                province: prev.province || "",
                category: prev.category || "",
                label: prev.label || "",
              }));
            }}
          />
          <small className="text-red-500 block w-full">
            {invalidField?.some((item) => item.name === "description") &&
              invalidField?.find((item) => item.name === "description")?.msg}
          </small>
        </div>
        <InputReadOnly
          label="Thông tin liên hệ"
          value={currentData?.name || currentData?.username}
        />
        <div className="w-1/2 flex flex-col gap-4">
          <InputReadOnly label="Điện thoại" value={currentData?.phone} />
          <InputFormV2
            label="Giá cho thuê"
            unit="đồng"
            small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập đủ 1000000"
            name="priceNumber"
            value={payload.priceNumber}
            setValue={setPayload}
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
          <InputFormV2
            label="Diện tích"
            unit="m2"
            name="acreageNumber"
            value={payload.acreageNumber}
            setValue={setPayload}
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
          <Select
            label="Đối tượng cho thuê"
            options={target}
            value={payload?.target}
            setValue={setPayload}
            name="target"
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
