import React, { memo } from "react";
import icons from "../ultils/icons";
import { formatVietNameseToString } from "../ultils/formatFunc/formartVietnameseToString";
import { Link } from "react-router-dom";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

const { MdOutlineNavigateNext } = icons;
const ItemSideBar = ({ content, title, isDouble, type }) => {
  const dispath = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const formatContent = () => {
    const oddElement = content?.filter((item, index) => index % 2 !== 0);
    const evenElement = content?.filter((item, index) => index % 2 === 0);
    const formatContent = oddElement?.map((item, index) => {
      return {
        right: item,
        left: evenElement?.find((item2, index2) => index2 === index),
      };
    });
    return formatContent;
  };
  const handleFilterPosts = (code) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
  };
  return (
    <div className="p-4 rounded-md bg-white w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            content.map((item) => {
              return (
                <Link
                  to={`${formatVietNameseToString(item.value)}`}
                  key={item.code}
                  className="flex gap-2 items-center text-sm font-extralight cursor-pointer hover:text-orange-500 border-b border-gray-200 pb-1 border-dashed"
                >
                  <MdOutlineNavigateNext size={10} color="#CCC" />
                  <p>{item.value}</p>
                </Link>
              );
            })}
        </div>
      )}
      {isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            formatContent(content).map((item, index) => {
              return (
                <div key={index}>
                  <div className="w-full flex items-center justify-around">
                    <div
                      onClick={() => handleFilterPosts(item.left.code)}
                      className="w-full flex flex-1 gap-2 items-center text-sm font-extralight cursor-pointer hover:text-orange-500 border-b border-gray-200 pb-1 border-dashed"
                    >
                      <MdOutlineNavigateNext size={10} color="#CCC" />
                      <p>{item.left.value}</p>
                    </div>
                    <div
                      onClick={() => handleFilterPosts(item.right.code)}
                      className="w-full flex flex-1 gap-2 items-center text-sm font-extralight cursor-pointer hover:text-orange-500 border-b border-gray-200 pb-1 border-dashed"
                    >
                      <MdOutlineNavigateNext size={10} color="#CCC" />
                      <p>{item.right.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default memo(ItemSideBar);
