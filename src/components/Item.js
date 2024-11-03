import React, { memo, useState } from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import { formatVietNameseToString } from "../ultils/formatFunc/formartVietnameseToString";
import { path } from "../ultils/constants";
const { FaHeart, FaRegHeart, FaStar, BsFillBookmarkStarFill } = icons;
const Items = ({
  images,
  user,
  title,
  star,
  description,
  attributes,
  address,
  id,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++) {
      stars.push(<FaStar className="star-item" size={15} color="yellow" />);
    }
    return stars;
  };
  return (
    <div className="w-full flex items-start border-t border-orange-600 py-4">
      <Link
        to={`${path.DETAIL}${formatVietNameseToString(
          title?.replaceAll("/", "")
        )}/${id}`}
        className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer"
      >
        {images?.length > 0 ? (
          images
            .filter((i, index) => [...Array(4).keys()].some((i) => i === index))
            ?.map((i, index) => {
              return (
                <img
                  key={index}
                  src={i}
                  alt="review"
                  className="w-[47%] h-[110px] object-cover"
                />
              );
            })
        ) : (
          <div className="w-[100px] h-[110px] bg-gray-200"></div> // Placeholder
        )}
        <span className="bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-1">
          {`${images?.length} ảnh`}
        </span>
        <span
          className="text-white absolute right-5 bottom-2  "
          onMouseEnter={() => {
            setIsHoverHeart(true);
          }}
          onMouseLeave={() => {
            setIsHoverHeart(false);
          }}
        >
          {isHoverHeart ? <FaHeart color="red" /> : <FaRegHeart />}
        </span>
      </Link>
      <div className="w-3/5 ml-[6px]">
        <div className="flex justify-between gap-4 w-full">
          <div className="text-red-600 font-medium">
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((star, number) => {
                return <span key={number}>{star}</span>;
              })}
            {title}
          </div>
          <div className="w-[10%] flex justify-end">
            <BsFillBookmarkStarFill size={20} color="orange" />
          </div>
        </div>
        <div className="my-2 flex items-center justify-between text-sm gap-2">
          <span className="font-bold flex-3 text-green-600 whitespace-nowrap overflow-hidden text-ellipsis">
            {attributes?.price}
          </span>
          <span className="flex-1">{attributes?.acreage}</span>
          <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis">{`${
            address.split(",")[address.split(",")?.length - 2]
          }${address.split(",")[address.split(",")?.length - 1]}`}</span>
        </div>
        <p className="text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden">
          {description}
        </p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTtKDBHoGq6L5htfFMFrluklPkLsQd4e3PAg&s"
              alt="avatar"
              className="w-[30px] h-[30px] object-cover"
            />
            <p>{user.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={`tel:${user?.phone}`}
              className="bg-blue-700 text-white p-1 rounded-md"
              target="_blank"
            >
              {`${user?.phone}`}
            </a>
            <a
              href={`https://zalo.me/${user?.zalo}`}
              className="text-blue-700 p-1 rounded-md border border-blue-700"
              target="_blank"
            >
              Nhắn Zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Items);
