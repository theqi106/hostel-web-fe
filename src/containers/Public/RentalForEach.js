import React, { useEffect, useState } from "react";
import { text } from "../../ultils/constants";
import { Province, ItemSideBar, RelatedPost } from "../../components/index";
import { List, Pagination } from "./index";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { formatVietNameseToString } from "../../ultils/formatFunc/formartVietnameseToString";
import * as actions from "../../store/actions";
const RentalForEach = () => {
  const { prices, acreages, categories } = useSelector((state) => state.app);
  const [categoryCurrent, setCategoryCurrent] = useState({});
  const location = useLocation();
  const [categoriesCode, setCategoriesCode] = useState("");
  const dispath = useDispatch();
  useEffect(() => {
    const category = categories?.find(
      (item) =>
        `/${formatVietNameseToString(item.value)}` === location?.pathname
    );
    setCategoryCurrent(category);
    if (category) {
      setCategoriesCode(category.code);
    }
  }, [location]);

  return (
    <div>
      <div className=" w-full flex flex-col gap-3">
        <div className="items-center justify-center text-center">
          <h1 className="text-[28px] font-bold ">{categoryCurrent?.header}</h1>
          <p className="text-base text-gray-700">
            {categoryCurrent?.subheader}
          </p>
        </div>
        <Province />
        <div className="w-full flex gap-4">
          <div className="w-[70%]">
            <List categoriesCode={categoriesCode} />
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

export default RentalForEach;
