import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constants";
import { Header, SiteBar } from "./";
const System = () => {
  const { isLogin } = useSelector((state) => state.auth);
  if (!isLogin) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex w-full flex-auto h-full">
        <SiteBar />
        <div className="flex-auto bg-white shadow-md h-screen p-4 w-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
