import icons from "./icons";

const { TbPencilPlus, LuClipboardList, CiUser } = icons;

const menuManage = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/system/tao-moi-bai-dang",
    icon: <TbPencilPlus />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/system/quan-ly-bai-dang",
    icon: <LuClipboardList />,
  },
  {
    id: 4,
    text: "Thông tin tài khoản",
    path: "/system/sua-thong-tin-tai-khoan",
    icon: <CiUser />,
  },
];

export default menuManage;
