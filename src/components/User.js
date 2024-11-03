import React from "react";
import { useSelector } from "react-redux";
import anonAvatar from "../assets/anon-avatar.png";
import { blobToBase64 } from "../ultils/toBase64";
const User = () => {
  const { currentData } = useSelector((state) => state.user);

  return (
    <>
      {currentData && Object.keys(currentData).length > 0 && (
        <div className="flex items-center gap-2">
          <img
            src={
              currentData?.avata
                ? blobToBase64(currentData?.avata) || anonAvatar
                : anonAvatar
            }
            alt="avatar"
            className="w-10 object-cover rounded-full h-10 border-2 shadow-md border-white"
          />
          <div className="flex flex-col">
            <span>
              Xin chào,{" "}
              <span className="font-semibold">{currentData?.name}</span>
            </span>
            <span>
              Mã tài khoản:{" "}
              <span className="font-medium">{`${currentData?._id
                ?.match(/\d/g)
                .join("")
                ?.slice(0, 6)}`}</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
