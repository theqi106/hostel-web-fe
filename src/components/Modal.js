import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icons";
import { getNumbers, getNumbersAcreage } from "../ultils/formatFunc/getNumber";
import {
  getCodesForPrice,
  getCodesForAcreage,
} from "../ultils/formatFunc/getCodes";
const { FaArrowLeftLong } = icons;

const Modal = ({
  setIsShowModal,
  content,
  name,
  handleSubmit,
  queries,
  arrMinMax,
  defaultText,
}) => {
  const [percent1, setPercent1] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[0]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[0]
      : 0
  );
  const [percent2, setPercent2] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[1]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[1]
      : 100
  );
  const [activeEl, setActiveEl] = useState("");

  useEffect(() => {
    const activeTrackEle = document.getElementById("track-active");
    if (activeTrackEle) {
      let minPercent = percent2 <= percent1 ? percent2 : percent1;
      activeTrackEle.style.left = `${minPercent}%`;
      let maxPercent = percent2 <= percent1 ? 100 - percent1 : 100 - percent2;
      activeTrackEle.style.right = `${maxPercent}%`;
    }
  }, [percent1, percent2]);

  const handleClickStack = (e, value) => {
    const stackEl = document.getElementById("track");
    const stackRect = stackEl.getBoundingClientRect();
    let percent = value
      ? value
      : Math.round(((e.clientX - stackRect.left) * 100) / stackRect.width, 0);
    if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
      setPercent1(percent);
    } else {
      setPercent2(percent);
    }
  };

  const convert100ToTarget = (percent) => {
    return name === "price"
      ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
      : name === "acreage"
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
      : 0;
  };
  const convertTo100 = (percent) => {
    let target = name === "price" ? 15 : name === "acreage" ? 90 : 1;

    return Math.floor((percent / target) * 100);
  };
  const handlePrice = (code, value) => {
    setActiveEl(code);
    let arrMaxMin =
      name === "price" ? getNumbers(value) : getNumbersAcreage(value);
    if (arrMaxMin?.length === 1) {
      if (arrMaxMin[0] === 1) {
        setPercent1(0);
        setPercent2(convertTo100(1));
      }
      if (arrMaxMin[0] === 15) {
        setPercent1(100);
        setPercent2(100);
      }
      if (arrMaxMin[0] === 20) {
        setPercent1(0);
        setPercent2(convertTo100(20));
      }
      if (arrMaxMin[0] === 90) {
        setPercent1(100);
        setPercent2(100);
      }
    }
    if (arrMaxMin?.length === 2) {
      setPercent1(convertTo100(arrMaxMin[0]));
      setPercent2(convertTo100(arrMaxMin[1]));
    }
  };
  const handleBeforeSubmit = (e) => {
    let min = percent1 <= percent2 ? percent1 : percent2;
    let max = percent1 <= percent2 ? percent2 : percent1;
    let arrMinMax =
      percent1 === percent2 && percent1 === 100
        ? [convert100ToTarget(min), 99999]
        : percent1 < percent2
        ? [convert100ToTarget(min), convert100ToTarget(max)]
        : [convert100ToTarget(max), convert100ToTarget(min)];
    handleSubmit(
      e,
      {
        [`${name}Number`]: arrMinMax,
        [name]: `Từ ${convert100ToTarget(min)} - ${
          percent1 === percent2 && percent1 === 100
            ? ""
            : `${convert100ToTarget(max)}`
        } ${name === "price" ? "triệu" : "m2"} ${
          percent1 === percent2 && percent1 === 100 ? "trở lên" : ""
        }`,
      },
      {
        [`${name}Arr`]: [min, max],
      }
    );
  };
  return (
    <div
      onClick={() => {
        setIsShowModal(false);
      }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
        className="w-2/5 h-[500px] bg-white rounded-md relative"
      >
        <div className="h-[45px] flex px-4 items-center border-b border-gray-300">
          <span
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
          >
            <FaArrowLeftLong size={20} />
          </span>
        </div>
        {(name === "category" || name === "province") && (
          <div className="p-4 flex flex-col">
            <span className="py-2 flex gap-2 items-center border-b border-gray-300">
              <input
                type="radio"
                name={name}
                id="default"
                value={defaultText || ""}
                checked={!queries[`${name}Code`] ? true : false}
                onClick={(e) => {
                  handleSubmit(e, {
                    [name]: defaultText,
                    [`${name}Code:`]: null,
                  });
                }}
              />
              <label htmlFor="default">{defaultText}</label>
            </span>
            {content?.map((item) => {
              return (
                <span
                  key={item?.code}
                  className="py-2 flex gap-2 items-center border-b border-gray-300"
                >
                  <input
                    type="radio"
                    name={name}
                    id={item?.code}
                    value={item?.code}
                    checked={
                      item.code === queries[`${name}Code`] ? true : false
                    }
                    onClick={(e) => {
                      handleSubmit(e, {
                        [name]: item?.value,
                        [`${name}Code`]: item?.code,
                      });
                    }}
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              );
            })}
          </div>
        )}
        {(name === "price" || name === "acreage") && (
          <div className="p-12 py-20">
            <div className="flex flex-col items-center justify-center relative">
              <div className="z-30 absolute top-[-48px] font-semibold text-xl text-orange-600">
                {percent1 === 100 && percent2 === 100
                  ? `Trên ${convert100ToTarget(percent1)} ${
                      name === "price" ? "triệu" : "m2"
                    }`
                  : `Từ ${
                      percent1 <= percent2
                        ? convert100ToTarget(percent1)
                        : convert100ToTarget(percent2)
                    } - ${
                      percent2 >= percent1
                        ? convert100ToTarget(percent2)
                        : convert100ToTarget(percent1)
                    } ${name === "price" ? "triệu" : "m2"}+`}
              </div>
              <div
                onClick={handleClickStack}
                id="track"
                className="slider-track h-[5px] absolute top-0 bot-0 w-full bg-gray-300 rounded-full"
              ></div>
              <div
                onClick={handleClickStack}
                id="track-active"
                className="slider-track-active h-[5px] absolute top-0 bot-0 right-0 bg-orange-500 rounded-full"
              ></div>
              <input
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                type="range"
                max="100"
                min="0"
                value={percent1}
                onChange={(e) => {
                  setPercent1(+e.target.value);
                  activeEl && setActiveEl("");
                }}
                step="1"
              />
              <input
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                type="range"
                max="100"
                min="0"
                value={percent2}
                onChange={(e) => {
                  setPercent2(+e.target.value);
                  activeEl && setActiveEl("");
                }}
                step="1"
              />
              <div className="absolute z-30 top-4 left-0 right-0 flex justify-between items-center">
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickStack(e, 0);
                  }}
                >
                  0
                </span>
                <span
                  className="mr-[-12px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickStack(e, 100);
                  }}
                >
                  {name === "price" ? "15 triệu +" : "Trên 90m2"}
                </span>
              </div>
            </div>
            <div className="mt-24">
              <h4 className="font-medium mb-4 m-4">Chọn nhanh:</h4>
              <div className="flex gap-2 items-center flex-wrap w-full">
                {content?.map((item) => {
                  return (
                    <button
                      key={item?.code}
                      onClick={() => {
                        handlePrice(item?.code, item?.value);
                      }}
                      className={`px-4 py-2 rounded-md cursor-pointer ${
                        item?.code === activeEl
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {item?.value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {(name === "price" || name === "acreage") && (
          <button
            type="button"
            className="w-full absolute bottom-0 bg-orange-400 py-2 font-medium rounđe-bl-md rounded-br-md"
            onClick={handleBeforeSubmit}
          >
            Áp dụng
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Modal);
