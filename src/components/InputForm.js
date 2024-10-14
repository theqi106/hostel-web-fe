import React, { memo } from "react";

export const InputForm = ({
  lable,
  value,
  setValue,
  keyPayload,
  invalidField,
  setInvalidField,
  type,
}) => {
  return (
    <div>
      <label htmlFor="phone" className="text-xs">
        {lable}
      </label>
      <input
        type={type || "text"}
        id="phone"
        className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
        value={value}
        onChange={(e) => {
          setValue((prev) => ({ ...prev, [keyPayload]: e.target.value }));
        }}
        onFocus={() => setInvalidField([])}
      />
      {invalidField.length > 0 &&
        invalidField.some((i) => i.name === keyPayload) && (
          <small className="text-red-500 italic">
            {invalidField.find((i) => i.name === keyPayload)?.msg}
          </small>
        )}
    </div>
  );
};
export default memo(InputForm);
