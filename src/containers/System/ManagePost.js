import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../store/actions";
import moment from "moment";
import { Button, UpdatePost } from "../../components";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";
const ManagePost = () => {
  const dispath = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { postsOfCurrent, dataEdit } = useSelector((state) => state.post);
  const [updateData, setUpdateData] = useState(false);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(0);
  useEffect(() => {
    setPosts(postsOfCurrent);
  }, [postsOfCurrent]);
  useEffect(() => {
    !dataEdit && dispath(action.getPostsLimitAdmin());
  }, [dataEdit, updateData]);
  const checkStatus = (dateString) => {
    const today = moment().format("DD/MM/YYYY");
    return moment(dateString, "DD/MM/YYYY").isSameOrAfter(
      moment(today, "DD/MM/YYYY")
    );
  };
  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);
  const handleDeletePost = async (postId) => {
    const response = await apiDeletePost(postId);
    if (response.data.err === 0) {
      Swal.fire("Thành công!", "Xóa bài đăng thành công", "success");
      setUpdateData((prev) => !prev);
    } else {
      Swal.fire("Oops!", "Xóa bài đăng không thành công", "error");
    }
  };
  useEffect(() => {
    if (status === 1) {
      const activePost = postsOfCurrent?.filter((item) =>
        checkStatus(item?.overview?.expired?.split(" ")[3])
      );
      setPosts(activePost);
    } else if (status === 2) {
      const expiredPost = postsOfCurrent?.filter(
        (item) => !checkStatus(item?.overview?.expired?.split(" ")[3])
      );
      setPosts(expiredPost);
    } else {
      setPosts(postsOfCurrent);
    }
  }, [status]);
  return (
    <div className="w-full flex flex-col gap-6 ">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lí tin đăng </h1>
        <select
          onChange={(e) => setStatus(+e.target.value)}
          className="outline-none border p-2 border-gray-300 rounded-md"
          value={status}
        >
          <option value="0">Lọc theo trạng thái</option>
          <option value="1">Lọc theo đang hoạt động</option>
          <option value="2">Lọc theo đã hết hạn</option>
        </select>
      </div>
      <table className="w-full table-fixed ">
        <thead>
          <tr className="flex w-full bg-blue-600">
            <th className="border text-white w-full  flex-1 p-2 ">Mã tin</th>
            <th className="border text-white w-full flex-1 p-2 ">
              Ảnh đại diện
            </th>
            <th className="border text-white w-full flex-1 p-2 ">Tiêu đề</th>
            <th className="border text-white w-full flex-1 p-2 ">Giá</th>
            <th className="border text-white w-full flex-1 p-2 ">
              Ngày bắt đầu
            </th>
            <th className="border text-white w-full flex-1 p-2 ">
              Ngày hết hạn
            </th>
            <th className="border text-white w-full flex-1 p-2 ">Trạng thái</th>
            <th className="border text-white w-full flex-1 p-2 ">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {!posts ? (
            <tr>
              <td>12313123</td>
            </tr>
          ) : (
            posts?.map((item) => {
              return (
                <tr key={item._id} className="flex items-center h-16">
                  <td className="border w-full h-full flex items-center justify-center flex-1 text-center p-2 ">
                    {item?.overview?.code}
                  </td>
                  <td className="border w-full h-full flex-1 flex items-center justify-center p-2 ">
                    <img
                      src={JSON.parse(item?.images.image)[0] || ""}
                      alt="avatar-post"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="border w-full h-full flex items-center justify-center flex-1 text-center p-2 ">
                    {` ${item?.title?.slice(0, 40)}...`}
                  </td>
                  <td className="border w-full h-full flex items-center justify-center flex-1 text-center p-2 ">
                    {item?.attribute?.price}
                  </td>
                  <td className="border w-full h-full flex items-center justify-center flex-1 text-center p-2 ">
                    {item?.overview?.createdAt}
                  </td>
                  <td className="border w-full h-full flex items-center justify-center flex-1 text-center p-2 ">
                    {item?.overview?.expired}
                  </td>
                  <td className="border w-full h-full flex items-center justify-center flex-1 text-center p-2 ">
                    {checkStatus(item?.overview?.expired?.split(" ")[3])
                      ? "Đang hoạt động"
                      : "Đã hết hạn"}
                  </td>
                  <td className="text-center p-2 flex items-center border w-full h-full flex-1 justify-center gap-3">
                    <Button
                      text="Sửa"
                      bgColor="bg-green-600"
                      textColor="text-white"
                      onClick={() => {
                        setIsEdit(true);
                        dispath(action.editData(item));
                      }}
                    />
                    <Button
                      text="Xóa"
                      bgColor="bg-red-600"
                      textColor="text-white"
                      onClick={() => handleDeletePost(item?._id)}
                    />
                  </td>
                  <td></td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePost;
