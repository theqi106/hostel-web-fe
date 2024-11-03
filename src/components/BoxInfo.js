import React, { memo } from "react";
import anonAvatar from "../assets/anon-avatar.png";
import icons from "../ultils/icons";
const { LuDot, FaPhoneAlt, SiZalo } = icons;
const BoxInfo = ({ userData }) => {
  const { name, phone, zalo } = userData || {};
  return (
    <div className="w-full bg-yellow-400 rounded-md flex flex-col items-center p-4 gap-4">
      <img
        src={anonAvatar}
        alt="avatar"
        className="w-16 h-16 object-contain rounded-full"
      />
      <h3 className="font-medium text-xl">{name}</h3>
      <span className="flex items-center">
        <LuDot color="#4CAF50" size={30} />
        <span>Đang hoạt động</span>
      </span>
      <a
        className="bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-semibold"
        href={`tel:${phone}`}
      >
        <FaPhoneAlt />
        {phone}
      </a>
      <a
        className="bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md  font-semibold"
        href={`https://zalo.me/${zalo}`}
      >
        <SiZalo size={35} color="blue" />
      </a>
    </div>
  );
};

export default memo(BoxInfo);
