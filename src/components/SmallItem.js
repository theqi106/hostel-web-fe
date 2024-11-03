import React from "react";
import moment from "moment";
import "moment/locale/vi";
const SmallItem = ({ title, img, price, createdAt }) => {
  const formatTime = (createdAt) => {
    moment.locale("vn");
    return moment(createdAt).fromNow();
  };
  return (
    <div className="w-full flex items-center gap-2 py-2 border-b border-gray-300">
      <img
        src={img[0]}
        alt="image"
        className="w-[65px] h-[60px] object-cover flex-none rounded-md"
      />
      <div className="w-full flex-none flex flex-col justify-between gap-2">
        <h4 className="text-blue-500 text-[14px]">{`${title?.slice(
          0,
          35
        )}...`}</h4>
        <div className="flex items-center justify-between w-full text-[11px]">
          <span className="font-medium text-green-500">{price}</span>
          <span className="text-gray-300">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default SmallItem;
