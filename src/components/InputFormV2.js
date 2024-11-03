import React from "react";

const InputFormV2 = ({
  label,
  unit,
  value,
  setValue,
  name,
  small,
  invalidField,
  setInvalidField,
  direction,
}) => {
  return (
    <div className={`flex ${direction ? direction : "flex-col"}`}>
      <label className="w-48 flex-none" htmlFor="title">
        {label}
      </label>
      <div className="flex items-center flex-col flex-auto w-full">
        <div className="flex items-center w-full">
          <input
            type="text"
            id=" title"
            className={`${
              unit ? "rounded-tl-md rounded-bl-md" : "rounded-md"
            } w-full outline-none border flex-auto border-gray-300 p-2`}
            value={value}
            onFocus={() => setInvalidField || setInvalidField([])}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                [name]: e.target.value,
              }))
            }
          />
          {unit && (
            <span className="p-2 border flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md bg-gray-300">
              {unit}
            </span>
          )}
        </div>
        {invalidField?.some((item) => item.name === name) && (
          <small className="text-red-500 block w-full">
            {invalidField?.find((item) => item.name === name)?.msg}
          </small>
        )}
      </div>
      {small && <small className="opacity-70 whitespace-nowrap">{small}</small>}
    </div>
  );
};

export default InputFormV2;
