import React, { useState } from "react";
import { InputReadOnly, InputFormV2, Button } from "../../components";
import anonAvatar from "../../assets/anon-avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { apiUploadImages, apiUpdateUser } from "../../services";
import validate from "../../ultils/validateField";
import { filetToBase64, blobToBase64 } from "../../ultils/toBase64";
import { getCurrent } from "../../store/actions";
import Swal from "sweetalert2";
const EditAccount = () => {
  const dispatch = useDispatch();
  const [invalidField, setInvalidField] = useState([]);
  const { currentData } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    avata: blobToBase64(currentData?.avata) || "",
    fbUrl: currentData?.fbUrl || "",
    zalo: currentData?.zalo || "",
  });
  const handleSubmit = async () => {
    const invalidCounter = validate(payload, setInvalidField);
    if (invalidCounter === 0) {
      const response = await apiUpdateUser(payload);
      if (response?.data.err === 0) {
        Swal.fire("Hoàn tất", "Chỉnh sửa thông tin thành công", "success").then(
          () => {
            dispatch(getCurrent());
          }
        );
      } else {
        Swal.fire("Oops", "Chỉnh sửa thông tin thất bại", "error");
      }
    }
  };
  const handleUploadFile = async (e) => {
    const imageBase64 = await filetToBase64(e?.target?.files[0]);
    console.log(imageBase64);
    setPayload((prev) => ({
      ...prev,
      avata: imageBase64,
    }));
  };
  return (
    <div className="flex flex-col h-full items-center">
      <h1 className="text-3xl w-full text-start font-medium py-4 flex-none border-b border-gray-200">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 flex items-center justify-center flex-auto h-full">
        <div className="w-full py-6 flex flex-col gap-4">
          <InputReadOnly
            value={`#${currentData?._id?.slice(0, 10)}...` || ""}
            label="Mã thành viên"
            direction="flex-row"
          />
          <InputReadOnly
            value={currentData?.phone || ""}
            label="Số điện thoại"
            direction="flex-row"
            isEditPhone
          />
          <InputFormV2
            name="name"
            setValue={setPayload}
            value={payload?.name || ""}
            setInvalidField={setInvalidField}
            invalidField={invalidField}
            direction="flex-row"
            label="Tên hiển thị"
          />
          <InputFormV2
            name="zalo"
            setValue={setPayload}
            value={payload?.zalo || ""}
            setInvalidField={setInvalidField}
            invalidField={invalidField}
            label="Zalo"
            direction="flex-row"
          />
          <InputFormV2
            name="fbUrl"
            setValue={setPayload}
            value={payload?.fbUrl || ""}
            setInvalidField={setInvalidField}
            invalidField={invalidField}
            label="Facebook"
            direction="flex-row"
          />
          <div className="flex">
            <label htmlFor="password" className="w-48 flex-none">
              Mật khẩu
            </label>
            <small className="flex-auto text-blue-500 cursor-pointer w-full h-12">
              Đổi mật khẩu
            </small>
          </div>
          <div className="flex mb-6">
            <label htmlFor="avatar" className="w-48 flex-none">
              Ảnh đại diện
            </label>
            <div>
              <img
                src={payload?.avata || anonAvatar}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover"
              />
              <input
                onChange={handleUploadFile}
                type="file"
                className="appearance-none my-4"
                id="avatar"
              />
            </div>
          </div>
          <Button
            text="Cập nhật"
            bgColor="bg-green-600"
            textColor="text-white"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
