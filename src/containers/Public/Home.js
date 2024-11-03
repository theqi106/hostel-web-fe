import React from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation, Search } from "./index";
import { Intro, Contacts } from "../../components";
import { useSelector } from "react-redux";
import { path } from "../../ultils/constants";

const Home = () => {
  const location = useLocation();
  const { isLogin } = useSelector((state) => state.auth);

  return (
    <div className="w-full flex gap-4 flex-col items-center m-auto h-full">
      <Header />
      <Navigation />
      {isLogin &&
        location.pathname !== `/${path.CONTACT}` &&
        !location?.pathname?.includes(path.DETAIL) && <Search />}
      <div className="w-4/5 lg:w-3/5 flex flex-col items-start justify-start">
        <Outlet />
      </div>
      <Intro />
      <Contacts />
      <div className="h-[500px]"></div>
    </div>
  );
};

export default Home;
