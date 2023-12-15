import { useState } from "react";
import { useAuth } from "../AuthContext";
import { AiOutlineMenu } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import { BiLogOutCircle } from "react-icons/bi";
import RegisterModal from "../modal/RegisterModal";
import LoginModal from "../modal/LoginModal";
import logo from "../../assets/New-Logo.svg";
import defaultUser from "../../assets/defaultUser.png";

export default function MobileHeader() {
  const auth = useAuth();
  const user = auth.user;
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <>
      <RegisterModal
        isModalOpen={isRegisterModalOpen}
        setModalOpen={setRegisterModalOpen}
        openLoginModal={openLoginModal}
      />
      <LoginModal
        isModalOpen={isLoginModalOpen}
        setModalOpen={setLoginModalOpen}
        openRegisterModal={openRegisterModal}
      />
      <div className="flex flex-row justify-between pt-4 px-4 xl:hidden">
        <img src={logo} alt="Logo" className="w-12 h-12" />
        <div
          data-cy="expand-btn"
          className="px-4 py-1 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition relative"
          onClick={handleDropdownToggle}
        >
          <AiOutlineMenu className="w-5 h-5" />
          <div
            className={`bg-white border rounded-md shadow-md w-24 text-lg absolute top-full left-0 transition-all ${
              isDropdownOpen
                ? "block opacity-100 translate-y-3"
                : "opacity-0 pointer-events-none -translate-y-2"
            } z-50`}
          >
            {user ? (
              <>
                <div
                  data-cy="logout-btn"
                  className="flex p-2 text-rose-500 gap-1"
                  onClick={handleLogout}
                >
                  <div>Logout</div>
                  <BiLogOutCircle className="text-xl mt-1" />
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex gap-1 p-2 text-emerald-500"
                  onClick={openLoginModal}
                >
                  <div>Login</div>
                  <BiLogInCircle
                    data-cy="open-login-form"
                    className=" text-xl mt-1"
                  />
                </div>
                <div className="p-2" onClick={openRegisterModal}>
                  <div>Sign up</div>
                </div>
              </>
            )}
          </div>
          <div className="">
            {user && user.avatar ? (
              <img
                data-cy="user-avatar"
                src={user.avatar}
                alt="User Image"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <img
                src={defaultUser}
                alt="User Image"
                className="w-10 h-10 rounded-full"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
