import React, { useEffect } from "react";
import { SmallItem } from "./index";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
const RelatedPost = () => {
  const { newPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getNewPost());
  }, []);
  return (
    <div className="w-full bg-white rounded-md p-4">
      <h3 className="font-semibold text-lg mb-4">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-2">
        {newPosts?.map((item) => {
          return (
            <SmallItem
              key={item._id}
              title={item.title}
              price={item.attribute.price}
              createdAt={item.createdAt}
              img={JSON.parse(item.images.image)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPost;
