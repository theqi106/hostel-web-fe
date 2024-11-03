import React from "react";
import { text } from "../ultils/dataContact";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
const Contacts = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-white rounded-md shadow-md p-4 w-3/5 flex flex-col justify-center items-center gap-6">
      <img
        className="w-full h-48 object-contain"
        src={text.image}
        alt="thumbnail"
      />
      <p className="">{text.content}</p>
      <div className="flex items-center justify-around w-full">
        {text.contact.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <span className="text-orange-600 text-[15px] font-bold ">
                {item.text}
              </span>
              <span className="text-blue-900 text-[15px] font-bold">
                {item.phone}
              </span>
              <span className="text-blue-900 text-[15px] font-bold">
                {item.zalo}
              </span>
            </div>
          );
        })}
      </div>
      <Button
        text="Gửi liên hệ"
        bgColor="bg-secondary1"
        textColor="text-white"
        onClick={() => navigate("/lien-he")}
      />
    </div>
  );
};

export default Contacts;
