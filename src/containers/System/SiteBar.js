import React from "react";
import anonAvatar from "../../assets/anon-avatar.png";
import { useSelector, useDispatch } from "react-redux";
import menuSitebar from "../../ultils/menuSitebar";
import { NavLink, useNavigate } from "react-router-dom";
import * as action from "../../store/actions";
import icons from "../../ultils/icons";
import { blobToBase64 } from "../../ultils/toBase64";

const { IoLogOutOutline } = icons;

const activeStyle =
  "bg-gray-300 py-2 flex items-center font-bold gap-2 rounded-md";
const notActiveStyle =
  "hover:bg-gray-200 py-2 flex items-center gap-2 rounded-md cursor-pointer";
const SiteBar = () => {
  const { currentData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-[256px] flex-none p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={
              currentData?.avata
                ? blobToBase64(currentData?.avata) || anonAvatar
                : anonAvatar
            }
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full border-2 border-white "
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{currentData?.name || ""}</span>
            <small>{currentData?.phone}</small>
          </div>
        </div>

        <span>
          Mã thành viên:{" "}
          <span>
            <small className="font-medium">
              {currentData && currentData?._id
                ? `${currentData?._id.match(/\d/g).join("")?.slice(0, 6)}...`
                : ""}
            </small>
          </span>
        </span>
      </div>
      <div>
        {menuSitebar.map((item) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
              key={item.id}
              to={item?.path}
            >
              {item?.icon}
              {item.text}
            </NavLink>
          );
        })}
        <span
          className={notActiveStyle}
          onClick={() => {
            dispatch(action.logout());
            navigate("/");
          }}
        >
          <IoLogOutOutline />
          Thoát
        </span>
      </div>
    </div>
  );
};

export default SiteBar;
