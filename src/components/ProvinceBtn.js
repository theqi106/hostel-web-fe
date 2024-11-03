import React, { memo } from "react";
import { path } from "../ultils/constants";
import { useNavigate, createSearchParams } from "react-router-dom";
const ProvinceBtn = ({ name, img, provinceCode }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    const titleSearch = `Cho thuê ${name}, Phòng trọ giá rẻ`;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams({ provinceCode }).toString(),
      },
      { state: { titleSearch } }
    );
  };
  return (
    <div
      className="shadow-md rounded-bl-md rounded-br-md cursor-pointer text-blue-700  hover:text-orange-500"
      onClick={() => {
        handleOnClick();
      }}
    >
      <img
        src={img}
        alt={name}
        className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md"
      />
      <div className="font-medium p-2 text-center">{name}</div>
    </div>
  );
};

export default memo(ProvinceBtn);
