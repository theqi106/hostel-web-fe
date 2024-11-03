import React, { memo } from "react";

const SearchComponent = ({ IconBefore, IconAfter, text, defaults}) => {
  return (
    <div className="bg-white py-2 px-4 w-full rounded-md text-gray-500 text-[12px] flex items-center justify-between">
      <div className="flex items-center gap-1 w-full">
        {IconBefore}
        <span className={`w-[100px] ${text ? 'font-semibold text-black':''} overflow-hidden text-ellipsis whitespace-nowrap`}>
          {text || defaults}
        </span>
      </div>
      {IconAfter}
    </div>
  );
};

export default memo(SearchComponent);
