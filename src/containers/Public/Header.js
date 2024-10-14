import React, { useCallback } from "react";
import logo2 from "../../assets/logo2.png";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../ultils/constants";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../store/actions";
const { CiCirclePlus } = icons;
const Header = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  return (
    <div className="w-1100 flex items-center justify-between">
      <Link to={"/"}>
        <img
          src={logo2}
          alt="logo"
          className="w-[240px] h-[70px] object-contain"
        />
      </Link>
      <div className="flex items-center gap-3">
        <small>Welcome to FPT Hostel</small>
        {!isLogin && (
          <div className="flex items-center gap-3">
            <Button
              text={"Register"}
              textColor="text-white"
              bgColor="bg-[#3961fb]"
              onClick={() => {
                goLogin(true);
              }}
            />
            <Button
              text={"Login"}
              textColor="text-white"
              bgColor="bg-[#3961fb]"
              onClick={() => {
                goLogin(false);
              }}
            />
          </div>
        )}
        {isLogin && (
          <div className="flex items-center gap-3">
            <small>Ten!</small>
            <Button
              text={"Logout"}
              textColor="text-white"
              bgColor="bg-red-700"
              onClick={() => dispath(action.logout())}
            />
          </div>
        )}
        <Button
          text={"Add new post"}
          textColor="text-white"
          bgColor="bg-secondary2"
          IcAfter={CiCirclePlus}
        />
      </div>
    </div>
  );
};

export default Header;
