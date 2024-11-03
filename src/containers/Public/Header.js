import React, { useCallback, useEffect, useRef, useState } from "react";
import logo2 from "../../assets/logo2.png";
import { Button, User } from "../../components";
import icons from "../../ultils/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constants";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../store/actions";
import menuManage from "../../ultils/menuManage";
const { CiCirclePlus, IoLogOutOutline, FaAngleDown } = icons;
const Header = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [searchParams] = useSearchParams();
  const headerRef = useRef();
  const { isLogin } = useSelector((state) => state.auth);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page")]);
  useEffect(() => {}, []);
  return (
    <div ref={headerRef} className="w-3/5">
      <div className="max-w-1100 flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo2}
            alt="logo"
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-3">
          {!isLogin && (
            <div className="flex items-center gap-3">
              <small>Welcome to FPT Hostel!</small>
              <Button
                text={"Đăng kí"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => {
                  goLogin(true);
                }}
              />
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => {
                  goLogin(false);
                }}
              />
            </div>
          )}
          {isLogin && (
            <div className="flex items-center gap-3 relative">
              <User />
              <Button
                text={"Quản lí tài khoản"}
                textColor="text-white"
                bgColor="bg-blue-700"
                px="px-4"
                IcAfter={FaAngleDown}
                onClick={() => {
                  setIsShowMenu((prev) => !prev);
                }}
              />
              {isShowMenu && (
                <div className="absolute min-w-200 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col z-50">
                  {menuManage.map((item) => {
                    return (
                      <Link
                        className="hover:text-orange-500 text-blue-700 border-y border-gray-200 py-2 flex items-center gap-2"
                        key={item.id}
                        to={item?.path}
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    );
                  })}
                  <span
                    className="cursor-pointer hover:text-orange-600 text-blue-500 py-2 flex items-center gap-2"
                    onClick={() => {
                      dispath(action.logout());
                      setIsShowMenu(false);
                    }}
                  >
                    <IoLogOutOutline />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )}
          <Button
            text={"Thêm tin đăng"}
            textColor="text-white"
            bgColor="bg-secondary2"
            IcAfter={CiCirclePlus}
            onClick={() => navigate("/system/tao-moi-bai-dang")}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
