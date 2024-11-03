import React from "react";
import { ItemSideBar, RelatedPost } from "../../components/index";
import { List, Pagination } from "./index";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const SearchDetail = () => {
  const { prices, acreages } = useSelector((state) => state.app);
  const location = useLocation();

  return (
    <div>
      <div className=" w-full flex flex-col gap-3">
        <div className="items-center justify-center text-center">
          <h1 className="text-[28px] font-bold ">
            {location.state?.titleSearch || "Kết quả tìm kiếm"}
          </h1>
          <p className="text-base text-gray-700">
            {`${
              location.state?.titleSearch || ""
            } phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}
          </p>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-[70%]">
            <List />
            <Pagination />
          </div>
          <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
            <ItemSideBar
              type="priceCode"
              isDouble={true}
              content={prices}
              title="Xem theo giá"
            />
            <ItemSideBar
              type="acreageCode"
              isDouble={true}
              content={acreages}
              title="Xem theo diện tích"
            />
            <RelatedPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDetail;
