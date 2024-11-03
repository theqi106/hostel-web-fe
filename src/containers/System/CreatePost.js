import React, { useEffect, useState } from "react";
import { Overview, Address, Loading, Button, Map } from "../../components";
import { apiUpdatePost, apiUploadImages } from "../../services";
import { useSelector, useDispatch } from "react-redux";
import icons from "../../ultils/icons";
import {
  getCodesForPrice,
  getCodesForAcreage,
} from "../../ultils/formatFunc/getCodes";
import { apiCreatePost } from "../../services";
import Swal from "sweetalert2";
import validate from "../../ultils/validateField";
import { resetEditData } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { attention } from "../../ultils/constants";
const { MdDelete, FcCamera } = icons;
const CreatePost = ({ isEdit }) => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const { dataEdit } = useSelector((state) => state.post);
  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || "",
      title: dataEdit?.title || "",
      priceNumber: dataEdit?.priceNumber * 1000000 || 0,
      acreageNumber: dataEdit?.acreageNumber || 0,
      images: dataEdit?.images?.image
        ? JSON.parse(dataEdit?.images?.image)
        : "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      acreageCode: dataEdit?.acreageCode || "",
      description: dataEdit?.description
        ? JSON.parse(dataEdit?.description)
        : "",
      target: dataEdit?.overview?.target || "",
      province: dataEdit?.province || "",
      category: dataEdit?.category || "",
      label: dataEdit?.label || "",
    };
    return initData;
  });
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { prices, acreages, categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const [invalidField, setInvalidField] = useState([]);
  useEffect(() => {
    if (dataEdit) {
      let images = dataEdit?.images?.image
        ? JSON.parse(dataEdit?.images?.image)
        : "";
      images && setImagesPreview(images);
    }
  }, [dataEdit]);
  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );
      let response = await apiUploadImages(formData);
      if (response.status === 200)
        images = [...images, response.data?.secure_url];
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
    setPayload((prev) => ({ ...prev, images: [...prev.images, ...images] }));
  };
  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };
  const handleSubmit = async () => {
    let priceCodeArr = getCodesForPrice(
      +payload.priceNumber / Math.pow(10, 6),
      prices,
      1,
      15
    );
    let priceCode = priceCodeArr[priceCodeArr?.length - 1]?.code;
    let acreageCodeArr = getCodesForAcreage(
      +payload.acreageNumber,
      acreages,
      0,
      90
    );
    let acreageCode = acreageCodeArr[0]?.code;
    let finalPayload = {
      ...payload,
      priceCode,
      acreageCode,
      userId: currentData._id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      target: payload.target || "Tất cả",
      label: `${
        categories?.find((item) => item.code === payload?.categoryCode)?.value
      } ${payload?.address?.split(",")[0]}`,
      category: `${
        categories?.find((item) => item.code === payload?.categoryCode)?.value
      }`,
    };
    const result = validate(finalPayload, setInvalidField);
    if (result === 0) {
      if (dataEdit && isEdit) {
        finalPayload.postId = dataEdit._id;
        finalPayload.attributeId = dataEdit?.attribute?._id;
        finalPayload.overviewId = dataEdit?.overview?._id;
        finalPayload.imageId = dataEdit?.images?._id;

        const response = await apiUpdatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire(
            "Thành công",
            "Đã chỉnh sửa bài đăng thành công",
            "success"
          ).then(() => {
            resetPayload();
            dispath(resetEditData());
          });
        } else {
          Swal.fire("Oops", "Có lỗi gì đó, vui lòng check lại", "error");
        }
      } else {
        const response = await apiCreatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire("Thành công", "Đã thêm bài đăng mới", "success").then(
            () => {
              resetPayload();
              navigate("/");
            }
          );
        } else {
          Swal.fire("Oops", "Có lỗi gì đó, vui lòng check lại", "error");
        }
      }
    }
  };
  const resetPayload = () => {
    setPayload({
      categoryCode: "",
      title: "",
      priceNumber: 0,
      acreageNumber: 0,
      images: "",
      address: "",
      priceCode: "",
      acreageCode: "",
      description: "",
      target: "",
      province: "",
      category: "",
      label: "",
    });
  };
  return (
    <div className="px-6">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto w-full">
          <Address
            invalidField={invalidField}
            setInvalidField={setInvalidField}
            payload={payload}
            setPayload={setPayload}
          />
          <Overview
            invalidField={invalidField}
            setInvalidField={setInvalidField}
            payload={payload}
            setPayload={setPayload}
          />
          <div className="w-full mb-6">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full">
              <label
                className="w-full h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-2 border-dashed rounded-md"
                htmlFor="file"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <FcCamera size={50} />
                    Thêm ảnh
                  </div>
                )}
              </label>
              <input
                hidden
                type="file"
                id="file"
                multiple
                onChange={handleFiles}
              />
              <small className="text-red-500 block w-full">
                {invalidField?.some((item) => item.name === "images") &&
                  invalidField?.find((item) => item.name === "images")?.msg}
              </small>
              <div className="w-full">
                <h3 className="font-medium py-4">Ảnh đã chọn </h3>
                <div className="flex gap-4 items-center">
                  {imagesPreview?.map((item) => {
                    return (
                      <div key={item} className="relative w-1/4 h-1/4 gap-2">
                        <img
                          src={item}
                          alt="preview"
                          className=" object-cover rounded-md w-full h-full border border-gray-300"
                        />
                        <span
                          title="delete"
                          className="absolute top-0 right-0 p-2 cursor-pointer hover:bg-gray-300 rounded-full"
                          onClick={() => handleDeleteImage(item)}
                        >
                          <MdDelete size={24} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Button
            text={!isEdit ? "Tạo mới bài viết" : "Chỉnh sửa bài viết"}
            bgColor="bg-green-700"
            textColor="text-white"
            onClick={handleSubmit}
          />
          <div className="h-[500px]"></div>
        </div>
        <div className="w-[40%] flex-none pt-12">
          <Map address={payload?.address} />
          <div className="mt-8 bg-orange-100 text-orange-900 p-4 rounded-md">
            <h4 className="text-xl font-medium mb-4">Lưu ý tin đăng:</h4>
            <ul>
              <div className="text-sm list-disc pl-6 text-justify">
                {attention?.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
