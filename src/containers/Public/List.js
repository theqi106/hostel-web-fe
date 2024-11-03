import React, { useEffect, useState } from "react";
import { Item } from "../../components";
import { getPostsLimit } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
const List = ({ categoriesCode }) => {
  const [loading, setLoading] = useState(false);
  const dispath = useDispatch();
  const [searchParams] = useSearchParams();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });
    if (categoriesCode) searchParamsObject.categoryCode = categoriesCode;
    dispath(getPostsLimit(searchParamsObject));
  }, [searchParams, categoriesCode]);
  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md px-6">
      <div className="flex items-center justify-between my-3">
        <h4 className="text-md font-semibold">Danh sách tin đăng</h4>
        <span>Cập nhật: 12:05 15/10/2024</span>
      </div>
      <div className="flex items-center gap-2 my-2"></div>
      {loading ? (
        <div>Loading...</div> // Hiển thị khi đang load dữ liệu
      ) : (
        <div className="items">
          {posts?.length > 0 &&
            posts.map((item) => {
              return (
                <Item
                  key={item._id}
                  address={item.address}
                  attributes={item.attribute}
                  description={JSON.parse(item.description)}
                  images={JSON.parse(item?.images?.image)}
                  star={+item.star}
                  title={item.title}
                  user={item.user}
                  id={item._id}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default List;
