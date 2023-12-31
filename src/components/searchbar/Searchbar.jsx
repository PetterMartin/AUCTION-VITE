import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Searchbar({ onSearch }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [latestSearches, setLatestSearches] = useState([]);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRecentSearchClick = (clickedSearch) => {
    setSearchQuery(clickedSearch);
    onSearch(clickedSearch);
    setDropdownVisible(false);
  };

  const handleSearch = () => {
    onSearch(searchQuery);

    setLatestSearches((prevSearches) => [
      ...new Set([searchQuery, ...prevSearches]),
    ]);

    setDropdownVisible(false);
  };

  return (
    <div className="header pt-4 xl:pt-12 pb-4 z-10 relative">
      <div
        data-cy="searchbar"
        className="search flex items-center justify-between border-2 border-blue-100 rounded-lg ps-5 hover:border-blue-400 focus-within:border-blue-400 relative"
        onClick={toggleDropdown}
      >
        <input
          data-cy="search-input"
          type="text"
          placeholder="Search Listings"
          className="bg-transparent outline-none flex-grow py-2"
          onChange={handleInputChange}
          value={searchQuery}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
        data-cy="search-btn"
          className="bg-gradient-to-b from-blue-600 to-blue-500 rounded-r bg-primary px-4 py-2.5 font-medium uppercase leading-tight text-white shadow-md hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          type="button"
          id="button-addon1"
          onClick={handleSearch}
        >
          <CiSearch className="h-6 w-6" style={{ strokeWidth: 1 }} />
        </button>
      </div>
      {isDropdownVisible && (
        <div
          className={`dropdown absolute w-full left-0 p-4 bg-white shadow-lg rounded-lg transition-all ${
            isDropdownVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        >
          <h2 className="text-lg mb-2">Latest searches</h2>
          <div className="text-blue-400">
            {latestSearches.map((search, index) => (
              <p
                key={index}
                className="hover:underline cursor-pointer"
                onClick={() => handleRecentSearchClick(search)}
              >
                {search}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
