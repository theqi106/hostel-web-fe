import { Routes, Route } from "react-router-dom";
import {
  DetailPost,
  Home,
  HomePage,
  Login,
  RentalForEach,
  SearchDetail,
  Contact,
} from "./containers/Public";
import { path } from "./ultils/constants";
import {
  CreatePost,
  System,
  ManagePost,
  EditAccount,
} from "./containers/System";
import * as actions from "../src/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      isLogin && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLogin]);
  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAcreage());
    dispatch(actions.getProvince());
  }, []);
  return (
    <div className=" bg-primary overflow-hidden">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<RentalForEach />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<RentalForEach />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<RentalForEach />} />
          <Route path={path.NHA_CHO_THUE} element={<RentalForEach />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.DETAIL_POST} element={<DetailPost />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.DETAIL_ALL} element={<DetailPost />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
