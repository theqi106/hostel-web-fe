import React from "react";

const InputReadOnly = ({ label, value, direction, isEditPhone }) => {
  return (
    <div className={`flex ${direction ? direction : "flex-col gap-2"}`}>
      <label htmlFor="exactly-address" className="font-medium w-48 flex-none">
        {label}
      </label>
      <div className="flex-auto w-full">
        <input
          id="exactly-address"
          type="text"
          readOnly
          value={value || ""}
          className="border border-gray-300 outline-none rounded-md bg-gray-200 p-2 flex-auto w-full"
        />
        {isEditPhone && <small className="text-blue-500 py-4">Đổi số điện thoại</small>}
      </div>
    </div>
  );
};

export default InputReadOnly;
