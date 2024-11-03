import icons from "./icons";

const { TbPencilPlus, LuClipboardList, CiUser, MdContactSupport } = icons;

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
    id: 3,
    text: "Sửa thông tin cá nhân",
    path: "/system/sua-thong-tin-tai-khoan",
    icon: <CiUser />,
  },
  {
    id: 4,
    text: "Liên hệ",
    path: "/lien-he",
    icon: <MdContactSupport />,
  },
];

export default menuManage;
