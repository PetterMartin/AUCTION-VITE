import { useState } from "react";
import MobileHeader from "../nav/MobileHeader"
import Searchbar from "../searchbar/Searchbar";
import Banners from "./Banners";
import Listings from "../listings/Listings";
import FeatureSection from "./FeatureSection";
import Categories from "./Categories";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleHomeClick = () => {
    setSearchQuery("");
  };

  return (
    <div className="w-full px-2 relative bg-white">
      <div className="lg:px-56 sm:px-28">
        <MobileHeader />

        <hr className="my-4 border-t-2 border-blue-400 xl:hidden" />

        <Searchbar onSearch={handleSearch} onHomeClick={handleHomeClick} />

        <Categories />
      </div>

      {searchQuery === "" && (
          <>
            <Banners />
            <FeatureSection />
          </>
        )}

      <Listings searchQuery={searchQuery} />
    </div>
  );
};

export default HeroSection;
