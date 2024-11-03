import React, { useState } from "react";
import { InputForm, Button } from "../../components/";
import Swal from "sweetalert2";
const Contact = () => {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });
  const handleSubmid = () => {
    Swal.fire(
      `Thanks ${payload.name ? payload.name : ""}!`,
      "Phản hồi của bạn đã được ghi nhận. Cảm ơn vì đóng góp của bạn!",
      "success"
    ).then(() => {
      setPayload({
        name: "",
        phone: "",
        content: "",
      });
    });
  };
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold my-6">Liên hệ với chúng tôi</h1>
      <div className="flex gap-4 w-full">
        <div className="flex-1 flex flex-col gap-4 h-fit bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-4 text-white w-[50%]">
          <h4 className="font-medium ">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn FHostel
          </span>
          <span>Điện thoại: 0867438577</span>
          <span>Email: cskh.fhostel@gmail.com</span>
          <span>Zalo: 0867438577</span>
          <span>Facebook : https://www.facebook.com/vi.tothe.3</span>
          <span>
            Địa chỉ: Đâu đó, Thành phố Qui Nhơn,tỉnh Bình Định, Việt Nam.
          </span>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-md p-4 w-[50%] mb-6">
          <h4 className="font-medium text-lg mb-4 ">Liên hệ trực tiếp</h4>
          <div className="flex flex-col gap-6">
            <InputForm
              lable="HỌ TÊN CỦA BẠN"
              value={payload?.name}
              setValue={setPayload}
              keyPayload="name"
            />
            <InputForm
              lable="SỐ ĐIỆN THOẠI"
              value={payload?.phone}
              setValue={setPayload}
              keyPayload="phone"
            />
            <div>
              <label htmlFor="description">NỘI DUNG</label>
              <textarea
                id="description"
                cols="30"
                rows="3"
                className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                value={payload?.content}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...payload,
                    content: e.target.value,
                  }))
                }
                name="content"
              />
            </div>
            <Button
              text="Gửi liên hệ"
              bgColor="bg-blue-500"
              textColor="text-white"
              fullWidth
              onClick={handleSubmid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
