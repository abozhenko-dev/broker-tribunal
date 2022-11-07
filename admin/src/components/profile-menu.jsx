import { Dropdown, Menu, message } from "antd";
import { AiOutlineLock, AiOutlineLogout } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { AuthService } from "@services";

import { useActions } from "@hooks";

export const ProfileMenu = () => {
  const { setUserInfo, setIsAuthorized } = useActions();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await AuthService.logout();
    setUserInfo(null);
    setIsAuthorized(false);

    navigate("/auth/login");
    message.success("Вы вышли 😒");
  };

  return (
    <Dropdown
      overlay={
        <Menu
          className="profile-menu"
          items={[
            {
              key: "password-reset",
              label: <div onClick={() => navigate("/password-reset")}>Сменить пароль</div>,
              icon: <AiOutlineLock />
            },
            {
              key: "logout",
              label: <div onClick={handleLogout}>Выйти</div>,
              icon: <AiOutlineLogout />
            }
          ]}
        />
      }
      trigger={["click"]}
    >
      <HiUserCircle className="profile-menu__icon" />
    </Dropdown>
  );
};
