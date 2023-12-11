import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../../assets/New-Logo.svg";
import defaultUser from "../../assets/defaultUser.png";

export default function MobileHeader() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    const handleDropdownToggle = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <div className="flex flex-row justify-between pt-4 px-4 xl:hidden">
        <img src={logo} alt="Logo" className="w-12 h-12" />
        <div
          className="px-4 py-1 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition relative"
          onClick={handleDropdownToggle}
        >
          <AiOutlineMenu className="w-5 h-5" />
          <div
            className={`bg-white border rounded-md shadow-md w-24 text-lg absolute top-full left-0 transition-all ${
              isDropdownOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            } z-50`}
          >
            <div className="p-2">Login</div>
            <div className="p-2">Sign up</div>
          </div>
          <div className="">
            <img
              src={defaultUser}
              alt="User Image"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }