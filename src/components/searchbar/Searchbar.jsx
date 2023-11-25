import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Searchbar({}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="header pt-4 xl:pt-12 pb-6 z-10 relative">
      <div
        className="search flex items-center justify-between border-2 border-blue-100 rounded-lg ps-5 hover:border-blue-400 focus-within:border-blue-400 relative"
        onClick={toggleDropdown}
      >
        <input
          type="text"
          placeholder="Search Listings"
          className="bg-transparent outline-none flex-grow py-2"
        />
        <button
          className="bg-gradient-to-b from-blue-600 to-blue-500 rounded-r bg-primary px-4 py-2.5 font-medium uppercase leading-tight text-white shadow-md hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          type="button"
          id="button-addon1"
        >
          <CiSearch className="h-6 w-6" style={{ strokeWidth: 1 }}/>
        </button>
      </div>
      {isDropdownVisible && (
        <div className={`dropdown absolute w-full left-0 p-4 bg-white shadow-lg rounded-lg transition-all ${
          isDropdownVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <h2 className="text-lg mb-2">Mine siste søk</h2>
          <div className="text-blue-400">
            <p className="hover:underline cursor-pointer">iphone X</p>
            <p className="hover:underline cursor-pointer">Bøver</p>
            <p className="hover:underline cursor-pointer">playstation 5</p>
          </div>
          <h2 className="text-lg mt-6 mb-2">Populært på Finn</h2>
          <div className="flex gap-6 overflow-scroll">
            <p className="bg-gray-200 p-2 px-4 rounded-3xl hover:underline border hover:border hover:border-gray-400 cursor-pointer">Lenestol</p>
            <p className="bg-gray-200 p-2 px-4 rounded-3xl hover:underline border hover:border hover:border-gray-400 cursor-pointer">Pokemonkort</p>
            <p className="bg-gray-200 p-2 px-4 rounded-3xl hover:underline border hover:border hover:border-gray-400 cursor-pointer">Skrivebord</p>
            <p className="bg-gray-200 p-2 px-4 rounded-3xl hover:underline border hover:border hover:border-gray-400 cursor-pointer">TV</p>
          </div>
        </div>
      )}
    </div>

  );
}