import { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link } from "@tanstack/react-router";
import { HiOutlineHome } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { RiHeart3Line } from "react-icons/ri";
import CreatePostModal from "../modal/CreatePostModal";

const Mobilenav = () => {
  const auth = useAuth(); 
  const user = auth.user;

  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const openCreatePostModal = () => {
    setCreatePostModalOpen(true);
  };

  return (
    <>
    <CreatePostModal
        isModalOpen={isCreatePostModalOpen}
        setModalOpen={setCreatePostModalOpen}
      />
      <div
      className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600"
      style={{ filter: "drop-shadow(0 0 0.75rem rgba(0,0,0,0.15))" }}
    >
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <Link to="/" className="flex mx-auto">
          <button
            data-tooltip-target="tooltip-home"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <HiOutlineHome
              className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              size="1.5em"
            />
            <span className="sr-only">Home</span>
          </button>
        </Link>
        <button
          data-tooltip-target="tooltip-wallet"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <BiMessageDetail className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="sr-only">Wallet</span>
        </button>
        <div
          id="tooltip-wallet"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Wallet
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div className="flex items-center justify-center">
          <button
            data-tooltip-target="tooltip-new"
            type="button"
            onClick={openCreatePostModal}
            className="inline-flex items-center justify-center w-11 h-11 font-medium bg-gradient-to-tr from-blue-400 to-blue-500 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            <span className="sr-only">New item</span>
          </button>
        </div>
        <div
          id="tooltip-new"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Create new item
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          data-tooltip-target="tooltip-settings"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <RiHeart3Line
            className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            size="1.5em"
          />
          <span className="sr-only">Settings</span>
        </button>
        <div
          id="tooltip-settings"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Settings
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          data-tooltip-target="tooltip-profile"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          {user && user.avatar ? (
            <Link to={user ? `/profile?name=${user.name}` : "/login"}>
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-8 h-8 mb-1 rounded-full"
              />
            </Link>
          ) : (
            <svg
              className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          )}
          <span className="sr-only">Profile</span>
        </button>
        <div
          id="tooltip-profile"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Profile
          <div className="tooltip-arrow" data-popper-arrow></div>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default Mobilenav;
