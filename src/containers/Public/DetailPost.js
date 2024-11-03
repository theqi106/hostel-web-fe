import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions";
import { Slider, Map, BoxInfo, RelatedPost } from "../../components";
import icons from "../../ultils/icons";
import { underMap } from "../../ultils/constants";
import { useNavigate, createSearchParams } from "react-router-dom";
import { path } from "../../ultils/constants";
const { FaLocationDot, GiMoneyStack, LiaCropSolid, CiStopwatch, CiHashtag } =
  icons;

const DetailPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  console.log(posts);
  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }));
  }, [postId]);
  const handleFilterLabel = () => {
    const titleSearch = `Tìm kiếm tin đăng theo chuyên mục: ${posts[0]?.label?.value}`;
    navigate(
      {
        pathname: `/${path.SEARCH}`,
        search: createSearchParams({
          labelCode: posts[0]?.label?.code,
        }).toString(),
      },
      { state: { titleSearch } }
    );
  };
  return (
    <div className="w-full flex gap-4">
      <div className="w-[70%] bg-white rounded-md shadow-md p-4">
        <Slider
          images={
            posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)
          }
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-orange-600">
            {posts[0]?.title}
          </h2>
          <div className="flex items-center gap-2">
            <span>Chuyên mục: </span>
            <span
              className="text-blue-500 underline font-medium hover:text-orange-500 cursor-pointer"
              onClick={() => handleFilterLabel()}
            >
              {posts[0]?.label?.value}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <FaLocationDot color="blue" />
            <span>{posts[0]?.address}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <GiMoneyStack />
              <span className="font-semibold text-lg text-green-600">
                {posts[0]?.attribute?.price}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <LiaCropSolid />
              <span>{posts[0]?.attribute?.acreage}</span>
            </span>
            <span className="flex items-center gap-1">
              <CiStopwatch />
              <span>{posts[0]?.attribute?.publish}</span>
            </span>
            <span className="flex items-center gap-1">
              <CiHashtag />
              <span>{posts[0]?.attribute?.hashtag}</span>
            </span>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold text-xl my-4">Thông tin mô tả</h3>
          <div className="flex flex-col gap-3">
            {posts[0]?.description &&
              (() => {
                const parsedDescription = JSON.parse(posts[0]?.description);
                return Array.isArray(parsedDescription) ? (
                  parsedDescription.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))
                ) : (
                  <span>{parsedDescription}</span>
                );
              })()}
          </div>
        </div>
        <div className="mt-8 w-full">
          <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
          <table className="w-full">
            <tbody className="w-full">
              <tr className="w-full">
                <td className="p-4 ">Mã tin</td>
                <td className="p-4 ">{posts[0]?.overview?.code}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-4 ">Khu vực</td>
                <td className="p-4 ">{posts[0]?.overview?.area}</td>
              </tr>
              <tr className="w-full">
                <td className="p-4 ">Loại tin rao</td>
                <td className="p-4 ">{posts[0]?.overview?.type}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-4 ">Đối tượng</td>
                <td className="p-4 ">{posts[0]?.overview?.target}</td>
              </tr>
              <tr className="w-full">
                <td className="p-4 ">Gói tin</td>
                <td className="p-4 ">{posts[0]?.overview?.bonus}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-4 ">Ngày đăng</td>
                <td className="p-4 ">{posts[0]?.overview?.createdAt}</td>
              </tr>
              <tr className="w-full">
                <td className="p-4 ">Ngày hết hạn</td>
                <td className="p-4 ">{posts[0]?.overview?.expired}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full mt-8">
          <h3 className="font-semibold text-xl my-4">Thông tin liên hệ</h3>
          <table className="w-full">
            <tbody className="w-full">
              <tr className="w-full">
                <td className="p-4 ">Liên hệ</td>
                <td className="p-4 ">{posts[0]?.user?.name}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-4 ">Điện thoại</td>
                <td className="p-4 ">{posts[0]?.user?.phone}</td>
              </tr>
              <tr className="w-full">
                <td className="p-4 ">Zalo</td>
                <td className="p-4 ">{posts[0]?.user?.zalo}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {posts && (
          <div className="mt-8 w-full">
            <h3 className="font-semibold text-xl my-4">Bản đồ</h3>
            <Map address={posts[0]?.address} />
            <span className="text-gray-500 text-sm py-4 text-justify">{`${underMap[0]} `}</span>
            <span className="text-gray-500 text-sm py-4 text-justify italic">{`${posts[0]?.title} - Mã tin: ${posts[0]?.attribute?.hashtag} - `}</span>
            <span className="text-gray-500 text-sm py-4 text-justify">{`${underMap[1]} `}</span>
          </div>
        )}
      </div>
      <div className="w-[30%] flex flex-col gap-8">
        <BoxInfo userData={posts[0]?.user} />
        <RelatedPost />
      </div>
    </div>
  );
};

export default DetailPost;
