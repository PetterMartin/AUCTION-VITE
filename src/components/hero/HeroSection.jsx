import { useState } from "react";
import MobileHeader from "../nav/MobileHeader"
import Searchbar from "../searchbar/Searchbar";
import Banners from "./Banners";
import Listings from "../listings/Listings";
import FeatureSection from "./FeatureSection";
import Categories from "./Categories";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleHomeClick = () => {
    handleClearSearch();
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category); 
    setSelectedCategory(category);
  };

  return (
    <div className="w-full px-2 relative bg-white">
      <div className="lg:px-56 sm:px-28">
        <MobileHeader />

        <Searchbar onSearch={handleSearch} onClearSearch={handleClearSearch} />

        <Categories onCategoryClick={handleCategoryClick} />
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
