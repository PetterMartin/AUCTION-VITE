import { useState, useEffect, useContext, createContext, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { getProfile } from "../../libs/api";
import { HiChatBubbleOvalLeft, HiMiniInformationCircle } from "react-icons/hi2";
import { FaHeart, FaBitcoin } from "react-icons/fa";
import { IoAddCircle, IoSettingsSharp } from "react-icons/io5";
import { PiHouseFill } from "react-icons/pi";
import { BiLogInCircle } from "react-icons/bi";
import { useAuth } from "../AuthContext";
import PropTypes from "prop-types";
import logo from "../../assets/New-Logo.svg";
import defaultUser from "../../assets/defaultUser.png";
import RegisterModal from "../modal/RegisterModal";
import LoginModal from "../modal/LoginModal";
import CreatePostModal from "../modal/CreatePostModal";
import LogoutButton from "../buttons/LogoutButton";
import LoginToast from "../toast/LoginToast";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const userId = localStorage.getItem("user_name");
  const [user, setUser] = useState(null);
  const [creditInfo, setCreditInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const sidebarRef = useRef(null);

  const auth = useAuth();

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const openCreatePostModal = () => {
    setCreatePostModalOpen(true);
  };

  const handleLogout = () => {
    auth.logout(); 
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedToken = localStorage.getItem("jwt");

        if (userId && storedToken) {
          try {
            const profileData = await getProfile(userId, storedToken);

            setUser(profileData);
            setCreditInfo({ credits: profileData.credits, currency: "USD" });
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Error fetching user profile:", error.message);
          }
        } else {
          // If no user or token is present, set isAuthenticated to false
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId, isAuthenticated]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the clicked element is inside the sidebar
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Click is outside the sidebar, collapse it
        setExpanded(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <aside className="h-screen fixed z-20 hidden md:block" ref={sidebarRef}>
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
      <CreatePostModal
        isModalOpen={isCreatePostModalOpen}
        setModalOpen={setCreatePostModalOpen}
      />
      {isAuthenticated && <LoginToast name={user && user.name} />}

      <nav className="h-full flex flex-col border-r shadow-sm bg-opacity-70 backdrop-filter backdrop-blur-2xl">
        <div className="p-4 flex justify-center items-center">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="flex items-center"
          >
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-4 text-lg">
            <div className="border-b-2 border-blue-400 mt-2 mb-8"></div>
            <Link to="/">
              <SidebarItem icon={<PiHouseFill />} text="Home" active />
            </Link>
            {isAuthenticated && (
              <SidebarItem
                icon={<IoAddCircle />}
                text="Post"
                onClick={openCreatePostModal}
              />
            )}
            {isAuthenticated && (
              <SidebarItem
                icon={<HiChatBubbleOvalLeft />}
                text="Messages"
                alert
              />
            )}
            {isAuthenticated && (
              <SidebarItem icon={<FaHeart />} text="Favorites" />
            )}
            <SidebarItem icon={<IoSettingsSharp />} text="Settings" />
            <SidebarItem icon={<HiMiniInformationCircle />} text="Help" />
          </ul>

          <div className="px-4">
            {isAuthenticated && (
              <SidebarItem
              icon={<FaBitcoin />}
              text={`${user && user.credits}`}
              bitcoinItem
            />
            )}
          </div>
        </SidebarContext.Provider>

        <div className="px-4">
          <div className="border-b-2 border-blue-400"></div>
        </div>

        <div className="flex items-center cursor-pointer">
          <img
            src={
              isAuthenticated
                ? (user && user.avatar) || defaultUser
                : defaultUser
            }
            alt=""
            className="w-14 h-14 mx-3 rounded-full border-2 border-blue-500 p-1.5"
            onClick={() => setExpanded((curr) => !curr)}
          />

          {isAuthenticated && (
            <div className="absolute bottom-16 left-14 bg-green-400 w-2 h-2 rounded-full"></div>
          )}

          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-40" : "w-0"
            }`}
          >
            <div className="w-full text-gray-00" style={{ fontSize: "16px" }}>
              {isAuthenticated ? (
                <Link to="/profile" style={{ color: "black" }}>
                  <div className="hover:bg-gray-100/50 p-3 whitespace-nowrap text-gray-600">
                    {user && user.name}
                  </div>
                </Link>
              ) : (
                <div className="hover:bg-gray-100/50 p-3 whitespace-nowrap text-gray-600">
                  <div onClick={openRegisterModal}>Sign Up</div>
                </div>
              )}
              {isAuthenticated ? (
                <Link to="/">
                  <LogoutButton setUser={setUser} onLogout={handleLogout} />
                </Link>
              ) : (
                <div
                  onClick={openLoginModal}
                  className="flex gap-6 hover:bg-gray-100/50 p-3 whitespace-nowrap text-emerald-500"
                >
                  <div>Login</div>
                  <BiLogInCircle className="text-xl me-8" />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, onClick, bitcoinItem }) {
  const { expanded } = useContext(SidebarContext);

  SidebarItem.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    active: PropTypes.bool,
    alert: PropTypes.bool,
    onClick: PropTypes.func,
    bitcoinItem: PropTypes.bool,
  };
  

  return (
    <li
      className={`
        relative flex items-center py-2 px-3.5 my-4
        font-medium rounded-full cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-b from-blue-600 to-blue-500 text-white"
            : "hover:bg-gray-100/50 text-gray-400 hover:text-blue-500"
        }
        ${bitcoinItem ? " text-yellow-500" : ""}
    `}
      style={{ fontSize: "20px" }}
      onClick={onClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-28 ml-3 text-lg" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute top-3 right-3 w-2 h-2 rounded bg-amber-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-full px-4 py-2 ml-6
          bg-gradient-to-b from-blue-600 to-blue-500 text-white text-sm font-bold
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-30
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
