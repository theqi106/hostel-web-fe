import React, { useCallback, useEffect, useState } from "react";
import { SearchComponent, Modal } from "../../components";
import icons from "../../ultils/icons";
import { useSelector } from "react-redux";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { path } from "../../ultils/constants";
const {
  MdOutlineNavigateNext,
  CiLocationOn,
  GiMoneyStack,
  LiaCropSolid,
  BsBuildings,
  CiSearch,
} = icons;
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const { provinces, acreages, prices, categories } = useSelector(
    (state) => state.app
  );
  const [queries, setQueries] = useState();
  const [arrMinMax, setArrMinMax] = useState({});
  const [defaultText, setDefaultText] = useState("");
  useEffect(() => {
    if (!location?.pathname.includes(path.SEARCH)) {
      setArrMinMax({});
      setQueries({});
    }
  }, [location]);
  const handleShowModal = (content, name, defaultText) => {
    setContent(content);
    setDefaultText(defaultText);
    setName(name);
    setIsShowModal(true);
  };
  const handleSubmit = useCallback(
    (e, query, arrMinMax) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      setIsShowModal(false);
      arrMinMax && setArrMinMax((prev) => ({ ...prev, ...arrMinMax }));
    },
    [isShowModal, queries]
  );
  const handleSearch = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Number") || item[0].includes("Code"))
      .filter((item) => item[1]);
    let queryCodeObj = {};
    queryCodes.forEach((item) => {
      queryCodeObj[item[0]] = item[1];
    });
    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );
    let queryTextObj = {};
    queryText.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });
    let titleSearch = `${
      queryTextObj.category ? queryTextObj.category : "Cho thuê tất cả"
    } ${queryTextObj.province ? `tỉnh ${queryTextObj.province}` : ""} ${
      queryTextObj.price ? `giá ${queryTextObj.price}` : ""
    } ${queryTextObj.acreage ? `diện tích ${queryTextObj.acreage}` : ""} `;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams(queryCodeObj).toString(),
      },
      { state: { titleSearch } }
    );
  };

  return (
    <>
      <div className="w-3/5 my-3 p-[10px] bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2">
        <span
          onClick={() => {
            handleShowModal(categories, "category", "Tìm tất cả");
          }}
          className="flex-1 cursor-pointer"
        >
          <SearchComponent
            IconBefore={<BsBuildings />}
            IconAfter={<MdOutlineNavigateNext />}
            text={queries?.category}
            defaults={"Tìm tất cả"}
          />
        </span>
        <span
          onClick={() => {
            handleShowModal(provinces, "province", "Toàn quốc");
          }}
          className="flex-1 cursor-pointer"
        >
          <SearchComponent
            IconBefore={<CiLocationOn />}
            IconAfter={<MdOutlineNavigateNext />}
            text={queries?.province}
            defaults={"Toàn quốc"}
          />
        </span>
        <span
          onClick={() => {
            handleShowModal(prices, "price", "Chọn giá");
          }}
          className="flex-1 cursor-pointer"
        >
          <SearchComponent
            IconBefore={<GiMoneyStack />}
            IconAfter={<MdOutlineNavigateNext />}
            text={queries?.price}
            defaults={"Chọn giá"}
          />
        </span>
        <span
          onClick={() => {
            handleShowModal(acreages, "acreage", "Chọn diện tích");
          }}
          className="flex-1 cursor-pointer"
        >
          <SearchComponent
            IconBefore={<LiaCropSolid />}
            IconAfter={<MdOutlineNavigateNext />}
            text={queries?.acreage}
            defaults={"Chọn diện tích"}
          />
        </span>
        <button
          type="button"
          onClick={handleSearch}
          className="flex-1 outline-none py-2 px-4 bg-secondary1 text-[12px] flex items-center justify-center gap-1 text-white font-medium rounded-md"
        >
          <CiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          name={name}
          content={content}
          handleSubmit={handleSubmit}
          queries={queries}
          arrMinMax={arrMinMax}
          defaultText={defaultText}
        />
      )}
    </>
  );
};

export default Search;
