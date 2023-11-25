import { useState, useEffect, useContext, createContext } from "react";
import { getProfile } from "../../libs/api";
import { HiChatBubbleOvalLeft, HiMiniInformationCircle } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { PiHouseFill } from "react-icons/pi";
import { IoSettingsSharp } from "react-icons/io5";
import PropTypes from "prop-types";
import logo from "../../assets/New-Logo.svg";
import placeholder from "../../assets/user.png";
import RegisterModal from "../modal/RegisterModal";
import LoginModal from "../modal/LoginModal";
import LogoutButton from "../buttons/LogoutButton";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const userId = localStorage.getItem("user_name");
  const [user, setUser] = useState(null);
  const [creditInfo, setCreditInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const openLoginModal = () => {
    setLoginModalOpen(true);
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


  return (
    <aside className="h-screen fixed z-20 hidden xl:block">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 flex justify-center items-center">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="flex items-center"
          >
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-4">
            <div className="border-b-2 border-blue-400 mt-2 mb-8"></div>
            <SidebarItem icon={<PiHouseFill />} text="Home" active />
            <SidebarItem icon={<IoAddCircle />} text="Post" />
            <SidebarItem
              icon={<HiChatBubbleOvalLeft />}
              text="Messages"
              alert
            />
            <SidebarItem icon={<FaHeart />} text="Favorites" />
            <SidebarItem icon={<IoSettingsSharp />} text="Settings" />
            <SidebarItem icon={<HiMiniInformationCircle />} text="Help" />
          </ul>
        </SidebarContext.Provider>

        <LogoutButton setUser={setUser}/>

        <div className="px-4">
          <div className="border-b-2 border-blue-400"></div>
        </div>

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

        <div className="flex items-center cursor-pointer">
          <img
            src={placeholder}
            alt=""
            className="w-14 h-14 mx-3 rounded-full border-2 border-blue-300 p-1.5"
            onClick={() => setExpanded((curr) => !curr)}
          />

          {isAuthenticated && (
            <div className="absolute bottom-16 left-14 bg-green-400 w-2 h-2 rounded-full"></div>
          )}

          <div
            className={`
      flex justify-between items-center
      overflow-hidden transition-all ${expanded ? "w-40" : "w-0"}
  `}
          >
            <div className="w-full text-gray-00" style={{ fontSize: "16px" }}>
            {isAuthenticated ? (
          <div className="hover:bg-gray-100 p-3 whitespace-nowrap">
            {user && user.name}
          </div>
        ) : (
          <div className="hover:bg-gray-100 p-3 whitespace-nowrap">
            <div onClick={openLoginModal}>Login</div>
          </div>
        )}
        <div className="hover:bg-gray-100 p-3 whitespace-nowrap">
          <div onClick={openRegisterModal}>Sign Up</div>
        </div>
      </div>

          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  SidebarItem.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string,
    active: PropTypes.bool,
    alert: PropTypes.bool,
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
            : "hover:bg-blue-100 text-gray-400 hover:text-blue-500"
        }
    `}
      style={{ fontSize: "20px" }}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-28 ml-3" : "w-0"
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
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-gradient-to-b from-blue-600 to-blue-500 text-white text-sm
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
