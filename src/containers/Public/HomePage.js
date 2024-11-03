import React from "react";
import { text } from "../../ultils/constants";
import { Province, ItemSideBar, RelatedPost } from "../../components/index";
import { List, Pagination } from "./index";
import { useSelector } from "react-redux";
const HomePage = () => {
  const { categories, prices, acreages } = useSelector((state) => state.app);

  return (
    <div className=" w-full flex flex-col gap-3">
      <div className="items-center justify-center text-center">
        <h1 className="text-[28px] font-bold ">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSideBar content={categories} title="Danh sách cho thuê" />
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
          <RelatedPost/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
