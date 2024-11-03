import React, { memo } from "react";
import { text } from "../ultils/dataIntro";
import icons from "../ultils/icons";
import Button from "./Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatVietNameseToString } from "../ultils/formatFunc/formartVietnameseToString";
import { useNavigate } from "react-router-dom";
const { FaStar } = icons;
const stars = [1, 2, 3, 4, 5];
const Intro = () => {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="w-3/5 bg-white rounded-md p-4 gap-4 shadow-md flex flex-col justify-center items-center">
      <h3 className="font-bold text-lg">{text.title}</h3>
      <p className="text-gray-800 text-center my-4 text-sm">
        {text.description}
        <span>
          {categories?.length > 0 &&
            categories.map((item) => {
              return (
                <Link
                  to={`/${formatVietNameseToString(item.value)}`}
                  key={item.code}
                  className="text-blue-500 font-medium hover:text-orange-500"
                >{`${item.value.toLowerCase()}, `}</Link>
              );
            })}
        </span>
        {text.description2}
      </p>
      <div className="flex items-center justify-around w-full">
        {text.statistic.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <h4 className="font-bold text-lg">{item.value}</h4>
              <p className="text-gray-700">{item.name}</p>
            </div>
          );
        })}
      </div>
      <h3 className="font-bold text-lg py-2">{text.price}</h3>
      <div className="flex items-center justify-center gap-1">
        {stars.map((item) => {
          return (
            <span key={item}>
              <FaStar
                color="yellow
              "
                size={22}
              />
            </span>
          );
        })}
      </div>
      <p className="text-gray-600 italic text-center">{text.comment}</p>
      <span className="text-gray-700">{text.author}</span>
      <h3 className="font-bold text-lg py-2">{text.question}</h3>
      <p className="text-gray-800 text-center text-sm">{text.answer}</p>
      <Button
        text="Đăng tin ngay"
        bgColor="bg-secondary2"
        textColor="text-white"
        onClick={() => navigate("/system/tao-moi-bai-dang")}
      />
      <div className="h-12"></div>
    </div>
  );
};

export default memo(Intro);
