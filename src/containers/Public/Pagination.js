import React, { useEffect, useState } from "react";
import { PageNumber } from "../../components/index";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { useSearchParams } from "react-router-dom";

const { TbPlayerTrackNext, TbPlayerTrackPrev } = icons;
const Pagination = () => {
  const { count, posts } = useSelector((state) => state.post);
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [searchParam] = useSearchParams();

  useEffect(() => {
    let page = searchParam.get("page");
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParam]);

  useEffect(() => {
    let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POST);
    let end = currentPage + 3 > maxPage ? maxPage : currentPage + 3;
    let start = currentPage - 3 <= 0 ? 1 : currentPage - 3;
    let temp = [];
    for (let i = start; i <= end; i++) {
      temp.push(i);
    }
    setArrPage(temp);
    currentPage + 3 >= maxPage ? setIsHideEnd(true) : setIsHideEnd(false);
    currentPage - 3 <= 1 ? setIsHideStart(true) : setIsHideStart(false);
  }, [count, posts, currentPage]);
  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {!isHideStart && (
        <PageNumber
          icon={<TbPlayerTrackPrev />}
          type="start"
          setCurrentPage={setCurrentPage}
          text={1}
        />
      )}
      {!isHideStart && <PageNumber text={"..."} />}
      {arrPage?.length > 0 &&
        arrPage.map((i) => {
          return (
            <PageNumber
              key={i}
              text={i}
              currentPage={currentPage || 1}
              setCurrentPage={setCurrentPage}
            />
          );
        })}
      {!isHideEnd && <PageNumber text={"..."} />}
      {!isHideEnd && (
        <PageNumber
          icon={<TbPlayerTrackNext />}
          type="end"
          setCurrentPage={setCurrentPage}
          text={Math.ceil(count / posts?.length)}
        />
      )}
    </div>
  );
};

export default Pagination;
